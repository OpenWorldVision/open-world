import { Button } from '@chakra-ui/react'
import styles from './blacksmith.module.css'
import Link from 'next/link'
import SellBoard from './sellerboard/SellBoard'
import { useCallback, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import ForgeHammer from './forgehammer/ForgeHammer';
import LoadingModal from '@components/LoadingModal'

export default function Blacksmith() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isForgeHammer, setIsForgeHammer] = useState(false)
  const [isSellBoard, setIsSellBoard] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

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

  const toggleForgeHammerModal = useCallback(
    async (state) => {
      setIsForgeHammer(state)
    },
    [isForgeHammer]
  )

  const toggleSellBoardModal = useCallback(
    async (state) => {
      setIsSellBoard(state)
    },
    [isSellBoard]
  )

  const toggleLoadingModal = useCallback(
    (state)  => {
      setIsLoading(state)
    },
    [isLoading]
  )

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className={`overlay game-scroll-bar ${styles.blackSmithOverlay}`}>
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
          <TransformComponent
            wrapperStyle={{ height: '100vh', width: '100vw' }}
          >
            <div className={styles.blackSmithContainer}>
              <div className={styles.blackSmithBg}>
                <Button
                  className={`${styles.forgeHammer} click-cursor`}
                  onClick={toggleForgeHammerModal}
                ></Button>
                <Button
                  className={`${styles.sellHammer} click-cursor`}
                  onClick={toggleSellBoardModal}
                ></Button>
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
        <Link href="/">
          <a className={`${styles.backBtn} click-cursor`}></a>
        </Link>
      </div>

      {<SellBoard isOpen={isSellBoard} toggleModal={toggleSellBoardModal} toggleLoadingModal={toggleLoadingModal} />}
      {<ForgeHammer isOpen={isForgeHammer} toggleModal={toggleForgeHammerModal} toggleLoadingModal={toggleLoadingModal} />}
    </>
  )
}
