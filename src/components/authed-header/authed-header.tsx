import { postJson } from "@/lib/api";
import { Athlete } from "@/lib/types";
import { Unit } from "@/lib/utils";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AuthedHeaderContextProvider } from "./authed-header-context";

type AuthedHeaderProps = React.PropsWithChildren<{
  athlete: Athlete;
  accessToken: string;
}>;
export const AuthedHeader: React.FC<AuthedHeaderProps> = ({
  children,
  athlete,
  accessToken,
}) => {
  const disclosure = useDisclosure();
  const [nDays, setNDays] = React.useState(30);
  const [unit, setUnit] = React.useState<Unit>("miles");

  const router = useRouter();
  const signOut = () => {
    postJson("/api/sign-out").then(() => {
      router.push("/");
    });
  };

  return (
    <AuthedHeaderContextProvider {...{ accessToken, unit, athlete, nDays }}>
      <VStack alignItems="flex-start" w="full" py={{ base: "4" }}>
        <HStack w="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing="0">
            <Heading color="orange.500" fontSize={{ base: "xl", md: "3xl" }}>
              Strava Insights
            </Heading>
            <Text>
              {athlete.firstname} {athlete.lastname}{" "}
              {athlete.username ? `(${athlete.username})` : ""}
            </Text>

            <Link
              color="orange.500"
              fontWeight="medium"
              fontSize="sm"
              isExternal
              href={`${process.env.NEXT_PUBLIC_STRAVA_URL}/athletes/${athlete.id}`}
            >
              View on Strava
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
      </VStack>

      <Divider mb="4" />

      {children}

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
    </AuthedHeaderContextProvider>
  );
};
