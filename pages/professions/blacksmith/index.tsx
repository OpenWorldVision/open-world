import styles from '@components/professions/blacksmith/blacksmith.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export default function BlackSmith() {
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
  return (
    <div className={styles.blackSmithContainer}>
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
            <Link href="/professions">
              <a className={`${styles.backBtn}`}></a>
            </Link>
            <Link href="/professions/blacksmith/forgehammer/">
              <a className={`${styles.sellHammer}`}></a>
            </Link>
            {/* <div className={styles.sellHammer}></div> */}
            <div className={styles.forgeHammer}></div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}