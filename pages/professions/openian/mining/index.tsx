import { useState } from 'react'
import style from '@components/professions/mining/Mining.module.css'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

import ResultMining from '@components/professions/mining/ResultMining'
import MiningWait from '@components/professions/mining/MiningWait'
import MiningQuest from '@components/professions/mining/MiningQuest'

export default function Mining() {
  const [isStartQuest, setIsStartQuest] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const startQuest = () => {
    setIsStartQuest(true)
  }

  const handleFinish = () => {
    setIsFinished(true)
  }

  return (
      <div className={style.miningOverlay}>
      {!isFinished ? <div className={style.frameMining}>
        <div className={style.frameHead}>
          <Button className={style.infoBtn}></Button>
          <Link href="/professions/openian/main">
            <a className={style.exitBtn}></a>
          </Link>
        </div>
        <div className={style.miningBody}>
          <div className={style.artItem}></div>
        </div>
        <div className={style.miningFooter}>
          {!isStartQuest ? <MiningQuest startQuest={startQuest}/>
            : <MiningWait isStartQuest={isStartQuest} handleFinish={handleFinish}/>}
        </div>
      </div> : <ResultMining />}
    </div>
  )
}