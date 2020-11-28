import { Input } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";
import { Container } from "../components/Container";
import Pokemon from "../components/Pokemon";
import { Wrapper } from "../components/Wrapper";

const Index = ({ pokemon }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Container minH="100vh" bg="linear-gradient(to bottom, #1E6C9D, #185a9d)">
      <Wrapper>
        <Input
          variant="outline"
          borderColor="transparent"
          p={6}
          bg="#00000033"
          color="white"
          _placeholder={{ color: "white" }}
          my={5}
          placeholder="search pokemon"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Pokemon pokemon={pokemon} search={searchQuery} />
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async () => {
  const data = await Axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=600"
  ).then((res) => res.data.results);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Index;
