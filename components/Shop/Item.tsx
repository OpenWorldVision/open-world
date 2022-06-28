import { Text, Box, Image } from '@chakra-ui/react'
import Button from '@components/theme/components/Button'

type Props = {
  onBuy: () => void
}
function Item({ onBuy }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgColor="#ECECEC"
      p="6px 12px"
      borderRadius={10}
      mt={4}
      mb={4}
    >
      <Box bgColor="white" p={0.4} borderWidth={2} minW={68}>
        <Image
          src="/images/shop/icon-sushi-1.webp"
          width={68}
          height={68}
          alt="icon-sushi"
          p={2}
          background="linear-gradient(180deg, rgba(129, 129, 129, 0.7) 0%, rgba(213, 213, 213, 0.7) 100%)"
        />
      </Box>

      <Box maxW="60">
        <Text fontSize="md" fontWeight="medium">
          Stone Pickaxe
        </Text>
        <Text fontSize={12}>
          necessary tools for mining, made of black rock in the steep mountains.
        </Text>
      </Box>
      <Box p="5" alignItems="flex-end" display="flex" flexDirection="column">
        <Text fontSize={12}>Days limit: 2</Text>
        <Box bgColor="#D9D9D9" p="8px 22px" borderRadius={10} mt={2}>
          <Text fontWeight="medium" fontSize={14}>
            Price 150
          </Text>
        </Box>
      </Box>
      <Button bgColor="#472805" color="white" onClick={onBuy}>
        Buy
      </Button>
    </Box>
  )
}

export default Item
