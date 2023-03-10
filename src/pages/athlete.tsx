import { useActivitiesQuery } from "@/lib/query-builder";
import { withSessionSsr } from "@/lib/session";
import type { Athlete } from "@/lib/types";
import { Utils } from "@/lib/utils";
import {
  Box,
  Card,
  CardBody,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuthedHeaderContext } from "@/components/authed-header/authed-header-context";
import { ActivitySplits } from "@/components";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Athlete({ athlete, accessToken }: Props) {
  const { nDays, unit } = useAuthedHeaderContext();

  const activitiesQuery = useActivitiesQuery(
    { accessToken },
    { staleTime: Infinity, retry: false }
  );

  const activitiesGroupedByDay = Utils.groupByDay(activitiesQuery.data ?? []);
  const latestActivities = Utils.getLastNDays(nDays).flatMap(
    (day) => activitiesGroupedByDay[day.toDateString()] ?? []
  );

  const fromMeters = unit === "miles" ? Utils.metersToMiles : Utils.metersToKm;
  const lastNDaysTotal = Utils.roundDistance(
    fromMeters(
      latestActivities.reduce((acc, activity) => acc + activity.distance, 0)
    )
  );

  const [selectedActivityId, setSelectedActivityId] = React.useState<
    number | null
  >(null);

  return (
    <>
      <Head>
        <title>Strava Insights | {athlete.username}</title>
      </Head>
      <main>
        <VStack alignItems="flex-start">
          <Box overflowX="hidden" w="full">
            <HStack py="1" overflowX="auto">
              <Card flexShrink={0} bg="orange.50">
                <CardBody>
                  <Stat>
                    <StatLabel>Last {nDays} days total</StatLabel>
                    <StatNumber>
                      {lastNDaysTotal}
                      {unit.slice(0, 2)}
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              {latestActivities.map((activity) => (
                <Card
                  role="button"
                  onClick={() =>
                    setSelectedActivityId((id) =>
                      id === activity.id ? null : activity.id
                    )
                  }
                  border="1px solid"
                  transition="all 0.2s"
                  {...(selectedActivityId === activity.id
                    ? { borderColor: "orange.500" }
                    : { borderColor: "transparent" })}
                  key={activity.id}
                  flexShrink={0}
                  bg="orange.50"
                  _hover={{ bg: "orange.100" }}
                >
                  <CardBody>
                    <Stat>
                      <StatLabel>
                        {new Date(activity.start_date_local).toDateString()}
                      </StatLabel>
                      <HStack
                        spacing="0"
                        alignItems="flex-start"
                        divider={<StatNumber pr="1">,</StatNumber>}
                      >
                        <StatNumber key={activity.id}>
                          {Utils.roundDistance(fromMeters(activity.distance))}{" "}
                          {unit.slice(0, 2)}
                        </StatNumber>
                      </HStack>
                    </Stat>
                  </CardBody>
                </Card>
              ))}
            </HStack>
          </Box>

          {selectedActivityId && (
            <>
              <Divider />
              <ActivitySplits
                {...{ accessToken, id: selectedActivityId, athlete }}
              />
            </>
          )}
        </VStack>
      </main>
    </>
  );
}

export const getServerSideProps = withSessionSsr<Props>(async function ({
  req,
  res,
}) {
  const { athlete, accessToken } = req.session;

  if (athlete && accessToken) {
    return {
      props: { athlete, accessToken },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
});
