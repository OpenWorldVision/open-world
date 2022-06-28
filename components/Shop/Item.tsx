import { Text, Box, Image } from '@chakra-ui/react'
import Button from '@components/theme/components/Button'
import { utils } from 'ethers'
import { useState, useEffect } from 'react'
import { getHammerPrice, isBoughtHammer } from 'utils/Item'

type Props = {
  onBuy: () => void
}
function Item({ onBuy }: Props) {
  const [price, setPrice] = useState('0')
  const [isBought, setIsBought] = useState(true)

  useEffect(() => {
    ;(async () => {
      const _price = await getHammerPrice()
      setPrice(utils.formatEther(_price))
      const _isBought = await isBoughtHammer()
      setIsBought(_isBought)
    })()
  }, [])

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
      <Box bgColor="white" p={0.4} borderWidth={2} minW={68} mr={1}>
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

      <Box
        bgColor="#D9D9D9"
        p="8px 16px"
        borderRadius={10}
        mt={2}
        minW={110}
        mr={1}
      >
        <Text fontWeight="medium" fontSize={14}>
          Price {price}
        </Text>
      </Box>

      <Button
        bgColor="#472805"
        color="white"
        onClick={onBuy}
        disabled={isBought}
      >
        {isBought ? 'Sold Out' : 'Buy'}
      </Button>
    </Box>
  )
}

export default Item
