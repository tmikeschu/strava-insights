import { useActivityQuery } from "@/lib/query-builder/get-activity-query";
import { Athlete, ImperialSplit, Lap, DetailedActivity } from "@/lib/types";
import { Utils } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  ButtonGroup,
  RadioGroup,
  Radio,
  StatHelpText,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { match } from "ts-pattern";
import { useAuthedHeaderContext } from "@/components/authed-header/authed-header-context";

type Props = {
  athlete: Athlete;
  accessToken: string;
  id: number;
};

type SplitType = keyof Pick<
  DetailedActivity,
  "splits_standard" | "splits_metric" | "laps"
>;

export function ActivitySplits({ athlete, accessToken, id }: Props) {
  const { unit } = useAuthedHeaderContext();

  const [splitType, setSplitType] = React.useState<SplitType>("laps");
  const [selectedSplitIds, setSelectedSplitIds] = React.useState<number[]>([]);

  const activityQuery = useActivityQuery(
    { accessToken, id: Number(id), include_all_efforts: false },
    { staleTime: Infinity, retry: false }
  );
  const splits: (Lap | ImperialSplit)[] = activityQuery.data?.[splitType] ?? [];

  const toggleSplit = (split: ImperialSplit | Lap) => {
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

  const formattedAvgSplitSpeed = Utils.formatMeterSpeed(avgSplitSpeed, {
    unit,
  });

  const selectAll = () => {
    setSelectedSplitIds(splits.map((split) => split.split));
  };
  const deselectAll = () => {
    setSelectedSplitIds([]);
  };

  return (
    <VStack alignItems="flex-start" w="full">
      <RadioGroup
        value={splitType}
        onChange={(value) => {
          setSplitType(value as SplitType);
          deselectAll();
        }}
      >
        <HStack>
          <Radio value={"laps" satisfies SplitType}>Laps</Radio>
          <Radio
            order={unit === "km" ? 1 : 0}
            value={"splits_standard" satisfies SplitType}
          >
            Splits (mile)
          </Radio>
          <Radio value={"splits_metric" satisfies SplitType}>Splits (km)</Radio>
        </HStack>
      </RadioGroup>

      <Box overflowX="hidden" w="full">
        <HStack py="1" overflowX="auto">
          {activityQuery.isLoading
            ? Array.from({ length: 4 }, (_, i) => (
                <Card key={`skeleton:${i}`} bg="gray.50">
                  <CardBody>
                    <Stat>
                      <Skeleton mb="px">
                        <StatLabel>Load</StatLabel>
                      </Skeleton>
                      <Skeleton mb="px">
                        <StatNumber>Loading</StatNumber>
                      </Skeleton>
                      {splitType === "laps" && (
                        <Skeleton>
                          <StatHelpText>Loading</StatHelpText>
                        </Skeleton>
                      )}
                    </Stat>
                  </CardBody>
                </Card>
              ))
            : splits.map((split) => (
                <Card
                  key={split.split}
                  flexShrink={0}
                  border="1px solid"
                  transition="all 0.2s"
                  {...(selectedSplitIds.includes(split.split)
                    ? { borderColor: "orange.500" }
                    : { borderColor: "transparent" })}
                  bg="orange.50"
                  role="button"
                  _hover={{ bg: "orange.100" }}
                  onClick={() => toggleSplit(split)}
                >
                  <CardBody>
                    <Stat>
                      <StatLabel>
                        {match(splitType)
                          .with("laps", () => `Lap ${split.split}`)
                          .with("splits_metric", () => `Km ${split.split}`)
                          .with("splits_standard", () => `Mile ${split.split}`)
                          .exhaustive()}
                      </StatLabel>
                      <StatNumber>
                        {Utils.formatMeterSpeed(split.average_speed, { unit })}
                      </StatNumber>
                      {splitType === "laps" && (
                        <StatHelpText>
                          {Utils.formatMeterDistance(split.distance, { unit })}
                        </StatHelpText>
                      )}
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
            <StatLabel>
              {splitType === "laps" ? "Laps" : "Splits"}
              {" avg: "}
              {selectedSplitIds.join(", ")}
            </StatLabel>
            <StatNumber>{formattedAvgSplitSpeed}</StatNumber>
          </Stat>
        </CardBody>
      </Card>
    </VStack>
  );
}
