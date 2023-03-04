import { postJson } from "@/lib/api";
import { useActivitiesQuery } from "@/lib/query-builder";
import { withSessionSsr } from "@/lib/session";
import type { Athlete, Activity } from "@/lib/types";
import { Utils } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Athlete({ athlete, accessToken }: Props) {
  const activitiesQuery = useActivitiesQuery(
    { accessToken },
    { staleTime: Infinity, retry: false }
  );

  const router = useRouter();
  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };

  const [nDays, setNDays] = React.useState(7);

  const activitiesGroupedByDay = Utils.groupByDay(activitiesQuery.data ?? []);
  const activitiesOnDays = Utils.getLastNDays(nDays).map(
    (day) =>
      ([day, activitiesGroupedByDay[day.toDateString()] ?? []] ?? [
        day,
        [],
      ]) as [Date, Activity[]]
  );

  const lastNDaysTotal = Utils.formatMiles(
    Utils.metersToMiles(
      activitiesOnDays
        .flatMap(([, activities]) => activities)
        .reduce((acc, activity) => acc + activity.distance, 0)
    )
  );

  return (
    <>
      <Head>
        <title>Strava Insights | {athlete.username}</title>
      </Head>
      <main>
        <Center h="100vh">
          <Container>
            <VStack overflowX="hidden">
              <Heading color="orange.500">Strava Insights</Heading>
              <Text color="gray.500">Understand more</Text>
              <Text color="gray.700" fontWeight="bold">
                {athlete.username}
              </Text>
              <FormControl>
                <FormLabel>Last N Days</FormLabel>
                <Input
                  value={nDays}
                  onChange={(e) => setNDays(Number(e.target.value))}
                  type="number"
                />
              </FormControl>
              <Card>
                <CardBody>
                  <Stat>
                    <StatLabel>Last {nDays} days total</StatLabel>
                    <StatNumber>{lastNDaysTotal}mi</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              <Wrap>
                {activitiesOnDays.map(([day, activities]) => (
                  <WrapItem key={day.toDateString()}>
                    <Card>
                      <CardBody>
                        <Stat>
                          <StatLabel>{day.toDateString()}</StatLabel>
                          <HStack divider={<StatNumber pr="1">,</StatNumber>}>
                            {activities.length ? (
                              activities.map((activity) => (
                                <StatNumber key={activity.id}>
                                  {Utils.formatMiles(
                                    Utils.metersToMiles(activity.distance)
                                  )}{" "}
                                  mi
                                </StatNumber>
                              ))
                            ) : (
                              <StatHelpText>Rest</StatHelpText>
                            )}
                          </HStack>
                        </Stat>
                      </CardBody>
                    </Card>
                  </WrapItem>
                ))}
              </Wrap>

              <Button onClick={signOut}>Sign out</Button>
            </VStack>
          </Container>
        </Center>
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
