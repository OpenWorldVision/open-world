/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import styles from './makeSushi.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  listFishArray: any
  onStartCook: (sushi: number) => void
  typeModal: string
  onClose: () => void
}

const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function MakeSushiModal(props: Props) {
  const {
    isOpen,
    toggleModal,
    listFishArray,
    onStartCook,
    typeModal,
    onClose,
  } = props

  const [valueFish, setValueFish] = useState(1)
  const [errorText, setErrorText] = useState('')

  const startCook = useCallback(() => {
    onStartCook(valueFish)
  }, [onStartCook, valueFish])

  const onPressUp = useCallback(() => {
    setErrorText('')
    const newValue = valueFish + 1
    if (newValue > listFishArray?.length) {
      setErrorText(`You have only ${listFishArray?.length} Fishes`)
      // return
    }

    setValueFish(newValue)
  }, [valueFish, listFishArray])
  const onPressDown = useCallback(() => {
    if (valueFish === 0) {
      return
    }
    const newValue = valueFish - 1
    setValueFish(newValue)
    if (newValue <= listFishArray?.length) {
      setErrorText('')
    }
  }, [valueFish, listFishArray?.length])

  const closeModalFinish = useCallback(() => {
    setValueFish(1)
    toggleModal()
  }, [toggleModal])

  const renderText = useCallback(() => {
    switch (typeModal) {
      case TYPE_OF_MODAL.FINISH: {
        return (
          <div className={styles.descriptionFinish}>
            <div className={styles.titleTextFinish}>You got</div>
            <div className={styles.rowView}>
              <div className={styles.valueTextFinish}>{`x${
                valueFish * 2
              }`}</div>
              <img
                src={`/images/professions/openian/sushiNFT.png`}
                alt="Confirm"
                className={styles.fishNFT}
              />
            </div>
            <div className={styles.noteText}>
              All the Sushi you make will be stored at your Inventory
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={closeModalFinish}
            >
              <img
                src={`/images/professions/openian/confirm-btn.png`}
                alt="Confirm"
              />
            </Button>
          </div>
        )
      }
      case TYPE_OF_MODAL.WAITING: {
        return (
          <div className={styles.boardContent}>
            <div className={styles.description}>
              <div className={styles.titleText}>Active Quest</div>
              <div className={styles.valueText}>
                Openian is on Fishing Quest. Be patient!
              </div>
              <div className={styles.titleText}>Duration</div>
              <div className={styles.valueText}>20 second</div>
            </div>
            <Button className={`btn-chaka ${styles.confirmBtn} click-cursor`}>
              <img
                src={`/images/professions/openian/finishFishing.png`}
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
              <div className={styles.titleText}>Description</div>
              <div className={styles.valueText}>
                Sushi is only item that help increase Stamina Point.
              </div>
              <div
                style={{
                  marginTop: 14,
                }}
              >
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Amount of sushi</div>
                  </div>

                  <div className={styles.flex1WithFlexEnd}>
                    <Input
                      color={'#fff'}
                      width={100}
                      height={50}
                      value={valueFish * 2}
                      backgroundColor={'#3d2316'}
                      disabled={true}
                    />
                    <div className={styles.filterButtonContainer}>
                      <div
                        onClick={onPressUp}
                        className={styles.buttonQuantity}
                      >
                        <img
                          className={styles.quantityIcon}
                          src={'/images/professions/suppliers/icon_up.png'}
                          alt={'up'}
                        />
                      </div>
                      <div
                        className={styles.buttonQuantity}
                        onClick={onPressDown}
                      >
                        <img
                          className={styles.quantityIcon}
                          src={'/images/professions/suppliers/icon_down.png'}
                          alt={'down'}
                        />
                      </div>
                    </div>
                    <div>
                      <img
                        className={styles.iconNFTs}
                        src={'/images/professions/openian/sushiNFT.png'}
                        alt={'sushiNFTs'}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Fish you need</div>
                  </div>
                  <div className={styles.flex1WithFlexEnd}>
                    <Input
                      color={'#fff'}
                      width={100}
                      height={50}
                      defaultValue={valueFish}
                      backgroundColor={'#3d2316'}
                      disabled={true}
                      value={valueFish}
                    />
                    <div className={styles.filterButtonContainerNoOpacity}>
                      <div className={styles.buttonQuantity}>
                        <img
                          className={styles.quantityIcon}
                          src={'/images/professions/suppliers/icon_up.png'}
                          alt={'up'}
                        />
                      </div>
                      <div className={styles.buttonQuantity}>
                        <img
                          className={styles.quantityIcon}
                          src={'/images/professions/suppliers/icon_down.png'}
                          alt={'down'}
                        />
                      </div>
                    </div>

                    <div>
                      <img
                        className={styles.iconNFTs}
                        src={'/images/professions/openian/fishNFT.png'}
                        alt={'sushi'}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={styles.errorText}
                  style={{ height: 20, margin: '6px 0' }}
                >
                  {errorText}
                </div>

                <div className={styles.titleText}>Note</div>
                <div className={styles.valueText}>1 Fish Makes 2 sushi</div>
              </div>
            </div>

            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={startCook}
              disabled={valueFish === 0 || errorText?.length > 0}
              mt={70}
            >
              <img
                src={`/images/professions/suppliers/buttonCook.png`}
                alt="Confirm"
              />
            </Button>
          </div>
        )
      }
    }
  }, [
    typeModal,
    valueFish,
    closeModalFinish,
    onPressUp,
    onPressDown,
    errorText,
    startCook,
  ])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay blur="3xl" />
      <ModalContent
        bgImg={
          typeModal !== TYPE_OF_MODAL.FINISH
            ? `url('/images/professions/suppliers/supplierModalBackground.png')`
            : `url('/images/professions/openian/claimFish.png')`
        }
      
        backgroundPosition="center left, center right"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        bgColor="transparent"
        padding="80px 50px 70px"
        className={styles.modalContent}
      >
        <Button className={styles.closeBtn} onClick={toggleModal}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>

        <ModalBody className={styles.boardContent}>
          {typeModal === TYPE_OF_MODAL?.START ? (
            <img
            className={styles.imgMakeSushi}
              src="/images/professions/suppliers/modalSupImg.png"
              alt="Fish board"
            />
          ) : null}

          {renderText()}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MakeSushiModal
