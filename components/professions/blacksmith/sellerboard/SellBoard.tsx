import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './SellerBoard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import NotificationSell from './NotificationSell'
import { sellHammer, fetchAmountItemByTrait } from 'utils/blackSmithContract'
import React from 'react'

type Props = {
  toggleModal: (boolean) => void
  toggleLoadingModal: (boolean) => void
  isOpen: boolean
}

function SellModal(props: Props) {
  const { toggleModal, toggleLoadingModal, isOpen } = props
  const priceRef = useRef<HTMLInputElement>()
  const [price, setPrice] = useState(0)
  const [sellingAmount, setSellingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const [checkSellHammer, setCheckSellHammer] = useState(false)
  const [isClickConfirm, setIsClickConfirm] = useState(false)

  const [listHammer, setListHammer] = useState([])

  const getListYourHammer = async () => {
    const listYourHammer = await fetchAmountItemByTrait(3)
    setListHammer(listYourHammer)
  }

  useEffect(() => {
    getListYourHammer()
  }, [])

  const calcTotalAmount = (_price = 1, _setTotalAmount = 1) => {
    setTotalAmount(_price * _setTotalAmount)
  }

  const checkPriceInput = (e) => {
    const regex = new RegExp('^[0-9]+$')
    if (
      !regex.test(e.target.value) &&
      (e.keyCode === 69 || e.keyCode === 189)
    ) {
      // eslint-disable-next-line eqeqeq
      priceRef.current.value = priceRef.current.value
    } else {
      let _price = parseInt(priceRef.current.value, 10)

      if (priceRef.current.value === '') {
        _price = 0
      }

      setPrice(_price)
      calcTotalAmount(_price, sellingAmount)
    }
  }

  const checkIfEmpty = () => {
    if (priceRef.current.value === '') {
      priceRef.current.value = '0'
    }

    const _price = parseInt(priceRef.current.value, 10)
    setPrice(_price)
    calcTotalAmount(_price, sellingAmount)
  }

  const increaseSellingAmount = () => {
    if (sellingAmount < listHammer.length) {
      calcTotalAmount(price, sellingAmount + 1)
      setSellingAmount(sellingAmount + 1)
    }
  }

  const decreaseSellingAmount = () => {
    if (sellingAmount > 0) {
      calcTotalAmount(price, sellingAmount - 1)
      setSellingAmount(sellingAmount - 1)
    }
  }

  const hanleGetAllHammer = () => {
    calcTotalAmount(price, listHammer.length)
    setSellingAmount(listHammer.length)
  }

  const handleConfirmSeller = async () => {
    if (price && sellingAmount) {
      toggleLoadingModal(true)
      const listSellHammer = listHammer.slice(0, sellingAmount)
      const handleSellHammer = await sellHammer(listSellHammer, price)
      if (handleSellHammer) {
        toggleLoadingModal(false)
        setCheckSellHammer(true)
      }
      else {
        toggleLoadingModal(false)
        setCheckSellHammer(false)
      }
      setIsClickConfirm(true)
      setSellingAmount(0)
      setTotalAmount(0)
      setPrice(0)
    }
  }

  const hiddenNotification = useCallback(() => {
    setIsClickConfirm(false)
  }, [])

  return (
    <div className={`${styles.sellerBoardOverlay} ${isOpen && styles.active} overlay`}>
      {!isClickConfirm && (
        <div className={styles.modal}>
          <h3 className={styles.sellBoard}>
            <img
              src="/images/professions/openian/sellboard.png"
              alt="Sell board"
            />
          </h3>

          <Button
            className={styles.closeBtn}
            onClick={() => toggleModal(false)}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>

          {/* <Button className={styles.closeBtn}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button> */}

          <div className={styles.boardContent}>
            <h4>SELECTED ITEM:</h4>
            <div className={styles.selectItemImg}></div>
            {/* <Button
            className={`btn-chaka ${styles.selectedItemBtn} click-cursor`}
          >
            <img
              src="/images/professions/openian/select-item.png"
              alt="Select Item"
            />
          </Button> */}
            <div className={styles.setPrice}>
              <span>PRICE: </span>
              <input
                ref={priceRef}
                className={styles.sellInput}
                type="number"
                min="0"
                name="price"
                defaultValue="0"
                onKeyUp={(e) => checkPriceInput(e)}
                onBlur={() => checkIfEmpty()}
              />
              <span>OPEN</span>
            </div>
            <div className={styles.sellingAmount}>
              <div className={styles.sellingAmountInput}>
                <span>Amount: </span>
                <div className={styles.sellInput}>{sellingAmount}</div>
              </div>
              <div className={styles.amountBtnGroup}>
                <Button
                  className="btn-chaka click-cursor"
                  onClick={decreaseSellingAmount}
                >
                  -
                </Button>
                <Button
                  className="btn-chaka click-cursor"
                  onClick={increaseSellingAmount}
                >
                  +
                </Button>
                <Button onClick={hanleGetAllHammer} className="btn-chaka click-cursor">All</Button>
              </div>
            </div>
            <div className={styles.totalAmount}>
              <span>Total Amount: </span>
              <span>{totalAmount}</span>
              <span> OPEN</span>
            </div>

            <Button
              onClick={handleConfirmSeller}
              disabled={!price || !sellingAmount}
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
            >
              <img
                src="/images/professions/openian/confirm-btn.png"
                alt="Confirm"
              />
            </Button>
          </div>
        </div>
      )}
      {isClickConfirm && (
        <NotificationSell
          hiddenNotification={hiddenNotification}
          checkSellHammer={checkSellHammer}
        />
      )}
    </div>
  )
}

export default React.memo(SellModal)
