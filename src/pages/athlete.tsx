import { postJson } from "@/lib/api";
import { useActivitiesQuery } from "@/lib/query-builder";
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
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";

type Props = {
  athlete: Athlete;
  accessToken: string;
};

export default function Athlete({ athlete, accessToken }: Props) {
  const activitiesQuery = useActivitiesQuery(
    { accessToken },
    { staleTime: Infinity, retry: false }
  );

  const router = useRouter();
  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };

  const [nDays, setNDays] = React.useState(7);
  const [unit, setUnit] = React.useState<Unit>("miles");

  const activitiesGroupedByDay = Utils.groupByDay(activitiesQuery.data ?? []);
  const latestActivities = Utils.getLastNDays(nDays).flatMap(
    (day) => activitiesGroupedByDay[day.toDateString()] ?? []
  );

  const fromMeters = unit === "miles" ? Utils.metersToMiles : Utils.metersToKm;
  const lastNDaysTotal = Utils.roundDistance(
    fromMeters(
      latestActivities.reduce((acc, activity) => acc + activity.distance, 0)
    )
  );

  const disclosure = useDisclosure();

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
                    <MenuItem onClick={disclosure.onOpen}>Settings</MenuItem>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              <Divider />

              <Box overflowX="hidden" w="full">
                <HStack py="1" overflowX="auto">
                  <Card flexShrink={0} bg="orange.50">
                    <CardBody>
                      <Stat>
                        <StatLabel>Last {nDays} days total</StatLabel>
                        <StatNumber>
                          {lastNDaysTotal}
                          {unit.slice(0, 2)}
                        </StatNumber>
                      </Stat>
                    </CardBody>
                  </Card>
                  {latestActivities.map((activity) => (
                    <LinkBox key={activity.id} flexShrink={0}>
                      <Card
                        flexShrink={0}
                        bg="orange.50"
                        _hover={{ bg: "orange.100" }}
                      >
                        <CardBody>
                          <Stat>
                            <StatLabel>
                              <LinkOverlay
                                as={NextLink}
                                href={`/activities/${activity.id}`}
                              >
                                {new Date(
                                  activity.start_date_local
                                ).toDateString()}
                              </LinkOverlay>
                            </StatLabel>
                            <HStack
                              spacing="0"
                              alignItems="flex-start"
                              divider={<StatNumber pr="1">,</StatNumber>}
                            >
                              <StatNumber key={activity.id}>
                                {Utils.roundDistance(
                                  fromMeters(activity.distance)
                                )}{" "}
                                {unit.slice(0, 2)}
                              </StatNumber>
                            </HStack>
                          </Stat>
                        </CardBody>
                      </Card>
                    </LinkBox>
                  ))}
                </HStack>
              </Box>
            </VStack>
          </Container>
        </Center>
      </main>
      <Modal {...disclosure}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="flex-start" w="full">
              <FormControl>
                <FormLabel>Units</FormLabel>
                <RadioGroup
                  colorScheme={"orange"}
                  value={unit}
                  onChange={(e) => setUnit(e as "miles" | "km")}
                >
                  <HStack>
                    <Radio value="miles">Miles</Radio>
                    <Radio value="km">Km</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Last N Days</FormLabel>
                <Input
                  value={nDays}
                  onChange={(e) => setNDays(Number(e.target.value))}
                  type="number"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={disclosure.onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
