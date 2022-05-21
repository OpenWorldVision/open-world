import { Button } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import styles from './sellBoard.module.css'
import modalStyle from './sellModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  toggleModal: () => void
}

function SellBoard(props: Props) {
  const { toggleModal } = props
  const priceRef = useRef<HTMLInputElement>()
  const [price, setPrice] = useState(0)
  const [sellingAmount, setSellingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

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
    setSellingAmount(sellingAmount + 1)
    calcTotalAmount(price, sellingAmount + 1)
  }

  const decreaseSellingAmount = () => {
    if (sellingAmount > 0) {
      setSellingAmount(sellingAmount - 1)
      calcTotalAmount(price, sellingAmount - 1)
    }
  }

  return (
    <div className={modalStyle.modal}>
      <h3 className={modalStyle.board}>
        <img src="/images/professions/openian/sellboard.png" alt="Sell board" />
      </h3>

      <Button className={styles.closeBtn} onClick={() => toggleModal()}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </Button>

      <div className={styles.boardContent}>
        <h4>SELECTED ITEM:</h4>
        <a href="#inventory" className={`btn-chaka ${styles.selectedItemBtn} click-cursor`}>
          <img
            src="/images/professions/openian/select-item.png"
            alt="Select Item"
          />
        </a>
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
          <span>Amount: </span>
          <div className={styles.sellInput}>{sellingAmount}</div>
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
            <Button className="btn-chaka click-cursor">All</Button>
          </div>
        </div>
        <div className={styles.totalAmount}>
          <span>Total Amount: </span>
          <span>{totalAmount}</span>
        </div>

        <Button className={`btn-chaka ${styles.confirmBtn} click-cursor`}>
          <img
            src="/images/professions/openian/confirm-btn.png"
            alt="Confirm"
          />
        </Button>
      </div>
    </div>
  )
}

export default SellBoard
