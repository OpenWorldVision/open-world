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

  const startFishing = useCallback(() => {
    console.log('1')
  }, [])

  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <div className={styles.modal}>
        <h3 className={styles.sellBoard}>
          <img
            src="/images/professions/openian/fishBoard.png"
            alt="Fish board"
          />
        </h3>

        <div className={styles.boardContent}>
          <img
            src="/images/professions/openian/fishBoardTemplate.png"
            alt="Fish board"
          />
          <div className={styles.description}>
            <div className={styles.titleText}>Description</div>
            <div className={styles.valueText}>
              Fish is main material to make Sushi and Suppliers are paying good
              money for them. Let’s go catch some !!!
            </div>
            <div className={styles.titleText}>Base Duration</div>
            <div className={styles.valueText}>20 second</div>
            <div className={styles.titleText}>Stamina Per Attemp</div>
            <div className={styles.valueText}>7 Stamina</div>
          </div>

          <Button
            className={`btn-chaka ${styles.confirmBtn} click-cursor`}
            onClick={startFishing}
          >
            <img
              src="/images/professions/openian/startFishing.png"
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
