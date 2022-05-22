import styles from '@components/professions/blacksmith/blacksmith.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export default function BlackSmith() {
  const [isLoading, setIsLoading] = useState(true)
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // useEffect(() => {
  // const checkWindowWidth = () => {
  //   setWindowWidth(window.innerWidth)
  // }

  //   checkWindowWidth()

  //   window.addEventListener('resize', checkWindowWidth)

  //   return () => {
  //     window.removeEventListener('resize', checkWindowWidth)
  //   }
  // }, [])
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  // }, [])
  return (
    <div className={styles.blackSmithContainer}>
      {/* <div className={`${!isLoading && styles.loadedBlackSmith}`}>
        <div className={`overlay ${styles.preLoaderBlackSmith}`}>
          <div className={styles.preloaderFoldingCube}>
            <div className={`${styles.preloaderCube1} ${styles.preloaderCube}`}></div>
            <div className={`${styles.preloaderCube2} ${styles.preloaderCube}`}></div>
            <div className={`${styles.preloaderCube4} ${styles.preloaderCube}`}></div>
            <div className={`${styles.preloaderCube3} ${styles.preloaderCube}`}></div>
          </div>
        </div>
      </div> */}
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
      // wheel={{
      //   disabled: true,
      // }}
      // doubleClick={{
      //   disabled: true,
      // }}
      // panning={{
      //   disabled: windowWidth >= 1858,
      // }}
      >
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
          <div className={styles.blackSmithBg}>
            <Link href="/professions/blacksmith/sellerboard">
              <a className={`${styles.sellHammer}`}></a>
            </Link>
            <Link href="/professions/blacksmith/forgehammer">
              <a className={`${styles.forgeHammer}`}></a>
            </Link>
            {/* <div className={styles.sellHammer}></div> */}
            {/* <div className={styles.forgeHammer}></div> */}
          </div>
        </TransformComponent>
      </TransformWrapper>
      <Link href="/professions">
        <a className={`${styles.backBtn}`}></a>
      </Link>
    </div>
  )
}