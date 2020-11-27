import { Flex, Heading } from '@chakra-ui/react'

export const Logo = ({ title }: { title: string }) => (
  <Flex justifyContent="center" alignItems="center">
    <Heading fontSize="clamp(24px, 3vw, 32px)">{title}</Heading>
  </Flex>
)

Logo.defaultProps = {
  title: 'dex',
}
