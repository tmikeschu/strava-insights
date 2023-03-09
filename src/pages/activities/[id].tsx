import { postJson } from "@/lib/api";
import { useActivitiesQuery } from "@/lib/query-builder";
import { useActivityQuery } from "@/lib/query-builder/get-activity-query";
import { withSessionSsr } from "@/lib/session";
import type { Athlete, Activity, ImperialSplit } from "@/lib/types";
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
  ButtonGroup,
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
  const splits = activityQuery.data?.splits_standard ?? [];

  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };

  const [selectedSplitIds, setSelectedSplitIds] = React.useState<number[]>([]);
  const toggleSplit = (split: ImperialSplit) => {
    setSelectedSplitIds((splits) => {
      if (splits.includes(split.split)) {
        return splits.filter((s) => s !== split.split);
      }
      return [...splits, split.split].sort((a, b) => a - b);
    });
  };
  const selectedSplits =
    splits.filter((split) => selectedSplitIds.includes(split.split)) ?? [];

  const totalSplitSpeed = selectedSplits.reduce(
    (acc, split) => acc + split.average_speed,
    0
  );
  const avgSplitSpeed = totalSplitSpeed / selectedSplits.length;

  const formattedAvgSplitSpeed = Utils.formatMeterSpeed(avgSplitSpeed);

  const selectAll = () => {
    setSelectedSplitIds(splits.map((split) => split.split));
  };
  const deselectAll = () => {
    setSelectedSplitIds([]);
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
                    <Card
                      key={split.split}
                      flexShrink={0}
                      border="1px solid"
                      transition="all 0.2s"
                      {...(selectedSplitIds.includes(split.split)
                        ? {
                            borderColor: "orange.500",
                          }
                        : {
                            borderColor: "transparent",
                          })}
                      bg="orange.50"
                      role="button"
                      _hover={{ bg: "orange.100" }}
                      onClick={() => toggleSplit(split)}
                    >
                      <CardBody>
                        <Stat>
                          <StatLabel>Split {split.split}</StatLabel>
                          <StatNumber>
                            {Utils.formatMeterSpeed(split.average_speed)}
                          </StatNumber>
                        </Stat>
                      </CardBody>
                    </Card>
                  ))}
                </HStack>
              </Box>

              <ButtonGroup size="sm" variant="outline" colorScheme="orange">
                <Button onClick={deselectAll}>Deselect All</Button>
                <Button onClick={selectAll}>Select All</Button>
              </ButtonGroup>

              <Card bg="orange.50">
                <CardBody>
                  <Stat>
                    <StatLabel>Splits {selectedSplitIds.join(", ")}</StatLabel>
                    <StatNumber>{formattedAvgSplitSpeed}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
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
