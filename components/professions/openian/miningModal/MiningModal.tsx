import { useCallback, useEffect, useState } from 'react'
import style from './Mining.module.css'
import { Button } from '@chakra-ui/react'

import ResultMining from './ResultMining'
import MiningWait from './MiningWait'
import MiningQuest from './MiningQuest'

import {
  getMiningQuest,
  startMining,
  getMiningQuestInfo,
  finishMining,
} from 'utils/professionContract'
import { fetchAmountItemByTrait } from 'utils/blackSmithContract'
import { fromUnixTime, intervalToDuration, isBefore } from 'date-fns'
import { getStamina } from 'utils/profileContract'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { useRouter } from 'next/router'
import Popup from '@components/Popup'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  toggleLoadingModal: (boolean) => void
  updateInventory: () => void
}

export default function MiningModal(props: Props) {
  const { isOpen, toggleModal, toggleLoadingModal, updateInventory } = props

  const [isStartQuest, setIsStartQuest] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [canFinish, setCanFinish] = useState(false)
  const [duration, setDuration] = useState(10)
  const [requireStamina, setRequireStamina] = useState(0)
  const [timeLeft, setTimeLeft] = useState<Duration>(() =>
    intervalToDuration({ start: 0, end: 0 })
  )
  const handleTxStateChange = useTransactionState()
  const [popup, setPopup] = useState(null)
  const router = useRouter()

  const initialize = useCallback(async () => {
    toggleLoadingModal(true)
    const miningQuest = await getMiningQuest()
    const data = await getMiningQuestInfo()
    const endTime = fromUnixTime(
      miningQuest?.startTime.toNumber() + data.duration
    )

    setDuration(data.duration)
    setRequireStamina(data.requireStamina)

    const isFinished = isBefore(endTime, new Date()) && !miningQuest.finish
    setCanFinish(isFinished)
    setTimeLeft(
      !isFinished
        ? intervalToDuration({
            start: new Date(),
            end: endTime,
          })
        : intervalToDuration({ start: 0, end: 0 })
    )

    setIsStartQuest(miningQuest.startTime.toNumber() === 0)

    toggleLoadingModal(false)
  }, [toggleLoadingModal])

  useEffect(() => {
    initialize()
  }, [])

  const checkRequirementBeforeStartQuest = useCallback(async () => {
    const data = await getMiningQuestInfo()

    const stamina = await getStamina()

    if (Number(stamina) < data.requireStamina) {
      setPopup(<Popup 
        type='stamina'
        content="Mining Quest"
        subcontent={`Mining quest requires at least ${data.requireStamina} stamina to start. You don't have enough stamina to start mining quest.`}
        actionContent="Bye sushi"
        setIsOpen={setPopup}
        action={() => { router.push('professions') }}
      />)
      return false
    }

    const hammerList = await fetchAmountItemByTrait(3)
    if (hammerList?.length < 1) {
      setPopup(<Popup 
        type='stamina'
        content="Mining Quest"
        subcontent="You don't have enough hammer to start mining quest"
        actionContent="Bye hammer"
        setIsOpen={setPopup}
        action={() => { router.push('professions') }}
      />)
      return false
    }
    return true
  }, [popup])

  const startQuest = useCallback(async () => {
    try {
      const title = 'Start mining quest'
      const isOk = await checkRequirementBeforeStartQuest()
      if (!isOk) {
        return
      }
      setTimeLeft(intervalToDuration({ start: 0, end: 0 }))
      toggleLoadingModal(true)

      const mining = await startMining((txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, setPopup)
      })

      if (mining) {
        handleTxStateChange(title, mining.transactionHash, mining.status, setPopup)
        const data = await getMiningQuest()
        setIsFinished(data.finish)
        setIsStartQuest(false)
        setCanFinish(false)
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, setPopup)
      }
    } catch (e) {
    } finally {
      toggleLoadingModal(false)
    }
  }, [
    checkRequirementBeforeStartQuest,
    handleTxStateChange,
    toggleLoadingModal,
  ])

  const handleFinish = useCallback(async () => {
    const title = 'Finish mining quest'
    toggleLoadingModal(true)
    const finish = await finishMining((txHash) => {
      handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, setPopup)
    })
    if (finish) {
      handleTxStateChange(title, finish.transactionHash, finish.status, setPopup)

      updateInventory()
      setIsStartQuest(false)
      setIsFinished(true)
      // setTimeLeft(duration)
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, setPopup)
    }
    toggleLoadingModal(false)
  }, [])

  const confirmResult = useCallback(() => {
    setIsStartQuest(false)
    setIsFinished(false)
    toggleModal()
  }, [toggleModal])

  return (
    <div className={`${style.miningOverlay} ${isOpen && style.active} overlay`}>
      {!isFinished ? (
        <div className={style.frameMining}>
          <div className={style.frameHead}>
            <Button className={style.infoBtn} />
            <Button className={style.exitBtn} onClick={toggleModal} />
          </div>
          <div className={style.miningBody}>
            <div className={style.artItem} />
          </div>
          <div className={style.miningFooter}>
            {isStartQuest ? (
              <MiningQuest
                duration={duration}
                requireStamina={requireStamina}
                startQuest={startQuest}
              />
            ) : (
              <MiningWait
                isStartQuest={isStartQuest}
                timeLeft={timeLeft}
                handleFinish={handleFinish}
                checkCanFinish={canFinish}
              />
            )}
          </div>
        </div>
      ) : (
        <ResultMining toggleModal={confirmResult} />
      )}
      {popup}
    </div>
  )
}
