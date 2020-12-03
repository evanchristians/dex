import { Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "./Card";

export interface IPokemon {
  pokemon: any;
  search: string;
}

export const Pokemon: React.FC<IPokemon> = ({ pokemon, search }) => {
  const router = useRouter();
  const { page } = router.query || 0;
  const pageSize = 24;

  const [pokeData, setPokeData] = useState();

  useEffect(() => {
    if (pokemon) {
      setPokeData(
        pokemon.slice(
          parseInt(page as string) * pageSize,
          (parseInt(page as string) + 1) * pageSize
        )
      );
    }
  }, [pokemon, page]);

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
    <Flex flexDir="column" width="100%">
      {/* <Flex>
        {parseInt(page as string) >= 1 ? (
          <Link href={`/?page=${parseInt(page as string) - 1}`}>
            <Button>prev</Button>
          </Link>
        ) : null}
        {parseInt(page as string) <= Math.ceil(980 / pageSize) ? (
          <Link href={`/?page=${parseInt(page as string) + 1}`}>
            <Button>next</Button>
          </Link>
        ) : null}
      </Flex> */}
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
        {typeof pokeData !== "undefined"
          ? (pokeData as any).map((poke: any, key: string) => (
              <Card url={poke.url} key={key} />
            ))
          : null}
      </Grid>
    </Flex>
  );
};

export default Pokemon;
