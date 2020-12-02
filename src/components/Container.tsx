import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  return (
    <Flex
      minH="100vh"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg="purple.base"
      color="white"
      {...props}
    />
  );
};
