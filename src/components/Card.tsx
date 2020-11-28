import { Fade, Flex, GridItem, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import fetchWithCache from "../lib/fetchWithCache";

export interface ICard {
  url: string;
  key: string;
}

export const Card: React.FC<ICard> = ({ url, key }) => {
  const [poke, setPoke] = useState<any>();

  fetchWithCache(url).then((res) => setPoke(res));

  if (poke)
    return (
      <GridItem key={poke.id}>
        <Fade in={true}>
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
            <Image
              boxSize="100px"
              objectFit="cover"
              src={poke.sprites.front_default}
              alt={poke.name}
            />
            <Text color="white" mt="auto">
              #{poke.id} {poke.name}
            </Text>
          </Flex>
        </Fade>
      </GridItem>
    );
  else
    return (
      <GridItem key={key}>
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
          <Spinner color="white" />
        </Flex>
      </GridItem>
    );
};

export default Card;
