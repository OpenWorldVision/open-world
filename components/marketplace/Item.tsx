import { Text, Box, Image, useMediaQuery } from '@chakra-ui/react'
import Price from '@components/Shop/Price'
import Button from '@components/theme/components/Button'
import { useState, useCallback } from 'react'
import truncateEthAddress from 'utils/truncateAddress'

type Props = {
  onBuy: () => void
  price: string
  imageUrl: string
  name: string
  seller: string
  available: number
  actionLabel: 'cancel' | 'buy'
}
function Item({
  onBuy,
  price,
  imageUrl,
  name,
  available,
  actionLabel,
  seller,
}: Props) {
  const [isBought, setIsBought] = useState(false)
  const [isMobile] = useMediaQuery('(max-width: 1014px)')

  const handleBuy = useCallback(() => {
    setIsBought(true)
    onBuy()
  }, [onBuy])

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      bgColor="#DCD7C1"
      p="16px 12px"
      borderRadius={10}
      gap={2}
    >
      <Box display="flex" gap={1}>
        <Box p={0.4} minW={68} mr={1}>
          <Image src={imageUrl} width={68} height={68} alt="stone-pickaxe" />
          <Text fontWeight="bold" fontSize={14} color="gray.600" mt={1}>
            Seller
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minW={136}
        >
          <Text fontSize="14" fontWeight="medium" color="black">
            {name}
          </Text>

          {isMobile && <Price price={Number(price)} />}
          <Text fontWeight="medium" fontSize={14} color="gray.600">
            {truncateEthAddress(seller)}
          </Text>
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
          color='black'
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
        <Text>Available: {available}</Text>
        <Button
          bgColor="#472805"
          color="#F0E0D0"
          onClick={handleBuy}
          disabled={isBought}
          mt="12px"
          size="sm"
        >
          {actionLabel === 'buy' ? 'Buy' : 'Cancel'}
        </Button>
      </Box>
    </Box>
  )
}

export default Item
