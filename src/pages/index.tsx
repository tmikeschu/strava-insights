import { Center, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";

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
            </VStack>
          </Container>
        </Center>
      </main>
    </>
  );
}
