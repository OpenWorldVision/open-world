import { Button } from '@chakra-ui/react'
import styles from './BuyerBoard.module.css'
import { useCallback, useEffect, useState } from 'react'
import NotificationBuyItem from './NotificationBuyItem'
import { purchaseItems } from 'utils/NFTMarket'

type Props = {
  isOpen: boolean
  toggleModalBuyModal: () => void
  buyDetail: any
  handlePurchaseItem: any
}

export default function BuyerBoard(props: Props) {
  const { isOpen, toggleModalBuyModal, buyDetail, handlePurchaseItem } = props

  const [numberItem, setNumberItem] = useState(0)
  const [totalOpen, setTotalOpen] = useState(0)
  const [myOpen, setMyOpen] = useState(100)
  const [notiContent, setNotiContent] = useState({})
  const [isShowNoti, setIsShowNoti] = useState(false)

  const handleHiddenModal = useCallback(() => {
    toggleModalBuyModal()
    setNumberItem(0)
    setTotalOpen(0)
  }, [toggleModalBuyModal])

  const handleConfirmBuy = useCallback(async () => {
    setNumberItem(0)
    setTotalOpen(0)
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
    <>
      <div
        className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
      >
        {!isShowNoti && (
          <div className={styles.modal}>
            <h3 className={styles.sellBoard}>
              <img src="/images/foodcourt/buyer-board.png" alt="Buyer board" />
            </h3>

            <div
              className={`${styles.closeBtn} click-cursor`}
              onClick={handleHiddenModal}
            ></div>

            <div className={styles.boardContent}>
              <h3>SELECTED ITEM:</h3>
              <div className={`${styles.selectedItem}`}>
                {buyDetail['trait'] === '2' ? (
                  <img src="/images/workshop/ore.png" alt="ore" />
                ) : (
                  <img src="/images/workshop/hammer.png" alt="hammer" />
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
              ></Button>
            </div>

            <div
              style={{ backgroundColor: 'transparent' }}
              className="overlay"
              onClick={toggleModalBuyModal}
            ></div>
          </div>
        )}
        {isShowNoti && (
          <NotificationBuyItem
            notiContent={notiContent}
            handleHiddenNoti={handleShowNoti}
          />
        )}
      </div>
    </>
  )
}
