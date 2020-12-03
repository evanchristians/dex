import {
  Box,
  Fade,
  Flex,
  GridItem,
  Link,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import Visible from "react-visibility-sensor";
import fetchWithCache from "../lib/fetchWithCache";
import { Types } from "./Types";

export interface ICard {
  url: string;
}

export const Card: React.FC<ICard> = ({ url }) => {
  const [poke, setPoke] = useState<any>();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      fetchWithCache(url).then((res) => setPoke(res));
    }
    return;
  }, [inView, url]);

  return (
    <GridItem key={poke ? poke.id : undefined}>
      <Fade in={true}>
        <Visible
          partialVisibility
          onChange={(isVisible) => {
            setInView(isVisible);
          }}
        >
          <NextLink href={poke ? `pokemon/${poke.name}` : "/"}>
            <Link _hover={{ textDecoration: "none" }}>
              <Flex
                w="100%"
                h={275}
                bg="#ffffff11"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                borderRadius={12}
                position="relative"
              >
                {poke ? (
                  <>
                    <Types
                      types={poke.types}
                      position="absolute"
                      top={2}
                      left={2}
                    />
                    <Box mt="auto">
                      <Image
                        src={poke.sprites.front_default}
                        alt={poke.name}
                        width={120}
                        height={120}
                      />
                    </Box>
                    <Tag color="white" bg="purple.base">
                      No.{poke.id.toString().padStart(3, "0")}
                    </Tag>
                    <Flex
                      bg="purple.light"
                      width="100%"
                      p={3}
                      flexDir="column"
                      mt={2}
                      textAlign="center"
                      color="white"
                    >
                      <Text textTransform="capitalize">{poke.name}</Text>
                    </Flex>
                  </>
                ) : (
                  <Spinner color="white" />
                )}
              </Flex>
            </Link>
          </NextLink>
        </Visible>
      </Fade>
    </GridItem>
  );
};

export default Card;
