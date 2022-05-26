import { Button, Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { finishFishing, startFishing } from '../../../utils/professionContract'
import styles from './sellSushi.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  listSushi: any
  onSellSushi: (price: number, quantity: number) => void
  typeModal: string
}

const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function SellSushiModal(props: Props) {
  const { isOpen, toggleModal, listSushi, onSellSushi, typeModal } = props
  const [isLoading, setIsLoading] = useState(false)

  const [valueSushi, setValueSushi] = useState(1)
  const [quantitySushi, setQuantitySushi] = useState(1)

  useEffect(() => {
    //
  }, [listSushi])

  const startCook = useCallback(async () => {
    //
    setIsLoading(true)
    onSellSushi(valueSushi, quantitySushi)
    setIsLoading(false)

    // set
  }, [onSellSushi, valueSushi, quantitySushi])

  const _finishFishing = async () => {
    //
  }

  const onChangeValue = useCallback((event) => {
    console.log('21123', event)
    const valueSushi = parseInt(event?.target?.value)
    setValueSushi(valueSushi)
  }, [])

  const onChangeQuantity = useCallback(
    (event) => {
      const quantitySushi = parseInt(event?.target?.value)
      setQuantitySushi(quantitySushi)
    },
    [quantitySushi]
  )

  const renderText = useCallback(() => {
    console.log('212', typeModal)
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
              <div className={styles.titleText}>Selected Item:</div>
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
                    <div className={styles.titleText}>Price</div>
                  </div>

                  <div className={styles.flex1WithFlexEnd}>
                    <Input
                      color={'#fff'}
                      width={150}
                      height={50}
                      backgroundColor={'#3d2316'}
                      onChange={onChangeValue}
                    />

                    <div>OPEN</div>
                  </div>
                </div>
                <div className={styles.rowView2}>
                  <div className={styles.flex1}>
                    <div className={styles.titleText}>Selling Amount</div>
                  </div>
                  <div className={styles.flex1WithFlexEnd}>
                    <Input
                      color={'#fff'}
                      width={150}
                      height={50}
                      onChange={onChangeQuantity}
                      defaultValue={valueSushi}
                      backgroundColor={'#3d2316'}
                    />
                  </div>
                </div>
              </div>
            </div>
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
    toggleModal,
    onChangeValue,
    onChangeQuantity,
    valueSushi,
    startCook,
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

        <div className={styles.boardContent}>{renderText()}</div>
      </div>

      <div className="overlay" onClick={toggleModal}></div>
    </div>
  )
}

export default SellSushiModal
