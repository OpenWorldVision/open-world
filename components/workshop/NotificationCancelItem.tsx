import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import styles from './NotificationCancelItem.module.css'

type Props = {
  item: object,
  handleCancelItem: (object) => () => void,
  handleToggleCancelBoard: () => void,
  isOpenCancelBoard: boolean
}

export default function NotificationCancelItem(props: Props) {
  const { item, handleCancelItem, handleToggleCancelBoard, isOpenCancelBoard } = props

  const renderItemImg = () => {
    if (item['trait'] === 1) {
      return <img src="/images/workshop/mobile/fish.webp" alt="" />
    }
    else if (item['trait'] === 2) {
      return <img src="/images/workshop/mobile/ore.webp" alt="" />
    }
    else if (item['trait'] === 3) {
      return <img src="/images/workshop/mobile/hammer.webp" alt="" />
    }
    else if (item['trait'] === 4) {
      return <img src="/images/workshop/mobile/sushi.webp" alt="" />
    }
  }

  const renderItemName = () => {

    if (item['trait'] === 1) {
      return 'Fish'
    }
    else if (item['trait'] === 2) {
      return 'Ore'
    }
    else if (item['trait'] === 3) {
      return 'Hammer'
    }
    else if (item['trait'] === 4) {
      return 'Sushi'
    }
  }

  const renderItemInfo = () => {
    if (item['trait'] === 1) {
      return "Fish is the main ingredient for making Sushi and Suppliers are paying good money for them. Let's go catch some!!!"
    }
    else if (item['trait'] === 2) {
      return "Ore is the main material to make Hammers and BlackSmiths are paying good money for them. Let's go mine some !!!"
    }
    else if (item['trait'] === 3) {
      return 'Hammer is item that help Openians doing their Mining quest'
    }
    else if (item['trait'] === 4) {
      return 'Sushi is only item that help increase Stamina Point.'
    }
  }

  return (
    <Modal
      isOpen={isOpenCancelBoard}
      onClose={handleToggleCancelBoard}
      closeOnOverlayClick
      isCentered
      size="xl"
    >
      {/* background: rgb(70 70 70 / 48%); */}
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody padding={0}>
          <div className={styles.modalMobile}>
            <div className={styles.buyBoardMobile}>Withdraw Items</div>

            <div
              className={styles.closeBtnMobile}
              onClick={handleToggleCancelBoard}
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
            <Box onClick={handleToggleCancelBoard}><Button onClick={handleCancelItem(item)} className={styles.itemBtnConfirm}>Confirm</Button></Box>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}