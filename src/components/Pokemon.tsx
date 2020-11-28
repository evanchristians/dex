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
      setPokeData(pokemon.slice(0, 20));
    }
  }, [pokemon]);

  useEffect(() => {
    if (search.length > 0) {
      setPokeData(pokemon.filter((data: any) => data.name.includes(search)));
    } else {
      setPokeData(pokemon.slice(0, 20));
    }
  }, [search]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%" py={8}>
      {pokeData.map((poke: any, key: string) => (
        <Card key={key} url={poke.url} />
      ))}
    </Grid>
  );
};

export default Pokemon;
