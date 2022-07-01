import { Box, Text, Image } from '@chakra-ui/react'

type Props = {
  price: number
}
function Price({ price }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      bgColor="#A69876"
      borderRadius={20}
      p="4px 8px"
    >
      <Text color="#412300" fontWeight="medium" mr={2} fontSize="13" pl={6}>
        {price}
      </Text>
      <Image src="/images/shop/coin.webp" alt="coin" w={18} h={18} />
    </Box>
  )
}

export default Price
