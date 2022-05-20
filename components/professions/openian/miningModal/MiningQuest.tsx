import { Button } from '@chakra-ui/button'
import { useEffect, useState } from 'react'
import style from './Mining.module.css'
import { fetchMiningQuestData } from 'utils/professionContract'

type Props = {
  startQuest: () => void
}

export default function MiningQuest(props: Props) {
  const { startQuest } = props
  const [harmer, setHarmer] = useState(1)
  const [duration, setDuration] = useState(0)
  const [requireStamina, setRequireStamina] = useState(0)

  const initialize = async () => {
    const data = await fetchMiningQuestData()
    setDuration(data.duration)
    setRequireStamina(data.requireStamina)
  }

  useEffect(() => {
    initialize();
  }, [])

  return (
    <div className={style.miningQuestDetail}>
      <div>
        <div className={style.title}>
          Description
        </div>
        <div className={style.detail}>
          Ore is the main material to make Hammers and BlackSmiths are paying good money for them. Let&apos;s go mine some !!!
        </div>
      </div>
      <div>
        <div className={style.title}>
          Base Duration
        </div>
        <div className={style.detail}>
          {duration} secconds
        </div>
      </div>
      <div>
        <div className={style.title}>
          Stamina Per Attemp
        </div>
        <div className={style.detail}>
          {requireStamina}
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
      <Button disabled={harmer === 0} onClick={startQuest} className={`${style.startQuestBtn} click-cursor`}></Button>
    </div>
  )
}