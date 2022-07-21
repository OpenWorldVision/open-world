import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import styles from '@components/workshop/BuyerBoard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ItemSellModal from './ItemSellModal'

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
  isOpen: boolean
  selectedItem: Item
  toggleItemNotify: () => void
  onToggleInventory: () => void
}

function ItemNotify({
  isOpen,
  selectedItem,
  toggleItemNotify,
  onToggleInventory,
}: Props) {
  const { isOpen: isItemSellOpen, onToggle: onToggleItemSell } = useDisclosure()
  const profile = useSelector((state: any) => state.ProfileStore.profile)
  const router = useRouter()

  const renderItemImg = useMemo(() => {
    if (selectedItem.type.includes('Card')) {
      return (
        <img
          src={`/images/inventory/items/${selectedItem.type}AmountMobile.png`}
          alt=""
        />
      )
    }
    return (
      <img src={`/images/workshop/mobile/${selectedItem.type}.webp`} alt="" />
    )
  }, [selectedItem])

  const renderItemName = useMemo(() => {
    if (selectedItem.type.includes('Card')) {
      return selectedItem.type.replace('Card', ' NFT Card')
    }

    return selectedItem.type
  }, [selectedItem])

  const renderItemInfo = useMemo(() => {
    if (selectedItem.type === 'fish') {
      return "Fish is the main ingredient for making Sushi and Suppliers are paying good money for them. Let's go catch some!!!"
    } else if (selectedItem.type === 'ore') {
      return "Ore is the main material to make Hammers and BlackSmiths are paying good money for them. Let's go mine some !!!"
    } else if (selectedItem.type === 'hammer') {
      return 'Hammer is item that help Openians doing their Mining quest'
    } else if (selectedItem.type === 'sushi') {
      return 'Sushi is only item that help increase Stamina Point.'
    }
  }, [selectedItem])

  const isCanUseItem = useMemo(() => {
    return (
      selectedItem.ids.length !== 0 &&
      ((selectedItem.type === 'fish' && profile?._profession === '2') ||
        (selectedItem.type === 'ore' && profile?._profession === '3') ||
        (selectedItem.type === 'hammer' && profile?._profession === '1') ||
        selectedItem.type === 'sushi' ||
        (selectedItem.type.includes('Card') && profile?._profession === '0'))
    )
  }, [selectedItem])

  const handleUseItem = useCallback(() => {
    if (selectedItem.type !== 'sushi') {
      router.push('/professions')
      toggleItemNotify()
      onToggleInventory()
    } else {
    }
  }, [toggleItemNotify, onToggleInventory])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={toggleItemNotify}
        closeOnOverlayClick
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody padding={0}>
            <div className={styles.modalMobile}>
              <div className={styles.closeBtnMobile} onClick={toggleItemNotify}>
                <FontAwesomeIcon icon={faXmark} />
              </div>

              <div className={styles.itemBackground}>
                <div
                  className={styles.imgContainer}
                  style={
                    selectedItem.type.includes('Card')
                      ? {
                          padding: 0,
                        }
                      : { padding: '10px' }
                  }
                >
                  {renderItemImg}
                </div>
              </div>
              <div className={styles.itemNameMobile}>{renderItemName}</div>
              <div className={styles.itemInfoMobile}>{renderItemInfo}</div>
              <Flex w="100%" justify="space-evenly">
                <Button
                  disabled={!isCanUseItem}
                  onClick={handleUseItem}
                  className={styles.itemBtnConfirm}
                >
                  Use
                </Button>
                <Button
                  disabled={selectedItem.ids.length === 0}
                  className={styles.itemBtnConfirm}
                  onClick={onToggleItemSell}
                >
                  Sell
                </Button>
              </Flex>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ItemSellModal
        isOpen={isItemSellOpen}
        toggleItemSell={onToggleItemSell}
        selectedItem={selectedItem}
        toggleItemNotify={toggleItemNotify}
      />
    </>
  )
}

export default ItemNotify
