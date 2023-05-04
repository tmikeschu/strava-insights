import { StravaLoginButton } from "@/components/strava-login-button";
import { Center, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";

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
            <StravaLoginButton />
          </VStack>
        </Center>
      </main>
    </>
  );
}
