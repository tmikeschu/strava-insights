import type { AppProps } from "next/app";
import {
  Box,
  Center,
  ChakraProvider,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Box h="100vh" overflowY="auto" display="flex" flexDirection="column">
          <Component {...pageProps} />
          <Spacer />
          <Center pb="2" w="full">
            <Text>
              Powered by{" "}
              <Link href="https://www.strava.com" isExternal color="orange.500">
                Strava
              </Link>
            </Text>
          </Center>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
