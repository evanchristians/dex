import { Flex, Tag } from "@chakra-ui/react";

interface ITypes {
  types: any[];
}
export const Types = ({ types }: ITypes) => {
  return (
    <Flex alignItems="center" position="absolute" top={2} left={2}>
      {types.map((type) => (
        <Tag color="white" bg={"types." + type.type.name} mr={2}>
          {type.type.name}
        </Tag>
      ))}
    </Flex>
  );
};
