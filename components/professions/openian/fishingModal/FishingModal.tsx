import { Button, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  checkIfFishingFinish,
  fetchFishingQuestData,
  finishFishing,
  startFishing,
} from 'utils/professionContract'
import styles from './fishingModal.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { fetchAmountItemByTrait } from 'utils/blackSmithContract'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  toggleLoadingModal: (boolean) => void
  updateInventory: () => void
}

export const TYPE_OF_MODAL = {
  START: 'START',
  WAITING: 'WAITING',
  FINISH: 'FINISH',
}

function FishingModal(props: Props) {
  const { isOpen, toggleLoadingModal, toggleModal, updateInventory } = props
  const [typeofModal, setTypeOfModal] = useState(TYPE_OF_MODAL.START)
  const [requireStamina, setRequireStamina] = useState(0)
  const [duration, setDuration] = useState(10)

  const [canFinish, setCanFinish] = useState(false)
  const [countDownStart, setCountDownStart] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  const miningInterval = useRef<ReturnType<typeof setInterval>>(null)

  const toast = useToast()

  const checkRequirementBeforeStartQuest = useCallback(async () => {
    const sushiList = await fetchAmountItemByTrait(4)
    if (sushiList?.length < 2) {
      toast({
        title: 'Fishing Quest',
        description: "You don't have enough sushi to start fishing quest",
        status: 'error',
        duration: 15000,
        isClosable: true,
      })
    }

    return sushiList?.length > 2
  }, [toast])

  const startQuest = useCallback(async () => {
    if (!checkRequirementBeforeStartQuest()) {
      return
    }
    setTimeLeft(duration)
    toggleLoadingModal(true)
    const fishing = await startFishing()
    setTimeout(() => {
      toggleLoadingModal(false)
    }, 1000)
    if (fishing !== null) {
      setCountDownStart(true)
      setTypeOfModal(TYPE_OF_MODAL.WAITING)
      setCanFinish(false)
    } else {
      toggleLoadingModal(false)
    }
  }, [checkRequirementBeforeStartQuest, duration, toggleLoadingModal])

  const handleExitBtn = () => {
    toggleModal()
    setTypeOfModal(TYPE_OF_MODAL.START)
  }

  useEffect(() => {
    if (countDownStart) {
      miningInterval.current = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((timeLeft) => timeLeft - 1)
        }
      }, 1000)
    }
  }, [countDownStart])

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanFinish(true)
      clearInterval(miningInterval.current)
      setCountDownStart(false)
    }
  }, [timeLeft])

  const checkFinishFishingQuest = useCallback(async () => {
    const data = await checkIfFishingFinish()
    const NOW = new Date().getTime()
    const endTime = (parseInt(data?.startTime) + duration * 1000) * 1000

    if (endTime <= NOW && !data.finish) {
      setCanFinish(true)
    } else {
      setTimeLeft(Math.round((endTime - NOW) / 1000000))
      setCountDownStart(true)
      setCanFinish(false)
    }
  }, [])

  const handleFinish = useCallback(async () => {
    if (canFinish) {
      toggleLoadingModal(true)
      const finish = await finishFishing()
      if (finish) {
        updateInventory()
        setTypeOfModal(TYPE_OF_MODAL.FINISH)
        setTimeLeft(duration)
      }
      toggleLoadingModal(false)
    }
  }, [])

  const confirmResult = useCallback(() => {
    setTypeOfModal(TYPE_OF_MODAL.START)
    toggleModal()
  }, [])

  const initialize = async () => {
    toggleLoadingModal(true)
    const checkIfFinish = await checkIfFishingFinish()
    const data = await fetchFishingQuestData()
    setRequireStamina(data.requireStamina)
    setDuration(data.duration)

    checkFinishFishingQuest()

    if (checkIfFinish.startTime === '0') {
      setTypeOfModal(TYPE_OF_MODAL.START)
    } else {
      setTypeOfModal(TYPE_OF_MODAL.WAITING)
    }
    toggleLoadingModal(false)
  }

  useEffect(() => {
    initialize()
  }, [])

  const renderText = useCallback(() => {
    switch (typeofModal) {
      case TYPE_OF_MODAL.FINISH: {
        return (
          <div className={styles.descriptionFinish}>
            <h3 className={styles.sellBoard}>
              {typeofModal === TYPE_OF_MODAL.FINISH && (
                <img
                  src="/images/professions/openian/questFinish.png"
                  alt="Fish board"
                />
              )}
            </h3>
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
              All the Fishes you catch will be stored in your inventory.
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} ${styles.confirmFinishBtn} click-cursor`}
              onClick={confirmResult}
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
              <div className={styles.content}>
                <div className={styles.titleText}>Active Quest</div>
                <div className={styles.valueText}>
                  Openian is on Fishing Quest. Be patient!
                </div>
                <div className={styles.titleText}>Time Left</div>
                <div className={styles.valueText}>{timeLeft} seconds</div>
              </div>
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={handleFinish}
            >
              {canFinish ? (
                <img
                  src={`/images/professions/openian/finishFishing.png`}
                  alt="Fisnish"
                />
              ) : (
                <img
                  src={`/images/professions/openian/finish-disable-btn.png`}
                  alt="Fisnish"
                />
              )}
            </Button>
          </div>
        )
      }
      default: {
        return (
          <div className={styles.boardContent}>
            <div className={`${styles.description}`}>
              <div className={styles.content}>
                <div className={styles.titleText}>Description</div>
                <div className={styles.valueText}>
                  Fish is the main ingredient for making Sushi and Suppliers are
                  paying good money for them. Let&apos;s go catch some !!!
                </div>
                <div className={styles.titleText}>Base Duration</div>
                <div className={styles.valueText}>{duration} second</div>
                <div className={styles.titleText}>Stamina Per Attemp</div>
                <div className={styles.valueText}>
                  {requireStamina} Stamina{' '}
                  <div className={styles.iconStamina}></div>
                </div>
              </div>
            </div>
            <Button
              className={`btn-chaka ${styles.confirmBtn} click-cursor`}
              onClick={startQuest}
            >
              <img
                src={`/images/professions/openian/startFishing.png`}
                alt="Start Quest"
              />
            </Button>
          </div>
        )
      }
    }
  }, [typeofModal, timeLeft, duration, requireStamina, canFinish])

  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <div className={styles.fishingBg}>
        <div
          className={
            typeofModal !== TYPE_OF_MODAL.FINISH
              ? styles.modal
              : styles.modalFinish
          }
        >
          <Button
            className={`${styles.closeBtn} click-cursor ${
              typeofModal !== TYPE_OF_MODAL.FINISH && styles.btnFishing
            }`}
            onClick={handleExitBtn}
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
                className={styles.imgFishing}
                src="/images/professions/openian/fishBoardTemplate.png"
                alt="Fish board"
              />
            )}

            {renderText()}
          </div>
        </div>

        <div className="overlay" onClick={toggleModal}></div>
      </div>
    </div>
  )
}

export default FishingModal
