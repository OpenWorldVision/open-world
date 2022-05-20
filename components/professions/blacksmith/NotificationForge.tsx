import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import style from './NotificationForge.module.css'

type Props = {
  hiddenNotification: () => void
}

export default function NotificationForge(props: Props) {
  const { hiddenNotification } = props
  // const [isLoading, setIsLoading] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  // }, [])
  return (
    <>
      {/* <div className={`${!isLoading && style.loadedNotification}`}>
        <div className={`overlay ${style.preLoaderNotification}`}>
          <div className={style.preloaderFoldingCube}>
            <div className={`${style.preloaderCube1} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube2} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube4} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube3} ${style.preloaderCube}`}></div>
          </div>
        </div>
      </div> */}
      <div className={style.notificationContainer}>
        <h3 className={style.notification}>
          <img
            src="/images/professions/blacksmith/notification.png"
            alt="Notification"
          />
        </h3>
        <div className={style.content}>
          <div className={style.title}>FAILED</div>
          <div className={style.helpText}>Not enough of Ore</div>
          <Button onClick={hiddenNotification} className={style.btnConfirm}></Button>
        </div>
      </div>
    </>
  )
}