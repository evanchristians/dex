import { Flex, FlexProps, Tag } from "@chakra-ui/react";

interface ITypes extends FlexProps {
  types: any[];
}
export const Types = (props: ITypes) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={["center", "center", "flex-start"]}
      {...props}
    >
      {props.types.map((type) => (
        <Tag color="white" bg={"types." + type.type.name} mr={2}>
          {type.type.name}
        </Tag>
      ))}
    </Flex>
  );
};
