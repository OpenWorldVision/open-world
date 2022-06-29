import { Button } from '@chakra-ui/react'
import style from './ResultMiningStyle.module.css'

type Props = {
  toggleModal: () => void
}

export default function ResultMining(props: Props) {
  const { toggleModal } = props

  return (
    <div className={`${style.frameFinished}`}>
      <div className={style.questFinish}></div>
      <div></div>
      <div className={style.resultMining}>
        <div className={style.title}>You Got</div>
        <div className={style.items}>
          <span>x1</span>
        </div>
      </div>
      <div className={style.helpText}>
        All the Ores you mine will be stored in your inventory
      </div>
      <Button className={style.confirmBtn} onClick={toggleModal}></Button>
    </div>
  )
}
