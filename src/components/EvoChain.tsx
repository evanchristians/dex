import {
  Box,
  Flex,

  Link,
  List,
  ListItem,
  Spinner,
  Tag
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import fetchWithCache from "../lib/fetchWithCache";

export interface IEvoChain {
  url: string;
}

export const EvoChain: React.FC<IEvoChain> = ({ url }) => {
  const [species, setSpecies] = useState<any>();
  const [evoChain, setEvoChain] = useState<any>();
  const [evoDetails, setEvoDetails] = useState<any>([]);

  const generateEvoChain = async (link: any, setter: CallableFunction) => {
    let list: any[] = [];
    let chainLink: any = link;

    do {
      await fetchWithCache(
        `https://pokeapi.co/api/v2/pokemon/${chainLink.species.name}`
      ).then((res) => list.push(res));
      chainLink = chainLink.evolves_to[0];
    } while (chainLink);

    return setter(list);
  };

  useEffect(() => {
    if (evoChain) {
      generateEvoChain(evoChain, setEvoDetails);
    }
    return;
  }, [evoChain]);

  useEffect(() => {
    if (species) {
      fetchWithCache(species.evolution_chain.url).then((res) =>
        setEvoChain(res.chain)
      );
    }
    return;
  }, [species]);

  useEffect(() => {
    if (url) {
      fetchWithCache(url).then((res) => setSpecies(res));
    }
    return;
  }, [url]);

  return (
    <Flex flexDir="column" ml="auto" display={["none", "none", "flex"]}>
      <List display="flex">
        {evoDetails.length > 0
          ? evoDetails.map((evoDetail: any, key: any) => {
              return (
                <ListItem
                  key={key}
                  display="flex"
                  borderRadius={12}
                  mr={2}
                >
                  <NextLink href={`/pokemon/${evoDetail.name}`}>
                    <Link _hover={{ textDecoration: "none" }}>
                      <Flex
                        flexDir="column"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        p={2}
                      >
                        {evoDetail ? (
                          <>
                            <Box mt="auto">
                              <Image
                                src={evoDetail.sprites.front_default}
                                alt={evoDetail.name}
                                width={80}
                                height={80}
                              />
                            </Box>
                            <Tag color="white" bg="purple.light">
                              No.{evoDetail.id.toString().padStart(3, "0")}
                            </Tag>
                          </>
                        ) : (
                          <Spinner color="white" />
                        )}
                      </Flex>
                    </Link>
                  </NextLink>
                </ListItem>
              );
            })
          : null}
      </List>
    </Flex>
  );
};

export default EvoChain;
