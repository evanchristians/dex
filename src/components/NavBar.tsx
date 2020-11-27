import { Flex, FlexProps } from '@chakra-ui/react'

export const NavBar = (props: FlexProps) => {

  return (
    <Flex
      p={4}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      {...props}
    />
  )
}
