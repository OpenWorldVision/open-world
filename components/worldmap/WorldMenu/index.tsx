import { Box, Image, Text } from '@chakra-ui/react'
type Props = {
  onOpenShop: () => void
}
type MenuItemProps = {
  type: 'land' | 'inventory' | 'shop' | 'town'
  onClick?: () => void
}
const MenuItemLabel = {
  land: 'Land',
  inventory: 'Inventory',
  shop: 'Shop',
  town: 'Town',
}
function MenuItem({ type, onClick }: MenuItemProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      onClick={onClick}
      cursor="url(/images/worldmap/SelectCursor.webp), auto !important"
    >
      <Image
        src={`images/worldmap/${type}-icon.webp`}
        width={90}
        height={90}
        alt={`${type}-icon`}
      />
      <Text fontWeight="bold">{MenuItemLabel[type]}</Text>
    </Box>
  )
}
function WorldMenu(props: Props) {
  const { onOpenShop } = props
  return (
    <Box
      bgColor="transparent"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      mb={20}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        bgColor="#D9D9D9"
        borderRadius={10}
        alignSelf="center"
        p="2px 20px"
        gap={4}
      >
        <MenuItem type="land" />

        <MenuItem type="town" />
        <MenuItem type="inventory" />
        <MenuItem type="shop" onClick={onOpenShop} />
      </Box>
    </Box>
  )
}

export default WorldMenu
