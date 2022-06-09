import { Button } from '@chakra-ui/button'
import { formatDuration } from 'date-fns'
import { useCallback, useMemo } from 'react'
import style from './Mining.module.css'

type Props = {
  isStartQuest: boolean
  timeLeft: Duration
  checkCanFinish: boolean
  handleFinish: () => void
}

export default function MiningWait(props: Props) {
  const { checkCanFinish, isStartQuest, timeLeft, handleFinish } = props

  const handleCheckCanFinish = useCallback(() => {
    if (checkCanFinish) {
      handleFinish()
    }
  }, [checkCanFinish, handleFinish])

  const formattedTimeLeft = useMemo(
    () =>
      formatDuration(timeLeft, {
        format: ['hours', 'minutes', 'seconds'],
      }),
    [timeLeft]
  )

  return (
    <div className={style.miningWaitDetail}>
      <div>
        <div className={style.title}>Active Quest</div>
        <div className={style.detail}>
          Openian is on Mining Quest. Be patient !
        </div>
      </div>
      <div>
        <div className={style.title}>Time Left</div>
        <div className={style.detail}>{formattedTimeLeft}</div>
        <Button
          onClick={handleCheckCanFinish}
          className={`${checkCanFinish && style.finishBtn} ${
            !checkCanFinish && style.finishBtnDisable
          }`}
        ></Button>
      </div>
    </div>
  )
}
