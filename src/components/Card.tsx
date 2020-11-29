import { Fade, Flex, GridItem, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Visible from "react-visibility-sensor";
import fetchWithCache from "../lib/fetchWithCache";

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
                  #{poke.id} {poke.name}
                </Text>
              </>
            ) : (
              <Spinner color="white" />
            )}
          </Flex>
        </Visible>
      </Fade>
    </GridItem>
  );
};

export default Card;
