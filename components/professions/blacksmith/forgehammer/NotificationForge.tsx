import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import style from './NotificationForge.module.css'

type Props = {
  hiddenNotification: () => void
}

export default function NotificationForge(props: Props) {
  const { hiddenNotification } = props
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
          <div className={style.title}>FAILED</div>
          <div className={style.helpText}>Not enough of Ore</div>
          <Button sx={{cursor: 'url(/images/worldmap/SelectCursor.png), auto !important'}} onClick={hiddenNotification} className={style.btnConfirm}></Button>
        </div>
      </div>
    </>
  )
}