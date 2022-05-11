import { Button } from '@chakra-ui/react'
import style from './ResultMiningStyle.module.css'

export default function ResultMining() {
  return (
    <div className={style.frameFinished}>
      <div className={style.resultMining}>
        <div className={style.title}>You Get</div>
        <div className={style.items}>
          <span>X5</span>
        </div>
      </div>
      <div className={style.helpText}>All the Ores you mine will be stored at your Inventory</div>
      <Button className={style.confirmBtn}></Button>
    </div>
  )
}