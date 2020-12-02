import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Container } from "../components/Container";
import Pokemon from "../components/Pokemon";
import { Wrapper } from "../components/Wrapper";
import fetchWithCache from "../lib/fetchWithCache";

const Index = ({ pokemon }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Container minH="100vh">
      <Wrapper>
        <Input
          variant="outline"
          borderColor="transparent"
          borderRadius={10}
          p={6}
          bg="white"
          color="purple.base"
          my={5}
          placeholder="search pokemon"
          onChange={(event) => setSearchQuery(event.target.value)}
          _focus={{ borderColor: "purple.base" }}
        />
        <Pokemon pokemon={pokemon} search={searchQuery} />
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async () => {
  const data = await fetchWithCache(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  ).then((res) => res.results);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Index;
