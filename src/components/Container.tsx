import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      bg="purple.base"
      color="white"
      {...props}
    />
  );
};
