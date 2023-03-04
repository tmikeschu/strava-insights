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

const LOGIN_QUERY_PARAMS = [
  ["client_id", process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID],
  ["redirect_uri", process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI],
  ["response_type", "code"],
  ["approval_prompt", "force"],
  ["scope", "activity:read"],
]
  .map((keyVal) => keyVal.join("="))
  .join("&");

const LOGIN_URL = `${process.env.STRAVA_AUTH_URL}?${LOGIN_QUERY_PARAMS}`;

export default function Home() {
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
              <Button
                as={Link}
                _hover={{ bg: "orange.600", textDecor: "none" }}
                colorScheme={"orange"}
                href={LOGIN_URL}
              >
                Log in with Strava
              </Button>
            </VStack>
          </Container>
        </Center>
      </main>
    </>
  );
}
