import { Fade, Flex, GridItem, Spinner, Text, Link } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Visible from "react-visibility-sensor";
import fetchWithCache from "../lib/fetchWithCache";
import NextLink from "next/link";

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
          <NextLink href={poke ? `pokemon/${poke.id}` : "/"}>
            <Link _hover={{ textDecoration: "none" }}>
              <Flex
                w="100%"
                h={200}
                bg="#ffffff11"
                flexDir="column"
                alignItems="center"
                overflow="hidden"
                borderRadius={12}
              >
                {poke ? (
                  <>
                    <Image
                      src={poke.sprites.front_default}
                      alt={poke.name}
                      width={120}
                      height={120}
                    />
                    <Flex
                      bg="purple.light"
                      width="100%"
                      p={3}
                      flexDir="column"
                      mt="auto"
                      textAlign="center"
                      color="white"
                    >
                      <Text>No.{poke.id.toString().padStart(3, "0")}</Text>
                      <Text>{poke.name}</Text>
                    </Flex>
                  </>
                ) : (
                  <Spinner color="purple.base" />
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
