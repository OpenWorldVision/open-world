import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOpenBalance } from 'utils/checkBalanceOpen'
import styles from './MobileHeaderBar.module.css'

const MobileHeaderBar = (props) => {
  const profile = useSelector((state: any) => state.ProfileStore.profile)
  const balanceOpen: string = useSelector(
    (state: any) => state.ProfileStore.openBalance
  )
  const numberOpen = parseInt(balanceOpen)
  //   useEffect(() => {
  //     const balance = getBalance();
  //   }, [])
  //   const getBalance = async () => {
  //     const amountOpen = await getOpenBalance(false);
  //     return amountOpen
  //   }
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.leftSide}>
          <div className={styles.avatarUser}>
            <img
              src={`/images/profile/hero/${
                profile?._picId && profile?._picId < 14
                  ? profile?._picId
                  : 'none'
              }.webp`}
              alt="img"
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.balanceContainer}>
            <div className={styles.openValueText}>{numberOpen}</div>
            <div className={styles.coinIcon} />
          </div>
          <div className={styles.moreIcon}></div>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  )
}

export default MobileHeaderBar
