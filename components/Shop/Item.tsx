import { Text, Box, Image, useMediaQuery } from '@chakra-ui/react'
import Button from '@components/theme/components/Button'
import { utils } from 'ethers'
import { useState, useEffect } from 'react'
import { getHammerPrice, isBoughtHammer } from 'utils/Item'
import Price from './Price'

type Props = {
  onBuy: () => void
}
function Item({ onBuy }: Props) {
  const [price, setPrice] = useState('0')
  const [isBought, setIsBought] = useState(true)
  const [isMobile] = useMediaQuery('(max-width: 1014px)')

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
      bgColor="#DCD7C1"
      p="16px 12px"
      borderRadius={10}
      mt={4}
      mb={4}
    >
      <Box display="flex" gap={1}>
        <Box bgColor="white" p={0.4} borderWidth={2} minW={68} mr={1}>
          <Image
            src="/images/shop/stone-pickaxe.webp"
            width={68}
            height={68}
            alt="stone-pickaxe"
            p={2}
            background="linear-gradient(180deg, rgba(90, 90, 90, 0.7) 0%, rgba(171, 171, 171, 0.7) 100%);"
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Text fontSize="14" fontWeight="medium">
            Stone Pickaxe
          </Text>
          {!isMobile && (
            <Text fontSize={12}>
              necessary tools for mining, made of black rock in the steep
              mountains.
            </Text>
          )}
          {isMobile && <Price price={Number(price)} />}
        </Box>
      </Box>

      {!isMobile && (
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
      )}
      <Box
        display="flex"
        flexDirection="column"
        fontWeight="medium"
        fontSize="10"
        color="#6A6A6A"
        alignItems="flex-end"
      >
        <Text>Available: 2</Text>
        <Button
          bgColor="#472805"
          color="#F0E0D0"
          onClick={onBuy}
          disabled={isBought}
          mt="8px"
        >
          {isBought ? 'Sold Out' : 'Buy'}
        </Button>
      </Box>
    </Box>
  )
}

export default Item
