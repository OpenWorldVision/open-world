import { Button, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import {
  getFishingQuest,
  fetchFishingQuestData,
  finishFishing,
  startFishing,
} from 'utils/professionContract'
import styles from './fishingModal.module.css'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { getStamina } from 'utils/profileContract'
import WaitingModal from './WaitingModal'
import FinishModal from './FinishModal'
import DefaultModal from './DefaultModal'
import { addHours, fromUnixTime, intervalToDuration, isBefore } from 'date-fns'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

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
  const [timeLeft, setTimeLeft] = useState<Duration>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const handleTxStateChange = useTransactionState()

  const initialize = useCallback(async () => {
    const fishingQuest = await getFishingQuest()
    const data = await fetchFishingQuestData()

    const endTime = fromUnixTime(
      fishingQuest?.startTime.toNumber() + data.duration
    )

    setRequireStamina(data.requireStamina)
    setDuration(data.duration)
    const isFinished = isBefore(endTime, new Date()) && !fishingQuest.finish
    setCanFinish(isFinished)
    setTimeLeft(
      !isFinished
        ? intervalToDuration({
            start: new Date(),
            end: endTime,
          })
        : intervalToDuration({ start: 0, end: 0 })
    )
    setTypeOfModal(
      fishingQuest.startTime.toNumber() === 0
        ? TYPE_OF_MODAL.START
        : TYPE_OF_MODAL.WAITING
    )
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      initialize()
    }
  }, [initialize, isOpen])

  const checkRequirementBeforeStartQuest = useCallback(async () => {
    const stamina = await getStamina()
    const data = await fetchFishingQuestData()

    if (Number(stamina) < data.requireStamina) {
      toast({
        title: 'Fishing Quest',
        description: `Fishing quest requires at least ${data.requireStamina} stamina to start. You don't have enough stamina to start fishing quest.`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      })
    }

    return Number(stamina) >= data.requireStamina
  }, [toast])

  const handleStartQuest = useCallback(async () => {
    const title = 'Start fishing quest'
    const isOk = await checkRequirementBeforeStartQuest()
    if (!isOk) {
      return
    }
    setTimeLeft(
      intervalToDuration({
        start: new Date(),
        end: addHours(new Date(), 12),
      })
    )
    toggleLoadingModal(true)

    const fishing = await startFishing((txHash) => {
      handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
    })
    setTimeout(() => {
      toggleLoadingModal(false)
    }, 1000)
    if (fishing !== null) {
      setTypeOfModal(TYPE_OF_MODAL.WAITING)
      setCanFinish(false)
      handleTxStateChange(title, fishing.transactionHash, fishing.status)
    } else {
      toggleLoadingModal(false)
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
    }
  }, [checkRequirementBeforeStartQuest, toggleLoadingModal])

  const handleFinish = useCallback(async () => {
    const title = 'Finish fishing quest'
    if (canFinish) {
      toggleLoadingModal(true)
      const finish = await finishFishing((txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
      })
      if (finish) {
        handleTxStateChange(title, finish.transactionHash, finish.status)
        updateInventory()
        setTypeOfModal(TYPE_OF_MODAL.FINISH)
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
      toggleLoadingModal(false)
    }
  }, [canFinish, toggleLoadingModal, updateInventory])

  const confirmResult = useCallback(() => {
    setTypeOfModal(TYPE_OF_MODAL.START)
    toggleModal()
  }, [toggleModal])

  const renderText = useCallback(() => {
    if (loading) {
      return null
    }
    if (typeofModal === TYPE_OF_MODAL.FINISH) {
      return <FinishModal onConfirm={confirmResult} loading={loading} />
    }
    if (typeofModal === TYPE_OF_MODAL.WAITING) {
      return (
        <WaitingModal
          canFinish={canFinish}
          onFinish={handleFinish}
          timeLeft={timeLeft}
          loading={loading}
        />
      )
    }
    return (
      <DefaultModal
        duration={duration}
        onStartQuest={handleStartQuest}
        requireStamina={requireStamina}
        loading={loading}
      />
    )
  }, [
    typeofModal,
    duration,
    handleStartQuest,
    requireStamina,
    loading,
    confirmResult,
    canFinish,
    handleFinish,
    timeLeft,
  ])

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
            onClick={toggleModal}
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

        <div className="overlay" onClick={toggleModal} />
      </div>
    </div>
  )
}

export default FishingModal
