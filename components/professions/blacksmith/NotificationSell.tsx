import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import style from './NotificationSell.module.css'

import { sellHammer } from 'utils/blackSmithContract'

type Props = {
  hiddenNotification: () => void
  listHammer: Array<number>
  sellingAmount: number
  price: number
}

export default function NotificationSell(props: Props) {
  const { hiddenNotification, listHammer, sellingAmount, price } = props
  const [isLoading, setIsLoading] = useState(true)
  const [checkSellHammer, setCheckSellHammer] = useState(false)

  const handleSellHammer = async () => {
    const listSellHammer = listHammer.slice(0, sellingAmount)
    const handleSellHammer = await sellHammer(listSellHammer, price)
    setIsLoading(false)
    if (handleSellHammer) {
      setCheckSellHammer(true)
    }
  }

  useEffect(() => {
    handleSellHammer()
  }, [])

  const handleConfirm = useCallback(() => {
    hiddenNotification()
  }, [])
  return (
    <>
      <div className={`${!isLoading && style.loadedNotification}`}>
        <div className={`overlay ${style.preLoaderNotification}`}>
          <div className={style.preloaderFoldingCube}>
            <div className={`${style.preloaderCube1} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube2} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube4} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube3} ${style.preloaderCube}`}></div>
          </div>
        </div>
      </div>
      <div className={style.notificationContainer}>
        <h3 className={style.notification}>
          <img
            src="/images/professions/blacksmith/notification.png"
            alt="Notification"
          />
        </h3>
        <div className={style.content}>
          <div className={style.title}>{checkSellHammer ? 'SUCCESS !!' : 'FAILED !!'}</div>
          <Button onClick={handleConfirm} className={`${style.btnConfirm} click-cursor`}></Button>
        </div>
      </div>
    </>
  )
}