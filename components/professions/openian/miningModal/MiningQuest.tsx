import { Button } from '@chakra-ui/button'
import style from './Mining.module.css'

type Props = {
  startQuest: () => void
  duration: number
  requireStamina: number
}

export default function MiningQuest(props: Props) {
  const { duration, requireStamina, startQuest } = props

  return (
    <div className={style.miningQuestDetail}>
      <div>
        <div className={style.title}>Description</div>
        <div className={style.detail}>
          Ore is the main material to make Hammers and BlackSmiths are paying
          good money for them. Let&apos;s go mine some !!!
        </div>
      </div>
      <div>
        <div className={style.title}>Base Duration</div>
        <div className={style.detail}>{duration} secconds</div>
      </div>
      <div>
        <div className={style.title}>Stamina Per Attemp</div>
        <div className={style.detail}>
          {requireStamina}
          <div className={style.iconStamina}></div>
        </div>
      </div>
      <div>
        <div className={style.title}>Required</div>
        <div className={style.detail}>
          1 Hammer
          <div className={style.harmer}></div>
        </div>
      </div>
      <Button
        onClick={startQuest}
        className={`${style.startQuestBtn} click-cursor`}
      />
    </div>
  )
}
