import type { AppProps } from "next/app";
import {
  Box,
  Center,
  ChakraProvider,
  Container,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthedHeader } from "@/components";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Helpful insights on your training data"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Box
          h="100vh"
          overflowY="auto"
          display="flex"
          flexDirection="column"
          bg="gray.50"
        >
          <Container h="100%" bg="white" display="flex" flexDirection="column">
            {"accessToken" in pageProps && "athlete" in pageProps ? (
              <AuthedHeader
                accessToken={pageProps.accessToken}
                athlete={pageProps.athlete}
              >
                <Component {...pageProps} />
              </AuthedHeader>
            ) : (
              <Component {...pageProps} />
            )}
            <Spacer />
            <Center pb="2" w="full">
              <Text>
                Powered by{" "}
                <Link
                  href="https://www.strava.com"
                  isExternal
                  color="orange.500"
                >
                  Strava
                </Link>
              </Text>
            </Center>
          </Container>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
