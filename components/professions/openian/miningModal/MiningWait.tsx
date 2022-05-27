import { Button } from '@chakra-ui/button'
import { useEffect, useState } from 'react'
import style from './Mining.module.css'

type Props = {
  isStartQuest: boolean
  timeLeft: number
  checkCanFinish: boolean
  handleFinish: () => void
}

export default function MiningWait(props: Props) {
  const { checkCanFinish, isStartQuest, timeLeft, handleFinish } = props

  const handleCheckCanFinish = () => {
    if (checkCanFinish) {
      handleFinish()
    }
  }

  return (
    <div className={style.miningWaitDetail}>
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
          {timeLeft} secconds
        </div>
        <Button onClick={handleCheckCanFinish} className={`${checkCanFinish && style.finishBtn} ${!checkCanFinish && style.finishBtnDisable}`}></Button>
      </div>
    </div>
  )

}