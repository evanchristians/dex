import { Input } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState } from "react";
import { Container } from "../components/Container";
import Pokemon from "../components/Pokemon";
import { Wrapper } from "../components/Wrapper";

const Index = ({ pokemon }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Container minH="100vh" bg="linear-gradient(to bottom, #43cea2, #185a9d)">
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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Pokemon pokemon={pokemon} search={searchQuery} />
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async () => {
  const data = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then((res) => {
      return Axios.all(
        res.data.results.map(({ url }: { url: any }) => Axios.get(url))
      ).then(Axios.spread((...responses) => responses));
    })
    .then((data) => data.map((results) => (results as any).data));

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Index;
