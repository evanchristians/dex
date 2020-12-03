import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
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
      {poke ? (
        <>
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
                <Image
                  src={poke.sprites.other["official-artwork"].front_default}
                  alt={poke.name}
                  width={330}
                  height={330}
                />
              </Box>
            </Wrapper>
          </Flex>
        </>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Pokemon;
