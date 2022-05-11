import { useState } from 'react'
import style from '@components/professions/Mining.module.css'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

import ResultMining from '@components/professions/ResultMining'

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
          {/* <Button className={style.exitBtn}></Button> */}
          <Link href="/professions/openian">
            <a className={style.exitBtn}></a>
          </Link>
        </div>
        <div className={style.miningBody}>
          <div className={style.artItem}></div>
        </div>
        <div className={style.miningFooter}>
          {!isStartQuest ? <div className={style.miningQuestDetail}>
            <div>
              <div className={style.title}>
                Description
              </div>
              <div className={style.detail}>
                Ore is main material to make Hammer and BlackSmiths are paying good money for them. Let&apos;s go mine some !!!
              </div>
            </div>
            <div>
              <div className={style.title}>
                Base Duration
              </div>
              <div className={style.detail}>
                20 seccond
              </div>
            </div>
            <div>
              <div className={style.title}>
                Description
              </div>
              <div className={style.detail}>
                20 seccond
              </div>
            </div>
            <div>
              <div className={style.title}>
                Required
              </div>
              <div className={style.detail}>
                1 Hammer
                <div className={style.harmer}></div>
              </div>
            </div>
            <Button onClick={startQuest} className={style.startQuestBtn}></Button>
          </div>
            : <div className={style.miningWaitDetail}>
              <div>
                <div className={style.title}>
                  Active Quest
                </div>
                <div className={style.detail}>
                  Openian is on Mining Quest. Be patient !
                </div>
              </div>
              <div>
                <div className={style.title}>
                  Time Left
                </div>
                <div className={style.detail}>
                  20 seccond
                </div>
                <Button onClick={handleFinish} className={style.finishBtn}></Button>
              </div>
            </div>}
        </div>
      </div> : <ResultMining />}
    </div>
  )
}