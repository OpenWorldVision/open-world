import { useCallback, useEffect, useState } from 'react'
import styles from './openian.module.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Link from 'next/link'
import SellModal from './sellModal/SellModal'
import FishingModal from './fishingModal/FishingModal'
import MiningModal from './miningModal/MiningModal'
import { getFinishFishingQuest } from 'utils/professionContract'
import LoadingModal from '@components/LoadingModal'

function Openian() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isOpenMining, setIsOpenMining] = useState(false)
  const [isOpenStore, setIsOpenStore] = useState(false)
  const [isOpenFishing, setIsOpenFishing] = useState(false)
  const [haveQuest, setHaveQuest] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    checkWindowWidth()
    checkFinishFishingQuest()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

  const checkFinishFishingQuest = useCallback(async () => {
    const data = await getFinishFishingQuest()
    const NOW = new Date().getTime()
    const endTime = (parseInt(data?.startTime) + data?.duration) * 1000
    if (endTime < NOW && !data.finish) {
      setHaveQuest(true)
    } else {
      setHaveQuest(false)
    }
  }, [])

  const toggleSellModal = useCallback((state) => {
    setIsOpenStore(state)
  }, [])

  const toggleFishingModal = useCallback(() => {
    if (!isOpenFishing) {
      checkFinishFishingQuest()
    }

    setIsOpenFishing(!isOpenFishing)
  }, [isOpenFishing])

  const toggleMiningModal = useCallback(() => {
    setIsOpenMining(!isOpenMining)
  }, [isOpenMining])

  const toggleLoadingModal = useCallback(
    (state) => {
      setIsLoading(state)
    },
    [isLoading]
  )

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
                  onClick={() => toggleMiningModal()}
                ></div>
                <div
                  className={`${styles.openianFishBtn} click-cursor`}
                  onClick={() => toggleFishingModal()}
                ></div>
                <div
                  className={`${styles.openianSellBtn} click-cursor`}
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

        <FishingModal
          isOpen={isOpenFishing}
          toggleModal={() => toggleFishingModal()}
          haveQuestUnfinish={haveQuest}
        />

        <MiningModal
          isOpen={isOpenMining}
          toggleModal={() => toggleMiningModal()}
          toggleLoadingModal={(state) => toggleLoadingModal(state)}
        />
      </div>
    </>
  )
}

export default Openian
