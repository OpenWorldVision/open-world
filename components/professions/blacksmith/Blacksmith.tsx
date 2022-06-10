import { Button } from '@chakra-ui/react'
import styles from './blacksmith.module.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import ForgeHammer from './forgehammer/ForgeHammer'
import LoadingModal from '@components/LoadingModal'
import BackButton from '@components/BackButton'
import Inventory, { InventoryRef } from '@components/professions/Inventory'

export default function Blacksmith() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isForgeHammer, setIsForgeHammer] = useState(false)
  const [isOpenInventory, setIsOpenInventory] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inventoryRef = useRef<InventoryRef>()

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

  const toggleForgeHammerModal = useCallback(() => {
    setIsForgeHammer((prevState) => !prevState)
  }, [])

  const toggleSellBoardModal = useCallback(() => {
    setIsOpenInventory((prevState) => !prevState)
  }, [])

  const toggleLoadingModal = useCallback(() => {
    setIsLoading((prevState) => !prevState)
  }, [])

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
                />
                <Button
                  className={`${styles.sellHammer} click-cursor`}
                  onClick={inventoryRef.current?.open}
                />
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
        <BackButton />
      </div>

      <Inventory ref={inventoryRef} />

      <ForgeHammer
        isOpen={isForgeHammer}
        toggleModal={toggleForgeHammerModal}
        toggleLoadingModal={toggleLoadingModal}
      />
    </>
  )
}
