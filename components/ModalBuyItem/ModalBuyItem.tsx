import React, { useCallback, useState } from 'react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './ModalBuyItem.module.css'

type NFTItems = {
  id: string
  name: string
  image: string
  price: number
  available: string
}

type Props = {
  isOpen: boolean
  nft: NFTItems
  fromCastle: boolean
  onClose: () => void
  title: string
  confirmBuy: () => void
}

const ModalBuyItem = ({
  isOpen,
  nft,
  fromCastle,
  onClose,
  title,
  confirmBuy,
}: Props) => {
  const [quantity, setQuantity] = useState(1)

  const increamentQuantity = useCallback(() => {
    if (fromCastle) {
      return
    }
    setQuantity(quantity + 1)
  }, [fromCastle, quantity])
  const decrementQuantity = useCallback(() => {
    if (fromCastle || quantity === 1) {
      return
    }
    setQuantity(quantity - 1)
  }, [fromCastle, quantity])
  return (
    <Modal isOpen={isOpen} isCentered={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'transparent'} maxWidth={260}>
        <div onClick={onClose} className={styles.closeButton}>
          <img src={'/images/castle/mobile/closeButton.webp'} alt={'close'} />
        </div>
        <div className={styles.containerLayout}>
          <div className={styles.header}>
            <p>{title}</p>
          </div>
          <img
            src={nft?.image}
            className={styles.classImage}
            alt={'classImage'}
          />
          <div className={styles.containerDesc}>
            <p>{nft?.name}</p>
            <span>Necessary NFT for active profession</span>
          </div>
          <div className={styles.containerPrice}>
            {!fromCastle ? (
              <div className={styles.rowPrice}>
                <span>Seller</span>
                <p>{nft?.price}</p>
              </div>
            ) : null}
            <div className={styles.rowPrice}>
              <span>Price</span>
              <div className={styles.rightField}>
                <p>{nft?.price}</p>
                <img src="images/castle/mobile/coin2.webp" alt={'coin'} />
              </div>
            </div>
          </div>
          <div
            className={
              !fromCastle
                ? styles.containerButtonQuantity
                : styles.containerButtonQuantityDisable
            }
          >
            <div onClick={decrementQuantity} className={styles.upDownButton}>
              -
            </div>
            <div className={styles.quantityBox}>
              <p>{quantity}</p>
            </div>
            <div onClick={increamentQuantity} className={styles.upDownButton}>
              +
            </div>
          </div>
          <div className={styles.totalField}>
            <span>Total</span>
            <div className={styles.totalPrice}>
              <p>{nft?.price}</p>
              <img src="images/castle/mobile/coin2.webp" alt={'coin'} />
            </div>
          </div>
          <div className={styles.confirmBtn} onClick={confirmBuy}>
            <p>Confirm</p>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalBuyItem
