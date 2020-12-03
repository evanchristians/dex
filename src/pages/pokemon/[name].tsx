import { Box, Flex, Heading, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useState } from "react";
import { Container } from "../../components/Container";
import EvoChain from "../../components/EvoChain";
import { Types } from "../../components/Types";
import { Wrapper } from "../../components/Wrapper";
import fetchWithCache from "../../lib/fetchWithCache";

const Pokemon = () => {
  const router = useRouter();
  const { name } = router.query;
  const [poke, setPoke] = useState<any>();

  if (name) {
    fetchWithCache(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
      setPoke(res)
    );
  }

  return (
    <Container bg="purple.base">
      <>
        <Wrapper flexDir="row">
          <Heading
            my={12}
            fontSize="clamp(45px, 5vw, 76px)"
            textTransform="capitalize"
          >
            <Skeleton isLoaded={poke}>
              <Text
                mr={2}
                fontSize="clamp(24px, 4vw, 36px)"
                color="purple.light"
              >
                {poke
                  ? `No.${poke.id.toString().padStart(3, "0")}`
                  : "loading..."}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={poke}>
              {poke ? poke.name : "loading..."}
            </Skeleton>
            <Skeleton isLoaded={poke}>
              <Box position="relative">
                {poke ? <Types types={poke.types} /> : "loading..."}
              </Box>
            </Skeleton>
          </Heading>
          <Skeleton isLoaded={poke} ml="auto">
            {poke ? <EvoChain url={poke.species.url} /> : "loading..."}
          </Skeleton>
        </Wrapper>
        <Flex
          justifyContent="center"
          mt={200}
          zIndex="0"
          bg="purple.light"
          width="100%"
          position="relative"
          flex="1"
          _after={{
            content: "''",
            bg: "purple.light",
            width: "160vw",
            borderRadius: "50% 50% 0 0",
            height: "50vw",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%, -7rem)",
            zIndex: "-1",
          }}
        >
          <Wrapper>
            <Box alignSelf="center" transform="translateY(-15rem)">
              {poke ? (
                <Image
                  src={poke.sprites.other["official-artwork"].front_default}
                  alt={poke.name}
                  width={330}
                  height={330}
                />
              ) : null}
            </Box>
          </Wrapper>
        </Flex>
      </>
    </Container>
  );
};

export default Pokemon;
