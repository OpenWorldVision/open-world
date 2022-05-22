import { Button } from '@chakra-ui/react'
import styles from './BuyerBoard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import NotificationBuyItem from './NotificationBuyItem'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  buyDetail: object
}

export default function BuyerBoard(props: Props) {
  const { isOpen, toggleModal, buyDetail } = props

  const [numberItem, setNumberItem] = useState(0)
  const [totalOpen, setTotalOpen] = useState(0)
  const [myOpen, setMyOpen] = useState(100)
  const [notiContent, setNotiContent] = useState({})
  const [isShowNoti, setIsShowNoti] = useState(false)


  const handlePrevious = () => {
    setNumberItem(numberItem + 1)
  }

  const handleIncrease = () => {
    if (numberItem > 0) {
      setNumberItem(numberItem - 1)
    }
  }

  useEffect(() => {
    setTotalOpen(numberItem * buyDetail['price'])
  }, [numberItem])

  const handleMaxItem = () => {
    setNumberItem(buyDetail['available'])
    numberItem * buyDetail['price'](numberItem * buyDetail['available'])
  }

  const handleHiddenModal = () => {
    toggleModal()
    setNumberItem(0)
    setTotalOpen(0)
  }

  const handleConfirmBuy = () => {
    if (numberItem > 0) {
      if (myOpen < totalOpen) {
        setNotiContent({
          'value': false,
          'content': 'Not Enough OPEN !'
        })
      }
      else if (buyDetail['available'] < numberItem) {
        setNotiContent({
          'value': false,
          'content': 'The Available Amount Is Not Enough !'
        })
      }
      else {
        setNotiContent({
          'value': true,
          'content': 'Your Order has been Completed !',
          'helpText': 'Check Your Inventory For Bought Items !'
        })
      }
      setIsShowNoti(true)
      setNumberItem(0)
      setTotalOpen(0)
    }
  }

  const handleHiddenNoti = () => {
    setIsShowNoti(false)
  }

  return (
    <>
      <div
        className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
      >
        {!isShowNoti && <div className={styles.modal}>
          <h3 className={styles.sellBoard}>
            <img
              src="/images/foodcourt//buyer-board.png"
              alt="Buyer board"
            />
          </h3>

          <Button sx={{cursor: 'url(/images/worldmap/SelectCursor.png), auto !important'}} className={`${styles.closeBtn} click-cursor`} onClick={handleHiddenModal}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>

          <div className={styles.boardContent}>
            <h3>SELECTED ITEM:</h3>
            <div
              className={`${styles.selectedItem}`}
            >
              {buyDetail['itemName'] === 'sushi' ? <img src="/images/foodcourt/sushi.png" alt="Sushi" />
                : <img src="/images/foodcourt/fish.png" alt="Fish"
                />}
            </div>
            <div className={styles.wantToBuy}>
              <div className={styles.helpText}>I Want To Buy</div>
              <div className={styles.editNumberItems}>
                <div className={styles.numberItems}>
                  <span>{numberItem}</span>
                  <div onClick={handleMaxItem} className='click-cursor'>Max</div>
                </div>
                <div className={styles.BtnContainer}>
                  <div onClick={handlePrevious} className={`${styles.increase} click-cursor`}></div>
                  <div onClick={handleIncrease} className={`${styles.previous} click-cursor`}></div>
                </div>
                <div className={styles.itemName}>{buyDetail['itemName']}</div>
              </div>
            </div>
            <div className={styles.haveToPay}>
              <div className={styles.helpText}>I Have To Pay</div>
              <div className={styles.priceTotal}>
                {totalOpen}
                <div>OPEN</div>
              </div>
            </div>
            <Button sx={{cursor: 'url(/images/worldmap/SelectCursor.png), auto !important'}} disabled={numberItem === 0} onClick={handleConfirmBuy} className={styles.btnConfirm}></Button>
          </div>

          <div style={{ backgroundColor: 'transparent' }} className="overlay" onClick={() => toggleModal()}></div>
        </div>
        }
        {isShowNoti && <NotificationBuyItem notiContent={notiContent} toggleModalNoti={handleHiddenNoti} />}
      </div>
    </>
  )
}