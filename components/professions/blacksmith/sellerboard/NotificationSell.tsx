import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import style from './NotificationSell.module.css'

import { sellHammer } from 'utils/blackSmithContract'

type Props = {
  hiddenNotification: () => void
  checkSellHammer: boolean
}

export default function NotificationSell(props: Props) {
  const { hiddenNotification, checkSellHammer} = props
  
  // const handleSellHammer = async () => {
  //   const listSellHammer = listHammer.slice(0, sellingAmount)
  //   const handleSellHammer = await sellHammer(listSellHammer, price)
  //   setIsLoading(false)
  //   if (handleSellHammer) {
  //     setCheckSellHammer(true)
  //   }
  // }

  // useEffect(() => {
  //   handleSellHammer()
  // }, [])

  const handleConfirm = useCallback(() => {
    hiddenNotification()
  }, [])
  return (
    <>
      <div className={style.notificationContainer}>
        <h3 className={style.notification}>
          <img
            src="/images/professions/blacksmith/notification.png"
            alt="Notification"
          />
        </h3>
        <div className={style.content}>
          <div className={style.title}>
            {checkSellHammer ? 'SUCCESS !!' : 'FAILED !!'}
          </div>
          <Button
            onClick={handleConfirm}
            className={`${style.btnConfirm} click-cursor`}
          ></Button>
        </div>
      </div>
    </>
  )
}
