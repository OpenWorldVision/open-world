import { useCallback, useEffect, useState } from 'react'
import style from './Mining.module.css'
import { Button } from '@chakra-ui/react'

import ResultMining from './ResultMining'
import MiningWait from './MiningWait'
import MiningQuest from './MiningQuest'

import {
  checkIfMiningFinish,
  startMining,
  fetchMiningQuestData,
  finishMining,
} from 'utils/professionContract'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  toggleLoadingModal: (boolean) => void
}

export default function MiningModal(props: Props) {
  const { isOpen, toggleModal, toggleLoadingModal } = props

  const [isStartQuest, setIsStartQuest] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [canFinish, setCanFinish] = useState(false)
  const [duration, setDuration] = useState(0)
  const [miningInterval, setMiningInterval] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)

  const startQuest = useCallback(async () => {
    toggleLoadingModal(true)
    const mining = await startMining()
    setTimeout(() => {
      toggleLoadingModal(false)
    }, 1000)
    if (mining !== null) {
      const data = await checkIfMiningFinish()
      setIsFinished(data.finish)
      setIsStartQuest(true)
      setCanFinish(false)

      setMiningInterval(
        setInterval(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1)
          }
        }, 1000)
      )

      setTimeout(() => {
        clearInterval(miningInterval)
        setCanFinish(true)
      }, duration)
    } else {
      toggleLoadingModal(false)
    }
  }, [])

  const checkFinishFishingQuest = useCallback(async () => {
    const data = await checkIfMiningFinish()
    const NOW = new Date().getTime()
    const endTime = parseInt(data?.startTime) + duration * 1000

    if (endTime <= NOW && !data.finish) {
      setTimeLeft(0)
      setCanFinish(true)
    } else {
      setTimeLeft(endTime - NOW)
      setCanFinish(false)

      setTimeout(() => {
        clearInterval(miningInterval)
        setCanFinish(true)
      }, timeLeft)

      setMiningInterval(
        setInterval(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1)
          }
        }, 1000)
      )
    }
  }, [])

  const handleFinish = useCallback(async () => {
    toggleLoadingModal(true)
    const finish = await finishMining()
    if (finish) {
      setIsStartQuest(false)
      setIsFinished(true)
    }
    toggleLoadingModal(false)
  }, [])

  const confirmResult = useCallback(() => {
    setIsStartQuest(false)
    setIsFinished(false)
    toggleModal()
  }, [])

  const initialize = async () => {
    toggleLoadingModal(true)
    const checkIfFinish = await checkIfMiningFinish()
    const data = await fetchMiningQuestData()
    const duration = await data.duration
    setDuration(duration)
    setTimeLeft(duration)

    checkFinishFishingQuest()

    if (checkIfFinish.startTime === '0') {
      setIsFinished(false)
      setIsStartQuest(false)
    } else {
      setIsFinished(checkIfFinish.finish)
      setIsStartQuest(true)
    }
    toggleLoadingModal(false)
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div
      className={`${style.miningOverlay} ${isOpen && style.active} overlay`}
    >
      {!isFinished ? (
        <div className={style.frameMining}>
          <div className={style.frameHead}>
            <Button className={style.infoBtn}></Button>
            <Button
              className={style.exitBtn}
              onClick={toggleModal}
            ></Button>
          </div>
          <div className={style.miningBody}>
            <div className={style.artItem}></div>
          </div>
          <div className={style.miningFooter}>
            {!isStartQuest ? (
              <MiningQuest startQuest={startQuest} />
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
    </div>
  )
}
