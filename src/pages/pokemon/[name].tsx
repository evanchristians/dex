import { Box, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import EvoChain from "../../components/EvoChain";
import { Types } from "../../components/Types";
import { Wrapper } from "../../components/Wrapper";
import fetchWithCache from "../../lib/fetchWithCache";

const Pokemon = () => {
  const router = useRouter();
  const { name } = router.query;
  const [poke, setPoke] = useState<any>();

  useEffect(() => console.log(poke), [poke]);

  if (name) {
    fetchWithCache(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
      setPoke(res)
    );
  }

  return (
    <Container minH="100vh" bg="purple.base">
      {poke ? (
        <Stack
          spacing="clamp(10rem, 15vw, 20rem)"
          width="100%"
          alignItems="center"
        >
          <Wrapper flexDir="row">
            <Heading
              my={12}
              fontSize="clamp(45px, 5vw, 76px)"
              textTransform="capitalize"
            >
              <Text
                mr={2}
                fontSize="clamp(24px, 4vw, 36px)"
                color="purple.light"
              >
                No.{poke.id.toString().padStart(3, "0")}
              </Text>
              {poke.name}
              <Box position="relative">
                <Types types={poke.types} />
              </Box>
            </Heading>
            <EvoChain url={poke.species.url} />
          </Wrapper>
          <Wrapper
            minH="100vh"
            zIndex="1"
            transform="translateY(clamp(120px, 12.5vw, 200px))"
          >
            text goes here
          </Wrapper>
          <Flex
            zIndex="0"
            position="absolute"
            flexDir="column"
            alignItems="center"
            bg="purple.light"
            width="160vw"
            borderRadius="100% 100% 0 0"
            border="25vw solid #9080F8"
            px={12}
            top="clamp(10rem, 15vw, 20rem)"
          >
            <Box
              transform="translateY(calc(-60% - 25vw))"
              justifySelf="flex-start"
            >
              <Image
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                width={330}
                height={330}
              />
            </Box>
          </Flex>
        </Stack>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Pokemon;
