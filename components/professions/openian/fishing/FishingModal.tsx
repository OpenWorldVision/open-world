import { Button } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import styles from './fishingModal.module.css'

type Props = {
  isOpen: boolean
  toggleModal: () => void
}

function FishingModal(props: Props) {
  const { isOpen, toggleModal } = props

  const [price, setPrice] = useState(0)
  const [sellingAmount, setSellingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const calcTotalAmount = (_price = 1, _setTotalAmount = 1) => {
    setTotalAmount(_price * _setTotalAmount)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    calcTotalAmount(e.target.value, sellingAmount)
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
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <div className={styles.modal}>
        {/* <h3 className={styles.sellBoard}>
          <img
            src="/images/professions/openian/fishBoard.png"
            alt="Fish board"
          />
        </h3> */}

        <div className={styles.boardContent}>
          <h4>SELECTED FISHING:</h4>
          <Button
            className={`btn-chaka ${styles.selectedItemBtn} click-cursor`}
          >
            <img
              src="/images/professions/openian/select-item.png"
              alt="Select Item"
            />
          </Button>
          <div className={styles.setPrice}>
            <span>PRICE: </span>
            <input
              className={styles.sellInput}
              type="text"
              name="price"
              defaultValue={price}
              onChange={(e) => handlePriceChange(e)}
            />
            <span>OPEN</span>
          </div>
          <div className={styles.sellingAmount}>
            <span>Selling Amount: </span>
            <Button
              className="btn-chaka click-cursor"
              onClick={decreaseSellingAmount}
            >
              -
            </Button>
            <div className={styles.sellInput}>{sellingAmount}</div>
            <Button
              className="btn-chaka click-cursor"
              onClick={increaseSellingAmount}
            >
              +
            </Button>
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

      <div className="overlay" onClick={() => toggleModal()}></div>
    </div>
  )
}

export default FishingModal
