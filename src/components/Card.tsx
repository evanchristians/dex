import { Flex, GridItem, Image, Spinner, Text } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";

export interface ICard {
  url: string;
  key: string;
}

export const Card: React.FC<ICard> = ({ url, key }) => {
  const [poke, setPoke] = useState<any>();
  Axios.get(url).then((res: any) => setPoke(res.data));
  if (poke)
    return (
      <GridItem key={poke.id}>
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
          <Spinner />
        </Flex>
      </GridItem>
    );
};

export default Card;
