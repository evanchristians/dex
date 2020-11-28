import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export interface IPokemon {
  pokemon: any;
  search: string;
}

export const Pokemon: React.FC<IPokemon> = ({ pokemon, search }) => {
  const [pokeData, setPokeData] = useState(pokemon);

  useEffect(() => {
    if (pokemon) {
      setPokeData(pokemon);
    }
  }, [pokemon]);

  useEffect(() => {
    if (search.length > 0) {
      setPokeData(pokemon.filter((data: any) => data.name.includes(search)));
    } else {
      setPokeData(pokemon);
    }
  }, [search]);

  if (pokeData)
    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%" py={8}>
        {pokeData.map((poke: any) => (
          <GridItem key={poke.id}>
            <Flex
              w="100%"
              h="auto"
              bg="#00000011"
              padding={6}
              flexDir="column"
              alignItems="center"
              borderRadius={6}
            >
              <Image
                boxSize="100px"
                objectFit="cover"
                src={poke.sprites.front_default}
                alt={poke.name}
              />
              <Text color="white">
                #{poke.id} {poke.name}
              </Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    );
  else return <Text color="white">No Results</Text>;
};

export default Pokemon;
