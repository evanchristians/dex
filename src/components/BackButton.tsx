import { Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export const BackButton = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    position="fixed"
    top="1rem"
    left="1rem"
  >
    <NextLink href="/">
      <Link>
        <Heading fontSize="clamp(24px, 3vw, 32px)">
          <i className="fas fa-arrow-left"></i>
        </Heading>
      </Link>
    </NextLink>
  </Flex>
);
