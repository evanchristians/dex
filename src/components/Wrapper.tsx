import { Flex, FlexProps } from "@chakra-ui/react";

export const Wrapper = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="min(1024px, 100%)"
      px={4}
      {...props}
    />
  );
};
