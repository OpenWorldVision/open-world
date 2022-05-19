import { Button } from '@chakra-ui/button'
import { useEffect, useState } from 'react'
import style from './Mining.module.css'

type Props = {
  isStartQuest: boolean
  handleFinish: () => void
}

export default function MiningWait(props: Props) {
  const { isStartQuest, handleFinish } = props

  const [checkCanFinish, setCheckCanFinish] = useState(true)

  const handleCheckCanFinish = () => {
    if (!checkCanFinish) {
      handleFinish()
    }
  }

  useEffect(() => {
    if (isStartQuest) {
      setTimeout(() => {
        setCheckCanFinish(false)
      }, 20000)
    }
  }, [])

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
          20 secconds
        </div>
        <Button onClick={handleCheckCanFinish} className={`${!checkCanFinish && style.finishBtn} ${checkCanFinish && style.finishBtnDisable} click-cursor`}></Button>
      </div>
    </div>
  )

}