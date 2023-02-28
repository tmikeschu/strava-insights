import { postJson } from "@/lib/api";
import { withSessionSsr } from "@/lib/session";
import type { Athlete } from "@/lib/types";
import {
  Button,
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Athlete({ athlete, accessToken }: Props) {
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
            <VStack>
              <Heading color="orange.500">Strava Insights</Heading>
              <Text color="gray.500">Understand more</Text>
              <Text color="gray.700" fontWeight="bold">
                {athlete.username}
              </Text>
              <Button onClick={() => postJson("/api/sign-out")}>
                Sign out
              </Button>
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
