import { Button } from '@chakra-ui/react'
import styles from './BuyerBoard.module.css'
import { useCallback, useEffect, useState } from 'react'
import NotificationBuyItem from './NotificationBuyItem'

type Props = {
  isOpen: boolean
  toggleModalBuyModal: () => void
  buyDetail: object
}

export default function BuyerBoard(props: Props) {
  const { isOpen, toggleModalBuyModal, buyDetail } = props

  const [numberItem, setNumberItem] = useState(0)
  const [totalOpen, setTotalOpen] = useState(0)
  const [myOpen, setMyOpen] = useState(100)
  const [notiContent, setNotiContent] = useState({})
  const [isShowNoti, setIsShowNoti] = useState(false)

  const handlePrevious = useCallback(() => {
    if (numberItem > 0) {
      setNumberItem(numberItem - 1)
    }
  }, [numberItem])

  const handleIncrease = useCallback(() => {
    setNumberItem(numberItem + 1)
  }, [numberItem])

  useEffect(() => {
    if (buyDetail['price']) {
      setTotalOpen(numberItem * buyDetail['price'])
    }
  }, [numberItem])

  const handleMaxItem = useCallback(() => {
    setNumberItem(buyDetail['available'])
    numberItem * buyDetail['price'](numberItem * buyDetail['available'])
  }, [numberItem, buyDetail])

  const handleHiddenModal = useCallback(() => {
    toggleModalBuyModal()
    setNumberItem(0)
    setTotalOpen(0)
  }, [])

  const handleConfirmBuy = useCallback(() => {
    if (numberItem > 0) {
      if (myOpen < totalOpen) {
        setNotiContent({
          value: false,
          content: 'Not Enough OPEN !',
        })
      } else if (buyDetail['available'] < numberItem) {
        setNotiContent({
          value: false,
          content: 'The Available Amount Is Not Enough !',
        })
      } else {
        setNotiContent({
          value: true,
          content: 'Your Order has been Completed !',
          helpText: 'Check Your Inventory For Bought Items !',
        })
      }
      setIsShowNoti(true)
      setNumberItem(0)
      setTotalOpen(0)
    }
  }, [numberItem])

  const handleShowNoti = useCallback(() => {
    setIsShowNoti(false)
    toggleModalBuyModal()
  }, [])

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
                {buyDetail['itemName'] === 'sushi' ? (
                  <img src="/images/foodcourt/sushi.png" alt="Sushi" />
                ) : (
                  <img src="/images/foodcourt/fish.png" alt="Fish" />
                )}
              </div>
              <div className={styles.wantToBuy}>
                <div className={styles.helpText}>I Want To Buy</div>
                <div className={styles.editNumberItems}>
                  <div className={styles.numberItems}>
                    <span>{numberItem}</span>
                    <div onClick={handleMaxItem} className="click-cursor">
                      Max
                    </div>
                  </div>
                  <div className={styles.itemName}>{buyDetail['itemName']}</div>
                </div>
              </div>
              <div className={styles.BtnContainer}>
                <div
                  onClick={handlePrevious}
                  className={`${styles.previous} click-cursor`}
                >
                  -
                </div>
                <div
                  onClick={handleIncrease}
                  className={`${styles.increase} click-cursor`}
                >
                  +
                </div>
              </div>
              <div className={styles.haveToPay}>
                <div className={styles.helpText}>I Have To Pay</div>
                <div className={styles.priceTotal}>
                  {totalOpen}
                  <div>OPEN</div>
                </div>
              </div>
              <Button
                sx={{
                  cursor:
                    'url(/images/worldmap/SelectCursor.webp), auto !important',
                }}
                disabled={numberItem === 0}
                onClick={handleConfirmBuy}
                className={styles.btnConfirm}
              ></Button>
            </div>

            <div
              style={{ backgroundColor: 'transparent' }}
              className="overlay"
              onClick={() => toggleModalBuyModal()}
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
