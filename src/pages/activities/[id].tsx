import { postJson } from "@/lib/api";
import { useActivitiesQuery } from "@/lib/query-builder";
import { useActivityQuery } from "@/lib/query-builder/get-activity-query";
import { withSessionSsr } from "@/lib/session";
import type { Athlete, Activity } from "@/lib/types";
import { Unit, Utils } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Activity({ athlete, accessToken }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const activityQuery = useActivityQuery(
    { accessToken, id: Number(id), include_all_efforts: false },
    { staleTime: Infinity, retry: false }
  );

  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Strava Insights | {athlete.username}</title>
      </Head>
      <main>
        <Center flex="1" py={{ base: "4" }}>
          <Container>
            <VStack alignItems="flex-start" w="full">
              <HStack w="full" justifyContent="space-between">
                <VStack alignItems="flex-start" spacing="0">
                  <Heading
                    color="orange.500"
                    fontSize={{ base: "xl", md: "3xl" }}
                  >
                    Strava Insights
                  </Heading>
                  <Link
                    color="gray.500"
                    fontWeight="medium"
                    fontSize="sm"
                    isExternal
                    href={`${process.env.NEXT_PUBLIC_STRAVA_URL}/athletes/${athlete.id}`}
                  >
                    {athlete.firstname} {athlete.lastname} ({athlete.username})
                  </Link>
                </VStack>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="open menu"
                    icon={<Text>🍔</Text>}
                  />
                  <MenuList>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              <Divider />

              <Button as={NextLink} href="/athlete" variant="link">
                Back to athlete
              </Button>

              <Box overflowX="hidden" w="full">
                <HStack py="1" overflowX="auto">
                  {activityQuery.data?.splits_standard.map((split) => (
                    <Card key={split.split} flexShrink={0} bg="orange.50">
                      <CardBody>
                        <Stat>
                          <StatLabel>Split {split.split}</StatLabel>
                          <StatNumber>
                            {Utils.roundDistance(
                              Utils.mPerSecToMinPerMile(split.average_speed)
                            )}
                            min/mi
                          </StatNumber>
                        </Stat>
                      </CardBody>
                    </Card>
                  ))}
                </HStack>
              </Box>
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
