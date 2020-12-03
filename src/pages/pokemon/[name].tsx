import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
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
      <BackButton />
      <>
        <Wrapper
          flexDir="row"
          justifyContent={["center", "center", "flex-start"]}
        >
          <Heading
            my={12}
            fontSize="clamp(45px, 5vw, 76px)"
            textTransform="capitalize"
            textAlign={["center", "center", "left"]}
          >
            <Skeleton
              isLoaded={poke}
              startColor="purple.base"
              endColor="purple.light"
            >
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
            <Skeleton
              isLoaded={poke}
              startColor="purple.base"
              endColor="purple.light"
            >
              <Text my={2}>{poke ? poke.name : "loading..."}</Text>
            </Skeleton>
            <Skeleton
              isLoaded={poke}
              startColor="purple.base"
              endColor="purple.light"
            >
              <Box position="relative">
                {poke ? (
                  <Types
                    position="relative"
                    types={poke.types}
                  />
                ) : (
                  <Box height={20} width={500}></Box>
                )}
              </Box>
            </Skeleton>
          </Heading>
          {poke ? (
            <EvoChain url={poke.species.url} />
          ) : (
            <Box height="8rem" width="16rem"></Box>
          )}
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
