import type { AppProps } from "next/app";
import { Center, ChakraProvider, Link, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Center pb="2" position="absolute" bottom="0" w="full">
          <Text>
            Powered by{" "}
            <Link href="https://www.strava.com" isExternal color="orange.500">
              Strava
            </Link>
          </Text>
        </Center>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
