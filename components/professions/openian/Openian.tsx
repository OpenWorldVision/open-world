import { useCallback, useEffect, useState } from 'react'
import styles from './openian.module.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import FishingModal from './fishingModal/FishingModal'
import MiningModal from './miningModal/MiningModal'
import LoadingModal from '@components/LoadingModal'
import BackButton from '@components/BackButton'
import Inventory from '@components/Inventory'

function Openian() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isOpenMining, setIsOpenMining] = useState(false)
  const [isOpenStore, setIsOpenStore] = useState(false)
  const [isOpenFishing, setIsOpenFishing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [updateInventory, setUpdateInventory] = useState(false)

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

  const toggleFishingModal = useCallback(() => {
    setIsOpenFishing(!isOpenFishing)
  }, [isOpenFishing])

  const toggleMiningModal = useCallback(() => {
    setIsOpenMining(!isOpenMining)
  }, [isOpenMining])

  const toggleLoadingModal = useCallback((state) => {
    setIsLoading(state)
  }, [])

  const onUpdateInventory = () => {
    setUpdateInventory(!updateInventory)
  }

  if (isOpenStore) {
    return (
      <Inventory
        setIsOpenInventory={toggleSellModal}
        isOpenInventory={isOpenStore}
      />
    )
  }
  return (
    <>
      {isLoading && <LoadingModal />}

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
          <TransformComponent
            wrapperStyle={{ height: '100vh', width: '100vw' }}
          >
            <div className={`${styles.openianContainer} overlay`}>
              <div className={styles.openianBg}>
                <div
                  className={`${styles.openianMiningBtn} click-cursor`}
                  onClick={toggleMiningModal}
                ></div>
                <div
                  className={`${styles.openianFishBtn} click-cursor`}
                  onClick={toggleFishingModal}
                ></div>
                <div
                  className={`${styles.openianSellBtn} click-cursor`}
                  onClick={() => toggleSellModal(true)}
                ></div>
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>

        <BackButton />

        <FishingModal
          isOpen={isOpenFishing}
          toggleModal={toggleFishingModal}
          toggleLoadingModal={toggleLoadingModal}
          updateInventory={onUpdateInventory}
        />

        <MiningModal
          isOpen={isOpenMining}
          toggleModal={toggleMiningModal}
          toggleLoadingModal={toggleLoadingModal}
          updateInventory={onUpdateInventory}
        />
      </div>
    </>
  )
}

export default Openian
