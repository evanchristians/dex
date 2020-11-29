import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "./Card";

export interface IPokemon {
  pokemon: any;
  search: string;
}

export const Pokemon: React.FC<IPokemon> = ({ pokemon, search }) => {
  const [pokeData, setPokeData] = useState(pokemon);

  useEffect(() => {
    if (pokemon) {
      setPokeData(pokemon.slice(0, 40));
    }
  }, [pokemon]);

  useEffect(() => {
    if (search.length > 0) {
      setPokeData(
        pokemon.filter((data: any) => data.name.includes(search)).slice(0, 40)
      );
    } else {
      setPokeData(pokemon.slice(0, 40));
    }
  }, [search]);

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap={4}
      width="100%"
      pb={8}
    >
      {pokeData.map((poke: any, key: string) => (
        <Card url={poke.url} key={key} />
      ))}
    </Grid>
  );
};

export default Pokemon;
