import { Box, Image, Text } from '@chakra-ui/react'
type Props = {
  currentType: 'inventory' | 'shop' | 'town' | 'none'
  onOpenShop: () => void
  onReturnToTown: () => void
  onOpenInventory: () => void
}
type MenuItemProps = {
  currentType: 'inventory' | 'shop' | 'town' | 'none'
  type: 'inventory' | 'shop' | 'town'
  onClick?: () => void
}
const MenuItemLabel = {
  land: 'Land',
  inventory: 'Inventory',
  shop: 'Shop',
  town: 'Town',
}
function MenuItem({ type, currentType, onClick }: MenuItemProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      onClick={onClick}
      cursor="url(/images/worldmap/SelectCursor.webp), auto !important"
      position="relative"
    >
      <Image
        src={`images/worldmap/${type}-${
          currentType === type ? 'active' : 'disabled'
        }.webp`}
        width={'80px'}
        height={'80px'}
        alt={`${type}-icon`}
      />
      <Text
        position="absolute"
        bottom="-6px"
        fontWeight="bold"
        color={{
          base: '#fff',
          lg: '#000',
        }}
        textShadow={{
          base: '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;',
          lg: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;',
        }}
      >
        {MenuItemLabel[type]}
      </Text>
    </Box>
  )
}
function WorldMenu(props: Props) {
  const { onOpenShop, onReturnToTown, onOpenInventory, currentType } = props
  return (
    <Box
      bgColor="transparent"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      mb={{ lg: 12 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
    >
      <Box
        w={{
          base: '100%',
          lg: 'unset',
        }}
        h={100}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        bgColor={{
          base: '#465763',
          lg: '#D9D9D9',
        }}
        position="relative"
        _after={{
          content: `""`,
          position: 'absolute',
          top: '4px',
          right: '0',
          left: '0',
          bg: '#847967',
          h: '2px',
        }}
        borderRadius={{ lg: 10 }}
        alignSelf="center"
        p="2px 16px"
        gap={4}
      >
        <MenuItem type="shop" currentType={currentType} onClick={onOpenShop} />
        <MenuItem
          type="town"
          currentType={currentType}
          onClick={onReturnToTown}
        />
        <MenuItem
          type="inventory"
          currentType={currentType}
          onClick={onOpenInventory}
        />
      </Box>
    </Box>
  )
}

export default WorldMenu
