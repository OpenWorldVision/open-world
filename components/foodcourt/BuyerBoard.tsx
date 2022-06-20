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
  const [amountItems, setAmountItems] = useState(null)

  const handleHiddenModal = useCallback(() => {
    toggleModalBuyModal()
  }, [toggleModalBuyModal])

  const handleConfirmBuy = useCallback(async () => {
    const data = await handlePurchaseItem(
      parseInt(buyDetail?.id),
      buyDetail?.items.slice(0, Number(amountItems))
    )
    if (data) {
      setIsShowNoti(true)
      setNotiContent({
        value: 'SUCCESS',
      })
      //handle success
    }
  }, [buyDetail?.id, buyDetail?.items, handlePurchaseItem, amountItems])

  const handleShowNoti = useCallback(() => {
    setIsShowNoti(false)
    toggleModalBuyModal()
  }, [toggleModalBuyModal])

  const handleChangeAmountSellingItem = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxAmount = buyDetail?.items?.length
      setAmountItems(
        e.target.value === '' ? '' : Math.min(Number(e.target.value), maxAmount)
      )
    },
    [buyDetail?.items?.length]
  )

  const handleDecreaseSellingItemAmount = useCallback(() => {
    setAmountItems((amountItemsPrev) => {
      if (amountItemsPrev > 0) {
        return Number(amountItemsPrev) - 1
      }
      return amountItemsPrev
    })
  }, [])

  const handleIncreaseSellingItemAmount = useCallback(() => {
    const maxAmount = buyDetail?.items?.length
    setAmountItems((amountItemsPrev) => {
      return Math.min(Number(amountItemsPrev) + 1, maxAmount)
    })
  }, [buyDetail?.items?.length])

  const handleSelectAllItem = useCallback(() => {
    setAmountItems(buyDetail?.items?.length)
  }, [buyDetail?.items?.length])

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModalBuyModal}
      closeOnOverlayClick
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg="transparent">
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
                  {buyDetail['trait'] === 1 && (
                    <img src="/images/foodcourt/fish.png" alt="Fish" />
                  )}
                  {buyDetail['trait'] === 2 && (
                    <img src="/images/workshop/ore.png" alt="ore" />
                  )}
                  {buyDetail['trait'] === 3 && (
                    <img src="/images/workshop/hammer.png" alt="hammer" />
                  )}
                  {buyDetail['trait'] === 4 && (
                    <img src="/images/foodcourt/sushi.png" alt="Sushi" />
                  )}
                </div>

                <div className={styles.buyingAmount}>
                  <div>
                    <Text>Buying Amount</Text>
                  </div>
                  <input
                    type="number"
                    value={amountItems}
                    onChange={handleChangeAmountSellingItem}
                  />
                  <div className={styles.buyingAmountCalculation}>
                    <div
                      onClick={handleIncreaseSellingItemAmount}
                      className="click-cursor"
                    >
                      +
                    </div>
                    <div
                      onClick={handleDecreaseSellingItemAmount}
                      className="click-cursor"
                    >
                      -
                    </div>
                    <div onClick={handleSelectAllItem} className="click-cursor">
                      ALL
                    </div>
                  </div>
                </div>

                <div className={styles.haveToPay}>
                  <div className={styles.helpText}>I Have To Pay</div>
                  <div className={styles.priceTotal}>
                    <span>{buyDetail?.price * Number(amountItems) + ' '}</span>
                    <span> OPEN</span>
                  </div>
                </div>
                <Button
                  sx={{
                    cursor:
                      'url(/images/worldmap/SelectCursor.webp), auto !important',
                  }}
                  disabled={
                    Number(amountItems) < 1 || Number(amountItems) === null
                  }
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
