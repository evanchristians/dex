import { Fade, Flex, GridItem, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import fetchWithCache from "../lib/fetchWithCache";
import Image from "next/image";
import { Viewport } from "react-is-in-viewport";

export interface ICard {
  url: string;
  key: string;
}

export const Card: React.FC<ICard> = ({ url, key }) => {
  const [poke, setPoke] = useState<any>();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      console.log("fetching");

      fetchWithCache(url).then((res) => setPoke(res));
    }
    return;
  }, [inView, url]);

  return (
    <GridItem key={poke ? poke.id : key}>
      <Fade in={true}>
        <Viewport
          type="fit"
          onEnter={() => {
            setInView(true);
          }}
        >
          <Flex
            w="100%"
            h={200}
            bg="#00000011"
            padding={6}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            borderRadius={6}
          >
            {poke ? (
              <>
                <Image
                  src={poke.sprites.front_default}
                  alt={poke.name}
                  width={120}
                  height={120}
                />
                <Text color="white" mt="auto">
                  #{poke.id ?? key} {poke.name}
                </Text>
              </>
            ) : (
              <Spinner color="white" />
            )}
          </Flex>
        </Viewport>
      </Fade>
    </GridItem>
  );
};

export default Card;
