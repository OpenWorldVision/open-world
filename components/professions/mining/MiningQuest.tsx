import { Button } from '@chakra-ui/button'
import { useState } from 'react'
import style from './Mining.module.css'

type Props = {
  startQuest: () => void
}

export default function MiningQuest(props: Props) {
  const { startQuest } = props
  const [harmer, setHarmer] = useState(1)

  return (
    <div className={style.miningQuestDetail}>
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
          Stamina Per Attemp
        </div>
        <div className={style.detail}>
          20 
          <div className={style.iconStamina}></div>
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
      <Button disabled={harmer === 0} onClick={startQuest} className={style.startQuestBtn}></Button>
    </div>
  )
}