import { Button, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import style from './resultForgeHammer.module.css'

type Props = {
  hammerReceived: number
  hiddenPopupResult: () => void
  checkIsSuccess: boolean
  toggleModal: (boolean) => void
}

export default function ResultForgeHammer(props: Props) {
  const { hammerReceived, checkIsSuccess, hiddenPopupResult, toggleModal } =
    props

  const handleConfirm = useCallback(() => {
    hiddenPopupResult()
  }, [hiddenPopupResult])

  const handleToggleModal = () => {
    toggleModal(false)
  }
  return (
    <>
      <div className={style.resultContainer}>
        <h3 className={style.finished}>
          <img
            src="/images/professions/blacksmith/finished.png"
            alt="Finished"
          />
        </h3>
        <div className={style.frameHead}>
          <Button
            onClick={handleToggleModal}
            className={`${style.exitBtn} click-cursor`}
          />
        </div>
        <div className={style.content}>
          {checkIsSuccess ? (
            <>
              <div className={style.title}>You Get</div>
              <div className={style.received}>
                X{hammerReceived} <div className={style.hammer}></div>
              </div>
              <div className={style.helpText}>
                All the Hammers you make will be stored at your Inventory
              </div>
            </>
          ) : (
            <div className={style.title}>FAILED!!</div>
          )}
          <Button
            onClick={handleConfirm}
            className={`${style.btnConfirm} click-cursor`}
          />
        </div>
      </div>
    </>
  )
}
