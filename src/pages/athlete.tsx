import { postJson } from "@/lib/api";
import { useActivitiesQuery } from "@/lib/query-builder";
import { withSessionSsr } from "@/lib/session";
import type { Athlete } from "@/lib/types";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Link,
  Stat,
  StatNumber,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Athlete({ athlete, accessToken }: Props) {
  console.log("athlete", accessToken);
  const activitiesQuery = useActivitiesQuery(
    {
      accessToken,
      // after: new Date("2023-01-01").getTime(),
    },
    { staleTime: Infinity, retry: false }
  );
  console.log(activitiesQuery.data);
  const router = useRouter();
  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };
  return (
    <>
      <Head>
        <title>Strava Insights</title>
        <meta
          name="description"
          content="Helpful insights on your training data"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              <Wrap>
                {activitiesQuery.data?.map((activity) => (
                  <WrapItem key={activity.id}>
                    <Stat>
                      <StatNumber>
                        {Math.round(activity.distance * 0.000621371 * 100) /
                          100}
                        mi
                      </StatNumber>
                    </Stat>
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
