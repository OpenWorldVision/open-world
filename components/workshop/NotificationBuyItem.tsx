import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import style from './NotificationBuyItem.module.css'

type Props = {
  handleHiddenNoti: () => void
  notiContent: object
}

export default function NotificationBuyItem(props: Props) {
  const { handleHiddenNoti, notiContent } = props
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleConfirm = useCallback(() => {
    handleHiddenNoti()
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
            {notiContent['value'] ? 'SUCCESS !' : 'FAILED!'}
          </div>
          <div className={style.helpText}>{notiContent['content']}</div>
          {notiContent['value'] && (
            <div style={{ marginTop: '20px' }} className={style.helpText}>
              Check Your Inventory For Bought Items !
            </div>
          )}
          <Button
            sx={{
              cursor:
                'url(/images/worldmap/SelectCursor.webp), auto !important',
            }}
            onClick={handleConfirm}
            className={style.btnConfirm}
          ></Button>
        </div>
      </div>
      <div className={style.modalMobile}>
        <div className={style.buyBoardMobile}>Buy Items</div>
        <div className={style.content}>
          <div className={style.title}>
            {notiContent['value'] ? 'SUCCESS !' : 'FAILED!'}
          </div>
          <div className={style.helpText}>{notiContent['content']}</div>
          {notiContent['value'] && (
            <div style={{ marginTop: '20px' }} className={style.helpText}>
              Check Your Inventory For Bought Items !
            </div>
          )}
        </div>
        <Button onClick={handleConfirm} className={style.itemBtnConfirm}>Confirm</Button>
      </div>
    </>
  )
}
