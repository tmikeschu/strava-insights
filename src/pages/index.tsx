import { Button, Center, Heading, Link, VStack } from "@chakra-ui/react";
import Head from "next/head";

const LOGIN_QUERY_PARAMS = [
  ["client_id", process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID],
  ["redirect_uri", process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI],
  ["response_type", "code"],
  ["approval_prompt", "force"],
  ["scope", "activity:read"],
]
  .map((keyVal) => keyVal.join("="))
  .join("&");

const LOGIN_URL = `${process.env.NEXT_PUBLIC_STRAVA_AUTH_URL}?${LOGIN_QUERY_PARAMS}`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Strava Insights</title>
      </Head>
      <main>
        <Center h="100vh">
          <VStack>
            <Heading color="orange.500">Strava Insights</Heading>
            <Button
              as={Link}
              _hover={{ bg: "orange.600", textDecor: "none" }}
              colorScheme={"orange"}
              href={LOGIN_URL}
            >
              Log in with Strava
            </Button>
          </VStack>
        </Center>
      </main>
    </>
  );
}
