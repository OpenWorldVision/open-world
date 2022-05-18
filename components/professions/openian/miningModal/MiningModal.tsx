import { useState } from 'react'
import style from './Mining.module.css'
import { Button } from '@chakra-ui/react'

import ResultMining from './ResultMining'
import MiningWait from './MiningWait'
import MiningQuest from './MiningQuest'

type Props = {
  isOpen: boolean
  toggleModal: () => void
}

export default function MiningModal(props: Props) {
  const { isOpen, toggleModal } = props

  const [isStartQuest, setIsStartQuest] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const startQuest = () => {
    setIsStartQuest(true)
  }

  const handleFinish = () => {
    setIsFinished(true)
  }

  return (
    <div className={`${style.miningOverlay} ${isOpen && style.active} overlay`}>
      {!isFinished ? (
        <div className={style.frameMining}>
          <div className={style.frameHead}>
            <Button className={style.infoBtn}></Button>
            <Button
              className={style.exitBtn}
              onClick={() => toggleModal()}
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
                handleFinish={handleFinish}
              />
            )}
          </div>
        </div>
      ) : (
        <ResultMining />
      )}
    </div>
  )
}
