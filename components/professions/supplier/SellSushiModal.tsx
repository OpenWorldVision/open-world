/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import styles from './sellSushi.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  listSushi: any
  onSellSushi: (price: number, quantity: number) => void
  typeModal: string
  onClose: () => void
}

const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function SellSushiModal(props: Props) {
  const { isOpen, toggleModal, listSushi, onSellSushi, typeModal, onClose } =
    props

  const [valueSushi, setValueSushi] = useState(1)
  const [quantitySushi, setQuantitySushi] = useState(1)
  const [errorText, setErrorText] = useState('')

  const startCook = useCallback(async () => {
    if (listSushi?.length === 0) {
      setErrorText(`You don't have any Sushi!`)
      return
    }
    //
    onSellSushi(valueSushi, quantitySushi)
    // set
  }, [onSellSushi, valueSushi, quantitySushi, listSushi])

  const onChangeValue = useCallback((event) => {
    const valueSushi = parseInt(event?.target?.value)
    setValueSushi(valueSushi)
  }, [])

  const onChangeQuantity = useCallback((event) => {
    const quantitySushi = parseInt(event?.target?.value)
    setQuantitySushi(quantitySushi)
  }, [])

  const renderText = useCallback(() => {
    switch (typeModal) {
      case TYPE_OF_MODAL.FINISH: {
        return (
          <div className={styles.descriptionFinish}>
            <div className={styles.titleTextFinish}>SUCCESS</div>
            <div className={styles.rowView}>
              <div className={styles.noteTextFinish}>
                {`You sold ${quantitySushi}`}
              </div>

              <img
                src={`/images/professions/openian/sushiNFT.png`}
                alt="Confirm"
                className={styles.fishNFT}
              />
            </div>

            <Button
              className={`btn-chaka ${styles.confirmBtnFinish} click-cursor`}
              onClick={toggleModal}
            >
              <img
                src={`/images/professions/openian/confirm-btn.png`}
                alt="Confirm"
              />
            </Button>
          </div>
        )
      }
      default: {
        return (
          <div className={styles.boardContent}>
            <div className={styles.description}>
              <div className={styles.columnView}>
                <div className={styles.titleText}>Selected Item:</div>
                <div className={styles.containerSushiNFTs}>
                  <img
                    src={`/images/professions/openian/sushiNFT.png`}
                    style={{ maxWidth: '80%' }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                }}
              >
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Price</div>
                  </div>

                  <div className={styles.flex1WithFlexEnd}>
                    <Input
                      color={'#fff'}
                      width={150}
                      height={50}
                      backgroundColor={'#3d2316'}
                      onChange={onChangeValue}
                      defaultValue={valueSushi}
                    />
                    <Text color="#fff">OPEN</Text>
                  </div>
                </div>
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Selling Amount</div>
                  </div>
                  <div className={styles.flex1WithFlexEnd}>
                    <NumberInput
                      min={0}
                      max={listSushi?.length}
                      width={150}
                      height={50}
                      defaultValue={1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </div>
                </div>
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Your Sushi Amount</div>
                  </div>
                  <Text className={styles.flex1WithFlexEnd} color="#fff">
                    {listSushi?.length}
                  </Text>
                </div>
              </div>
            </div>
            {errorText?.length > 0 ? (
              <div className={styles.errorText}>{errorText}</div>
            ) : null}

            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={startCook}
            >
              <img
                src={`/images/professions/openian/confirm-btn.png`}
                alt="Confirm"
              />
            </Button>
          </div>
        )
      }
    }
  }, [
    typeModal,
    quantitySushi,
    toggleModal,
    onChangeValue,
    valueSushi,
    listSushi?.length,
    errorText,
    startCook,
  ])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent
        bgImg={
          typeModal !== TYPE_OF_MODAL.FINISH
            ? `url('/images/professions/suppliers/sellSushiModal.png')`
            : `url('/images/professions/openian/claimFish.png')`
        }
        width="600px"
        bgPosition="100%, 100%"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        bgColor="transparent"
      >
        <Button
          className={
            typeModal !== TYPE_OF_MODAL.FINISH
              ? styles.closeBtn
              : styles.closeBtnFinish
          }
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>

        <ModalBody className={styles.boardContent}>{renderText()}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SellSushiModal
