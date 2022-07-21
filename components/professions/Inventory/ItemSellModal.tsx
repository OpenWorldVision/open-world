import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import styles from '@components/workshop/BuyerBoard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMemo, useCallback, useRef, useState } from 'react'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { getApprovalAll, setApprovedAll } from 'utils/itemContract'
import { listMultiItems } from 'utils/NFTMarket'
import { listingHero } from 'utils/HeroMarketUtils'
import MobileNotification from '@components/MobileNotification'

type Item = {
  type:
    | 'sushi'
    | 'ore'
    | 'hammer'
    | 'fish'
    | 'openianCard'
    | 'blacksmithCard'
    | 'supplierCard'
  ids: number[]
}
import LoadingModal from '@components/LoadingModal'

type Props = {
  isOpen: boolean
  selectedItem: Item
  toggleItemSell: () => void
  toggleItemNotify: () => void
}

function ItemSellModal({
  isOpen,
  selectedItem,
  toggleItemSell,
  toggleItemNotify,
}: Props) {
  const priceRef = useRef<HTMLInputElement>()
  const [price, setPrice] = useState(0)
  const [sellingAmount, setSellingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [listingResult, setListingResult] = useState(undefined)
  const handleTxStateChange = useTransactionState()

  const renderItemImg = useMemo(() => {
    if (selectedItem.type.includes('Card')) {
      return (
        <img
          src={`/images/inventory/items/${selectedItem.type}AmountMobile.png`}
          alt=""
        />
      )
    }
    return (
      <img src={`/images/workshop/mobile/${selectedItem.type}.webp`} alt="" />
    )
  }, [selectedItem])

  const renderItemName = useMemo(() => {
    if (selectedItem.type.includes('Card')) {
      return selectedItem.type.replace('Card', ' NFT Card')
    }

    return selectedItem.type
  }, [selectedItem])

  const calcTotalAmount = (_price = 1, _setTotalAmount = 1) => {
    if (selectedItem.type.includes("Card")) {
      setTotalAmount(_price)
    } else {
      setTotalAmount(_price * _setTotalAmount)
    }
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

  const handleIncreaseSellingItemAmount = () => {
    if (sellingAmount < selectedItem.ids.length) {
      setSellingAmount(sellingAmount + 1)
      calcTotalAmount(price, sellingAmount + 1)
    }
  }

  const handleDecreaseSellingItemAmount = () => {
    if (sellingAmount > 0) {
      setSellingAmount(sellingAmount - 1)
      calcTotalAmount(price, sellingAmount - 1)
    }
  }

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

  const handleConfirmSell = useCallback(async () => {
    toggleItemNotify()
    toggleItemSell()
    const title = 'Sell item(s)'
    if (totalAmount > 0) {
      setIsLoading(true)
      getApprovedStatus()
      let result = null;
      if (selectedItem.type.includes("Card")) {
        result = await listingHero(selectedItem.ids[0], price,  (txHash) => {
          handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
        })
      } else {
        const itemSellIds = selectedItem.ids.slice(0, sellingAmount)
        result = await listMultiItems(itemSellIds, price, (txHash) => {
          handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
        })
      }
      if (result !== null) {
        setListingResult(true)
        handleTxStateChange(title, result.transactionHash, result.status)
      } else {
        setListingResult(false)
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
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
    selectedItem,
  ])

  const onToggleNotification = () => {
    setListingResult(undefined)
  }

  return (
    <>
      {isLoading && <LoadingModal />}
      <Modal
        isOpen={isOpen}
        onClose={toggleItemSell}
        closeOnOverlayClick
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody padding={0}>
            <div className={styles.modalMobile}>
              <div className={styles.buyBoardMobile}>Sell Items</div>

              <div className={styles.closeBtnMobile} onClick={toggleItemSell}>
                <FontAwesomeIcon icon={faXmark} />
              </div>

              <div className={styles.itemBackground}>
                <div
                  className={styles.imgContainer}
                  style={
                    selectedItem.type.includes('Card')
                      ? {
                          padding: 0,
                        }
                      : { padding: '10px' }
                  }
                >
                  {renderItemImg}
                </div>
              </div>

              <div className={styles.itemNameMobile}>{renderItemName}</div>

              <div className={styles.itemSellerPrice}>
                <div className={styles.itemPrice}>
                  <span>Price</span>
                  <div className={styles.price}>
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
                    <img src="/images/workshop/mobile/coin.webp" alt="coin" />
                  </div>
                </div>
              </div>
              { !selectedItem.type.includes("Card") &&
                <>
                  <div className={styles.itemChoiseQuantity}>
                    <Button onClick={handleDecreaseSellingItemAmount}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <div>{sellingAmount}</div>
                    <Button onClick={handleIncreaseSellingItemAmount}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                  <div className={styles.itemTotalPrice}>
                    <span>Total</span>
                    <div className={styles.price}>
                      <span>{totalAmount}</span>
                      <img src="/images/workshop/mobile/coin.webp" alt="coin" />
                    </div>
                  </div>
                </>
              }
              <Button
                onClick={handleConfirmSell}
                disabled={totalAmount === 0}
                className={styles.itemBtnConfirm}
              >
                Confirm
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <MobileNotification
        isOpen={listingResult !== undefined}
        toggleNotification={onToggleNotification}
      >
        <Text
          color="#472805"
          fontSize="xl"
          fontWeight="700"
          textAlign="center"
        >
          Listing items to Market
          {listingResult ? ' successfully!' : ' failed!'}
        </Text>
      </MobileNotification>
    </>
  )
}

export default ItemSellModal
