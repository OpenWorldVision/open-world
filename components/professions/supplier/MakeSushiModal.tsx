/* eslint-disable @next/next/no-img-element */
import { Button, Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useState } from 'react'
import styles from './makeSushi.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  listFishArray: any
  onStartCook: (sushi: number, idNumber1: number, idNumber2: number) => void
  typeModal: string
}

const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function MakeSushiModal(props: Props) {
  const { isOpen, toggleModal, listFishArray, onStartCook, typeModal } = props

  const [valueFish, setValueFish] = useState(1)
  const [errorText, setErrorText] = useState('')

  const startCook = useCallback(async () => {
    //
    onStartCook(valueFish, listFishArray[0], listFishArray[1])

    // set
  }, [listFishArray, onStartCook, valueFish])

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

  const renderText = useCallback(() => {
    switch (typeModal) {
      case TYPE_OF_MODAL.FINISH: {
        return (
          <div className={styles.descriptionFinish}>
            <div className={styles.titleTextFinish}>You got</div>
            <div className={styles.rowView}>
              <div className={styles.valueTextFinish}>x2</div>
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
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={_finishFishing}
            >
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
                {errorText?.length > 0 ? (
                  <div className={styles.errorText}>{errorText}</div>
                ) : null}
                <div className={styles.titleText}>Note</div>
                <div className={styles.valueText}>1 Fish Makes 2 sushi</div>
              </div>
            </div>

            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={startCook}
              disabled={valueFish === 0 || errorText?.length > 0}
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
    toggleModal,
    valueFish,
    onPressUp,
    onPressDown,
    startCook,
    errorText,
  ])

  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <div
        className={
          typeModal !== TYPE_OF_MODAL.FINISH ? styles.modal : styles.modalFinish
        }
      >
        <Button className={styles.closeBtn} onClick={toggleModal}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>

        <div className={styles.boardContent}>
          {typeModal === TYPE_OF_MODAL?.START ? (
            <img
              src="/images/professions/suppliers/modalSupImg.png"
              alt="Fish board"
            />
          ) : null}

          {renderText()}
        </div>
      </div>

      <div className="overlay" onClick={toggleModal}></div>
    </div>
  )
}

export default MakeSushiModal
