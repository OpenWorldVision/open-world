import { useCallback, useEffect, useState } from 'react'
import styles from './openian.module.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Link from 'next/link'
import SellModal from './SellModal'

function Openian() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isOpenStore, setIsOpenStore] = useState(false)

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    checkWindowWidth()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

  const toggleSellModal = useCallback((state) => {
    setIsOpenStore(state)
  }, [])

  return (
    <div className={`${styles.openianOverlay} overlay game-scroll-bar`}>
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        wheel={{
          disabled: true,
        }}
        doubleClick={{
          disabled: true,
        }}
        panning={{
          disabled: windowWidth >= 1858,
        }}
      >
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
          <div className={`${styles.openianContainer} overlay`}>
            <div className={styles.openianBg}>
              <div
                className={styles.openianSellBtn}
                onClick={() => toggleSellModal(true)}
              ></div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      <Link href="/">
        <a className={`${styles.backBtn} click-cursor`}></a>
      </Link>

      <SellModal
        isOpen={isOpenStore}
        toggleModal={() => toggleSellModal(false)}
      />
    </div>
  )
}

export default Openian
