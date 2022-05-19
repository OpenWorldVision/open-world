import { useCallback, useEffect, useState } from 'react'
import styles from '@components/professions/openian.module.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Link from 'next/link'
import SellModal from '@components/professions/openian/SellModal'
import FishingModal from '@components/professions/openian/FishingModal'
import { getFinishFishingQuest } from 'utils/professionContract'

function Openian() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isOpenStore, setIsOpenStore] = useState(false)
  const [isFishing, setIsFishing] = useState(false)
  const [haveQuest, setHaveQuest] = useState(false)

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
    if (!isFishing) {
      checkFinishFishingQuest()
    }

    setIsFishing(!isFishing)
  }, [isFishing])

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
        isOpen={isFishing}
        toggleModal={() => toggleFishingModal()}
        haveQuestUnfinish={haveQuest}
      />
    </div>
  )
}

export default Openian
