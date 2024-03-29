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
import { theme } from "@/theme";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
            <Center pb="2" w="24" position="fixed" bottom="0" right="0">
              <Link href="https://www.strava.com" isExternal>
                <PoweredByStrava />
              </Link>
            </Center>
          </Container>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

const PoweredByStrava = () => (
  <svg
    width="100%"
    id="strava_outlined"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 95.3 41.39"
  >
    <path
      fill="#fc4c02"
      d="M14.62 34.12a14.15 14.15 0 0 1-4.31-.64 9.54 9.54 0 0 1-3.44-1.91l2.7-3.21a8 8 0 0 0 2.59 1.36 9.31 9.31 0 0 0 2.7.41 2.13 2.13 0 0 0 1-.17.53.53 0 0 0 .3-.47.63.63 0 0 0-.44-.54 7.69 7.69 0 0 0-1.65-.45q-1.27-.26-2.43-.61a8.35 8.35 0 0 1-2-.88 4.27 4.27 0 0 1-1.43-1.41 3.69 3.69 0 0 1-.52-2 4.78 4.78 0 0 1 .42-2 4.57 4.57 0 0 1 1.23-1.62 5.85 5.85 0 0 1 2-1.08 8.9 8.9 0 0 1 2.75-.39A12.87 12.87 0 0 1 18 19a9.18 9.18 0 0 1 3 1.55l-2.46 3.41a7.57 7.57 0 0 0-2.28-1.13 7.93 7.93 0 0 0-2.26-.36 1.56 1.56 0 0 0-.83.17.51.51 0 0 0-.27.45.62.62 0 0 0 .41.52 7 7 0 0 0 1.6.45 22.37 22.37 0 0 1 2.64.62 7.8 7.8 0 0 1 2 .94A4.16 4.16 0 0 1 20.83 27a3.81 3.81 0 0 1 .46 2 4.69 4.69 0 0 1-.48 2.14 4.57 4.57 0 0 1-1.34 1.61 6.35 6.35 0 0 1-2.09 1 9.87 9.87 0 0 1-2.76.37Z"
    />
    <path
      fill="#fc4c02"
      d="M25.46 23H21v-4.26h14V23h-4.49v10.84h-5.05V23ZM35.67 18.74H43a10.1 10.1 0 0 1 3.33.46 5.54 5.54 0 0 1 2.1 1.26 4.61 4.61 0 0 1 1 1.55 5.48 5.48 0 0 1 .35 2 4.77 4.77 0 0 1-.8 2.8 5.5 5.5 0 0 1-2.18 1.81l3.52 5.14h-5.68l-2.85-4.32h-1.07v4.32h-5.05V18.74Zm7.23 7.19a2.32 2.32 0 0 0 1.42-.39 1.28 1.28 0 0 0 .52-1.08 1.23 1.23 0 0 0-.52-1.09 2.44 2.44 0 0 0-1.4-.36h-2.2v3h2.18ZM79.61 27.34l3.3 6.5h4.84l-8.14-16.05-8.13 16.05h4.84l3.29-6.5z"
    />
    <path
      fill="#fc4c02"
      d="m56.98 27.34 3.29 6.5h4.84l-8.13-16.05-8.13 16.05h4.84l3.29-6.5zM68.3 25.23l-3.29-6.49h-4.84l8.13 16.05 8.13-16.05h-4.84l-3.29 6.49z"
    />
    <path
      fill="#999"
      d="M7.55 13.15v-5.6h2.24a2 2 0 0 1 1.38.45 1.65 1.65 0 0 1 .53 1.3 1.65 1.65 0 0 1-.51 1.28 2 2 0 0 1-1.39.47H8.5v2.08h-.95Zm.94-3h1.28a1 1 0 0 0 .69-.15.81.81 0 0 0 .27-.64.81.81 0 0 0-.28-.68 1.1 1.1 0 0 0-.69-.22H8.5v1.74ZM16 13.11a2.51 2.51 0 0 1-1.8 0 2.23 2.23 0 0 1-1.32-1.44 4.25 4.25 0 0 1-.2-1.36 3 3 0 0 1 .71-2.12 2.26 2.26 0 0 1 1.7-.75 2.24 2.24 0 0 1 1.69.76 3 3 0 0 1 .71 2.12 4.22 4.22 0 0 1-.2 1.36 2.33 2.33 0 0 1-.54.93 2.25 2.25 0 0 1-.75.5Zm-1.93-1.22a1.29 1.29 0 0 0 2.06 0 2.56 2.56 0 0 0 .4-1.58 2.34 2.34 0 0 0-.41-1.49 1.28 1.28 0 0 0-2 0 2.33 2.33 0 0 0-.41 1.48 2.56 2.56 0 0 0 .41 1.59ZM19.7 13.15l-1.07-5.6h1l.76 3.94 1.31-3.94h.54l1.32 3.94.76-3.94h.94l-1.07 5.6h-1L22 9.31l-1.3 3.84h-1ZM26.83 13.15v-5.6h3.49v.87h-2.54v1.44h2.32v.84h-2.32v1.58h2.54v.87h-3.49ZM32.08 13.15v-5.6h2.23A2 2 0 0 1 35.7 8a1.62 1.62 0 0 1 .52 1.28 1.63 1.63 0 0 1-.34 1.06 1.69 1.69 0 0 1-.91.57l1.21 2.23h-1L34 11h-1v2.15h-.92Zm.94-3h1.22a.85.85 0 0 0 1-.89.85.85 0 0 0-1-.89H33v1.78ZM37.78 13.15v-5.6h3.49v.87h-2.54v1.44H41v.84h-2.27v1.58h2.54v.87h-3.49ZM43 13.15v-5.6h1.83a2.44 2.44 0 0 1 .9.17 2.37 2.37 0 0 1 .77.5 2.3 2.3 0 0 1 .55.88 3.58 3.58 0 0 1 .2 1.25 3.88 3.88 0 0 1-.21 1.34 2 2 0 0 1-.57.88 2.38 2.38 0 0 1-.78.45 2.8 2.8 0 0 1-.92.14H43Zm1-.87h.8a1.41 1.41 0 0 0 1.09-.42 2.26 2.26 0 0 0 .39-1.51 2.25 2.25 0 0 0-.39-1.45 1.28 1.28 0 0 0-1-.47H44v3.86ZM51.49 13.15v-5.6h2.3A1.65 1.65 0 0 1 55 8a1.41 1.41 0 0 1 .43 1 1.17 1.17 0 0 1-.65 1.08 1.6 1.6 0 0 1 .6.48 1.3 1.3 0 0 1 .25.82q0 1.71-2.06 1.71h-2.1Zm.94-3.3h1.23a.93.93 0 0 0 .62-.18.64.64 0 0 0 .22-.52.66.66 0 0 0-.22-.54.94.94 0 0 0-.62-.18h-1.23v1.42Zm0 2.43h1.4a1.7 1.7 0 0 0 .34-.06.7.7 0 0 0 .28-.14.72.72 0 0 0 .17-.25 1 1 0 0 0 .07-.39.66.66 0 0 0-.31-.65 2.16 2.16 0 0 0-1-.16h-1v1.65ZM58.23 13.15v-2.36L56.4 7.55h1l1.28 2.38L60 7.55h1l-1.83 3.24v2.36h-.94Z"
    />
  </svg>
);
