import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import style from './NotificationSell.module.css'

type Props = {
  hiddenNotification: () => void
}

export default function NotificationSell(props: Props) {
  const { hiddenNotification } = props
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleConfirm = () => {
    hiddenNotification()
  }
  return (
    <>
      <div className={`${!isLoading && style.loadedNotification}`}>
        <div className={`overlay ${style.preLoaderNotification}`}>
          <div className={style.preloaderFoldingCube}>
            <div
              className={`${style.preloaderCube1} ${style.preloaderCube}`}
            ></div>
            <div
              className={`${style.preloaderCube2} ${style.preloaderCube}`}
            ></div>
            <div
              className={`${style.preloaderCube4} ${style.preloaderCube}`}
            ></div>
            <div
              className={`${style.preloaderCube3} ${style.preloaderCube}`}
            ></div>
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
          <div className={style.title}>SUCCESS !!</div>
          <Button sx={{cursor: 'url(/images/worldmap/SelectCursor.png), auto !important'}} onClick={handleConfirm} className={style.btnConfirm}></Button>
        </div>
      </div>
    </>
  )
}
