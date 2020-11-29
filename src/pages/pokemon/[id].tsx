import { Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import fetchWithCache from "../../lib/fetchWithCache";

const Pokemon = () => {
  const router = useRouter();
  const { id } = router.query;
  const [poke, setPoke] = useState<any>();

  fetchWithCache(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
    setPoke(res)
  );

  return (
    <Container minH="100vh" bg="purple.base">
      <Wrapper>{poke ? <Text>{poke.name}</Text> : <Spinner />}</Wrapper>
    </Container>
  );
};

export default Pokemon;
