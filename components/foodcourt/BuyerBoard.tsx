import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import styles from './BuyerBoard.module.css'
import { useCallback, useState } from 'react'
import NotificationBuyItem from './NotificationBuyItem'

type Props = {
  isOpen: boolean
  toggleModalBuyModal: () => void
  buyDetail: any
  handlePurchaseItem: any
}

function BuyerBoard(props: Props) {
  const { isOpen, toggleModalBuyModal, buyDetail, handlePurchaseItem } = props
  const [notiContent, setNotiContent] = useState({})
  const [isShowNoti, setIsShowNoti] = useState(false)

  const handleHiddenModal = useCallback(() => {
    toggleModalBuyModal()
  }, [toggleModalBuyModal])

  const handleConfirmBuy = useCallback(async () => {
    const data = await handlePurchaseItem(
      parseInt(buyDetail?.id),
      buyDetail?.items
    )
    if (data) {
      setIsShowNoti(true)
      setNotiContent({
        value: 'SUCCESS',
      })
      //handle success
    }
  }, [buyDetail?.id, buyDetail?.items, handlePurchaseItem])

  const handleShowNoti = useCallback(() => {
    setIsShowNoti(false)
    toggleModalBuyModal()
  }, [toggleModalBuyModal])

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModalBuyModal}
      closeOnOverlayClick
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0}>
          {!isShowNoti && (
            <div className={styles.modal}>
              <h3 className={styles.sellBoard}>
                <img
                  src="/images/foodcourt/buyer-board.png"
                  alt="Buyer board"
                />
              </h3>

              <div
                className={`${styles.closeBtn} click-cursor`}
                onClick={handleHiddenModal}
              />

              <div className={styles.boardContent}>
                <Text fontSize="xl">SELECTED ITEM</Text>
                <div className={`${styles.selectedItem}`}>
                  {buyDetail['trait'] === 1 ? (
                    <img src="/images/foodcourt/fish.png" alt="Fish" />
                  ) : (
                    <img src="/images/foodcourt/sushi.png" alt="Sushi" />
                  )}
                </div>

                <div className={styles.haveToPay}>
                  <div className={styles.helpText}>I Have To Pay</div>
                  <div className={styles.priceTotal}>
                    {buyDetail?.price * buyDetail?.items?.length}
                    <div>OPEN</div>
                  </div>
                </div>
                <Button
                  sx={{
                    cursor:
                      'url(/images/worldmap/SelectCursor.webp), auto !important',
                  }}
                  onClick={handleConfirmBuy}
                  className={styles.btnConfirm}
                />
              </div>
            </div>
          )}
          {isShowNoti && (
            <NotificationBuyItem
              notiContent={notiContent}
              handleHiddenNoti={handleShowNoti}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BuyerBoard
