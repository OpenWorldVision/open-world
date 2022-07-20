import { Button, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import ItemNotify from './ItemNotify'

type Item = {
	type:
		| 'sushi'
		| 'ore'
		| 'hammer'
		| 'fish'
		| 'openianCard'
		| 'blacksmithCard'
		| 'supplierCard'
	ids: number[]
}

type Props = {
  loading: boolean
  data: Item[]
  currentFilter: 'all' | 'ore' | 'food' | 'nftCard'
  onToggleInventory: () => void
}
function ItemGridMobile({ loading, data, currentFilter, onToggleInventory }: Props) {
  const { isOpen, onToggle: onToggleItemNotify } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<Item>({
		type: 'fish',
		ids: []
	})
  const renderData = useMemo(() => {
    let itemData = data
    if (currentFilter === 'ore') {
      itemData = data.filter(
        (item) => item.type === 'ore' || item.type === 'hammer'
      )
    } else if (currentFilter === 'food') {
      itemData = data.filter(
        (item) => item.type === 'fish' || item.type === 'sushi'
      )
    } else if (currentFilter === 'nftCard') {
      itemData = data.filter((item) => item.type.includes('Card'))
    }
    return [...itemData, ...Array(20 - itemData?.length)]
  }, [data, currentFilter])

  const onSelectItem = useCallback(
    (item) => {
      setSelectedItem(item)
      onToggleItemNotify()
    },
    [onToggleItemNotify]
  )

  return (
    <>
      <Grid
        templateColumns={{
          base: 'repeat(4, 1fr)',
          md: 'repeat(5, 1fr)',
        }}
        templateRows="repeat(5, 1fr)"
        gap={2}
        h="370px"
        mt="12px"
        mx="11px"
        p="8px"
        bg="#DCD7C1"
        borderRadius="10px"
      >
        {loading && <Spinner />}
        {renderData.map((value, index) => {
          if (!value) {
            return (
              <GridItem
                h="60px"
                bgGradient="linear-gradient(180deg, rgba(90, 90, 90, 0.7) 0%, rgba(171, 171, 171, 0.7) 100%)"
              ></GridItem>
            )
          }

          return (
            <GridItem
              key={`${value.indexItem}${index}`}
              h="60px"
              p="2px"
              bgGradient="linear-gradient(180deg, rgba(90, 90, 90, 0.7) 0%, rgba(171, 171, 171, 0.7) 100%)"
            >
              <Button
                p={!value.type.includes('Card') ? '10px' : '0'}
                h="100%"
                bg="transparent"
                position="relative"
                border="solid 1px #F8F8F8"
                borderRadius="none"
								outline="none"
                _hover={{
                  bg: 'transparent',
                }}
                _active={{
                  boxShadow: 'none',
                  bg: 'transparent',
                }}
                _focus={{
                  boxShadow: 'none',
                  bg: 'transparent',
                }}
                onClick={() => onSelectItem(value)}
              >
                <img
                  src={`/images/inventory/items/${value.type}AmountMobile.png`}
                  alt="img"
                />

                <Text
                  position="absolute"
                  right="5px"
                  bottom="2px"
                  fontSize="10px"
                  fontWeight="500"
                  style={{
                    textShadow:
                      '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff',
                  }}
                >
                  {value?.ids?.length}
                </Text>
              </Button>
            </GridItem>
          )
        })}
      </Grid>

      <ItemNotify
        isOpen={isOpen}
        toggleItemNotify={onToggleItemNotify}
        selectedItem={selectedItem}
        onToggleInventory={onToggleInventory}
      />
    </>
  )
}

export default ItemGridMobile
