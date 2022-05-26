import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { finishFishing, startFishing } from 'utils/professionContract'
import styles from './fishingModal.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  haveQuestUnfinish: boolean
}

export const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function FishingModal(props: Props) {
  const { isOpen, toggleModal, haveQuestUnfinish } = props
  const [typeofModal, setTypeOfModal] = useState(TYPE_OF_MODAL.START)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (haveQuestUnfinish) {
      setTypeOfModal(TYPE_OF_MODAL.WAITING)
    } else {
      setTypeOfModal(TYPE_OF_MODAL.START)
    }
  }, [haveQuestUnfinish])

  const _startFishing = async () => {
    //
    setIsLoading(true)
    const dataFishing = await startFishing()
    setIsLoading(false)
    if (dataFishing) {
      setTypeOfModal(TYPE_OF_MODAL.WAITING)
    }
    // set
  }

  const _finishFishing = async () => {
    //
    setIsLoading(true)
    const dataFinish = await finishFishing()
    setIsLoading(false)
    if (dataFinish) {
      setTypeOfModal(TYPE_OF_MODAL.FINISH)
    }
  }

  const renderText = useCallback(() => {
    switch (typeofModal) {
      case TYPE_OF_MODAL.FINISH: {
        return (
          <div className={styles.descriptionFinish}>
            <div className={styles.titleTextFinish}>You Caught</div>
            <div className={styles.rowView}>
              <div className={styles.valueTextFinish}>x2</div>
              <img
                src={`/images/professions/openian/fishNFT.png`}
                alt="Confirm"
                className={styles.fishNFT}
              />
            </div>
            <div className={styles.noteText}>
              All the Fish you catch will be stored in your inventory.
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={() => {
                toggleModal()
                setTypeOfModal(TYPE_OF_MODAL.START)
              }}
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
                Fish is the main ingredient for making Sushi and Suppliers are
                paying good money for them. Let’s go catch some !!!
              </div>
              <div className={styles.titleText}>Base Duration</div>
              <div className={styles.valueText}>20 second</div>
              <div className={styles.titleText}>Stamina Per Attemp</div>
              <div className={styles.valueText}>7 Stamina</div>
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={_startFishing}
            >
              <img
                src={`/images/professions/openian/startFishing.png`}
                alt="Confirm"
              />
            </Button>
          </div>
        )
      }
    }
  }, [typeofModal, haveQuestUnfinish])

  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <div
        className={
          typeofModal !== TYPE_OF_MODAL.FINISH
            ? styles.modal
            : styles.modalFinish
        }
      >
        {typeofModal !== TYPE_OF_MODAL.FINISH && (
          <h3 className={styles.sellBoard}>
            <img
              src={`/images/professions/openian/${
                typeofModal === TYPE_OF_MODAL.START
                  ? `fishBoard`
                  : `questFinish`
              }.png`}
              alt="Fish board"
            />
          </h3>
        )}

        <Button
          className={`${styles.closeBtn} click-cursor`}
          onClick={() => toggleModal()}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>

        <div
          className={
            typeofModal !== TYPE_OF_MODAL.FINISH
              ? styles.boardContent
              : styles.boardContentFinish
          }
        >
          {typeofModal !== TYPE_OF_MODAL.FINISH && (
            <img
              src="/images/professions/openian/fishBoardTemplate.png"
              alt="Fish board"
            />
          )}

          {renderText()}
        </div>
      </div>

      <div className="overlay" onClick={() => toggleModal()}></div>
    </div>
  )
}

export default FishingModal
