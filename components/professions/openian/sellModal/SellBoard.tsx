import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './sellBoard.module.css'
import modalStyle from './sellModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { fetchUserInventoryItemAmount, fetchListItemIds } from 'utils/Item'
import { listMultiItems } from 'utils/Market'
import LoadingModal from '@components/LoadingModal'
import ListingResultModal from '../../ListingResultModal'
import { getApprovalAll, setApprovedAll } from 'utils/itemContract'

type Props = {
  selectedItem: number
  handleFinishListing: () => void
  toggleModal: () => void
}

function SellBoard(props: Props) {
  const { selectedItem, handleFinishListing, toggleModal } = props
  const priceRef = useRef<HTMLInputElement>()
  const [price, setPrice] = useState(0)
  const [sellingAmount, setSellingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [userItemAmount, setUserItemAmount] = useState([])
  const [selectedItemAmount, setSelectedItemAmount] = useState(0)
  const [selectedItemIds, setSelectedItemIds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listingResult, setListingResult] = useState(undefined)

  const fetchSelectedItemAmount = async () => {
    const itemAmount = await fetchUserInventoryItemAmount()
    setUserItemAmount(Object.values(itemAmount))
  }

  const fetchSelectedItemIdsList = async () => {
    if (selectedItem !== -1) {
      const ids = await fetchListItemIds(selectedItem + 1)
      setSelectedItemIds(ids)
    }
  }

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
    if (sellingAmount < selectedItemAmount) {
      setSellingAmount(sellingAmount + 1)
      calcTotalAmount(price, sellingAmount + 1)
    }
  }

  const decreaseSellingAmount = () => {
    if (sellingAmount > 0) {
      setSellingAmount(sellingAmount - 1)
      calcTotalAmount(price, sellingAmount - 1)
    }
  }

  const sellAll = () => {
    setSellingAmount(selectedItemAmount)
    calcTotalAmount(price, selectedItemAmount)
  }

  useEffect(() => {
    fetchSelectedItemAmount()
  }, [])

  useEffect(() => {
    priceRef.current.value = '0'
    setPrice(0)
    setSellingAmount(0)
    setTotalAmount(0)
    setSelectedItemAmount(userItemAmount[selectedItem])
    fetchSelectedItemIdsList()
  }, [selectedItem])

  const setApproved = async () => {
    await setApprovedAll()
  }
  const getApprovedStatus = useCallback(async () => {
    const isApproved = await getApprovalAll()
    if (!isApproved) {
      setApproved()
    }
    return isApproved
  }, [])

  const listToMarket = useCallback(async () => {
    if (price !== 0 && sellingAmount !== 0) {
      setIsLoading(true)
      getApprovedStatus()

      const itemSellIds = selectedItemIds.slice(0, sellingAmount)
      const result = await listMultiItems(itemSellIds, price)
      if (result !== null) {
        handleFinishListing()
        setListingResult(true)
      } else {
        setListingResult(false)
      }
      priceRef.current.value = '0'
      setPrice(0)
      setSellingAmount(0)
      setTotalAmount(0)
      setIsLoading(false)
      return result
    }
  }, [
    price,
    sellingAmount,
    getApprovedStatus,
    selectedItemIds,
    handleFinishListing,
  ])

  const toggleListingModal = useCallback(async (state) => {
    setListingResult(state)
  }, [])

  return (
    <>
      {isLoading && <LoadingModal />}
      {listingResult !== undefined && (
        <ListingResultModal
          isSuccess={listingResult}
          toggleModal={() => toggleListingModal(undefined)}
        />
      )}
      <div className={modalStyle.modal}>
        <h3 className={modalStyle.board}>
          <img
            src="/images/professions/openian/sellboard.png"
            alt="Sell board"
          />
        </h3>

        <Button className={styles.closeBtn} onClick={toggleModal}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>

        <div className={styles.boardContent}>
          <h4>SELECTED ITEM:</h4>
          <a
            href="#inventory"
            className={`btn-chaka ${styles.selectedItemBtn} click-cursor`}
          >
            {selectedItem === -1 && (
              <img
                src="/images/professions/openian/select-item.png"
                alt="Select Item"
              />
            )}
            {selectedItem === 0 && (
              <img
                src="/images/professions/openian/select-fish.png"
                alt="Select Item"
              />
            )}
            {selectedItem === 1 && (
              <img
                src="/images/professions/openian/select-ore.png"
                alt="Select Item"
              />
            )}
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
              onKeyUp={checkPriceInput}
              onBlur={checkIfEmpty}
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
              <Button className="btn-chaka click-cursor" onClick={sellAll}>
                All
              </Button>
            </div>
          </div>
          <div className={styles.totalAmount}>
            <span>Total Amount: </span>
            <span>{totalAmount} OPEN</span>
          </div>

          <Button
            className={`btn-chaka ${styles.confirmBtn} click-cursor`}
            onClick={listToMarket}
          >
            <img
              src="/images/professions/openian/confirm-btn.png"
              alt="Confirm"
            />
          </Button>
        </div>
      </div>
    </>
  )
}

export default SellBoard
