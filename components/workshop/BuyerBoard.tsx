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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

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
  const [amountItems, setAmountItems] = useState(0)

  const handleHiddenModal = useCallback(() => {
    toggleModalBuyModal()
  }, [toggleModalBuyModal])

  const handleConfirmBuy = useCallback(async () => {
    if (amountItems !== 0) {
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
        Number(e.target.value === '' ? '' : Math.min(Number(e.target.value), maxAmount))
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

  const renderItemImg = () => {
    if (buyDetail['trait'] === 1) {
      return <img src="/images/workshop/mobile/fish.webp" alt="" />
    }
    else if (buyDetail['trait'] === 2) {
      return <img src="/images/workshop/mobile/ore.webp" alt="" />
    }
    else if (buyDetail['trait'] === 3) {
      return <img src="/images/workshop/mobile/hammer.webp" alt="" />
    }
    else if (buyDetail['trait'] === 4) {
      return <img src="/images/workshop/mobile/sushi.webp" alt="" />
    }
  }

  const renderItemName = () => {

    if (buyDetail['trait'] === 1) {
      return 'Fish'
    }
    else if (buyDetail['trait'] === 2) {
      return 'Ore'
    }
    else if (buyDetail['trait'] === 3) {
      return 'Hammer'
    }
    else if (buyDetail['trait'] === 4) {
      return 'Sushi'
    }
  }

  const renderItemInfo = () => {
    if (buyDetail['trait'] === 1) {
      return "Fish is the main ingredient for making Sushi and Suppliers are paying good money for them. Let's go catch some!!!"
    }
    else if (buyDetail['trait'] === 2) {
      return "Ore is the main material to make Hammers and BlackSmiths are paying good money for them. Let's go mine some !!!"
    }
    else if (buyDetail['trait'] === 3) {
      return 'Hammer is item that help Openians doing their Mining quest'
    }
    else if (buyDetail['trait'] === 4) {
      return 'Sushi is only item that help increase Stamina Point.'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModalBuyModal}
      closeOnOverlayClick
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody padding={0}>
          {!isShowNoti && (
            <>
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
              {/* Mobile */}
              <div className={styles.modalMobile}>
                <div className={styles.buyBoardMobile}>Buy Items</div>

                <div
                  className={styles.closeBtnMobile}
                  onClick={handleHiddenModal}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={styles.itemBackground}>
                  <div className={styles.imgContainer}>
                    {renderItemImg()}
                  </div>
                </div>
                <div className={styles.itemNameMobile}>{renderItemName()}</div>
                <div className={styles.itemInfoMobile}>{renderItemInfo()}</div>
                <div className={styles.itemSellerPrice}>
                  <div className={styles.itemSeller}>
                    <div className={styles.itemSellerTitle}>Seller</div>
                    <div className={styles.itemSellerAddress}>{`${buyDetail['seller'].slice(0, 5)}...${buyDetail['seller'].slice(buyDetail['seller'].length - 4, buyDetail['seller'].length)}`}</div>
                  </div>
                  <div className={styles.itemPrice}>
                    <span>Price</span>
                    <div className={styles.price}><span>{buyDetail['price']}</span><img src="/images/workshop/mobile/coin.webp" alt="coin" /></div>
                  </div>
                </div>
                <div className={styles.itemChoiseQuantity}>
                  <Button onClick={handleDecreaseSellingItemAmount}><FontAwesomeIcon icon={faMinus} /></Button>
                  <div>{amountItems}</div>
                  <Button onClick={handleIncreaseSellingItemAmount}><FontAwesomeIcon icon={faPlus} /></Button>
                </div>
                <div className={styles.itemTotalPrice}>
                  <span>Total</span>
                  <div className={styles.price}><span>{buyDetail?.price * Number(amountItems) + ' '}</span><img src="/images/workshop/mobile/coin.webp" alt="coin" /></div>
                </div>
                <Button onClick={handleConfirmBuy} className={styles.itemBtnConfirm}>Confirm</Button>
              </div>
            </>
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
