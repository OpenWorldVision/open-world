
import { Button } from '@chakra-ui/button'
import style from '@components/professions/blacksmith/forgeHammer.module.css'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import NotificationForge from '@components/professions/blacksmith/NotificationForge'
import ResultForgeHammer from '@components/professions/blacksmith/resultForgeHammer'

import { fetchAmountItemByTrait } from 'utils/blackSmithContract'

export default function ForgeHammer() {
  const [numberHammer, setNumberHammer] = useState(0)
  const [numberOreNeed, setNumberOreNeed] = useState(0)
  const [numberYourOre, setNumberYourOre] = useState([])

  const [isStartQuestSuccess, setIsStartQuestSuccess] = useState(false)
  const [isStartQuestFail, setIsStartQuestFail] = useState(false)

  const getListYourOre = async () => {
    const listYourOre = await fetchAmountItemByTrait(2)
    setNumberYourOre(listYourOre)
  }

  useEffect(() => {
    getListYourOre()
  }, [])

  const handleNext = useCallback(() => {
    setNumberHammer(numberHammer + 1)
    setNumberOreNeed(numberOreNeed + 2)
  }, [numberHammer])

  const handlePrev = useCallback(() => {
    if (numberHammer > 0) {
      setNumberHammer(numberHammer - 1)
      setNumberOreNeed(numberOreNeed - 2)
    }
  }, [numberHammer])
  const handleStartQuest = () => {
    if (numberOreNeed <= numberYourOre.length && numberHammer !== 0) {
      setIsStartQuestSuccess(true)
    }
    else {
      setIsStartQuestFail(true)
    }
  }

  const hiddenNotification = useCallback(() => {
    setIsStartQuestFail(false)
  }, [])

  const hiddenPopupResult = useCallback(() => {
    setIsStartQuestSuccess(false)
  }, [])

  return (
    <>
      <div className={style.forgeHammerOverlay}>
        {!isStartQuestSuccess && !isStartQuestFail && <div className={style.frameforgeHammer}>
          <div className={style.frameHead}>
            <Link href="/professions/blacksmith">
              <a className={`${style.exitBtn} click-cursor`}></a>
            </Link>
          </div>
          <div className={style.forgeHammerBody}>
            <div className={style.artItem}></div>
          </div>
          <div className={style.forgeHammerFooter}>
            <div className={style.title}>
              Description
            </div>
            <div className={style.detail}>
              Hammer is item that help Openians doing their Mining quest
            </div>
            <div className={style.amountHammer}>
              <div className={style.title}>
                Amount of Hammer :
              </div>
              <div className={style.detail}>
                <input value={numberHammer} className={style.input} type="text" />
                <div className={style.BtnContainer}>
                  <div onClick={handleNext} className={`${style.next} click-cursor`}></div>
                  <div onClick={handlePrev} className={`${style.prev} click-cursor`}></div>
                </div>
                <div className={style.hammer}></div>
              </div>
            </div>
            <div className={style.oreNeed}>
              <div className={style.title}>
                Ore You Need :
              </div>
              <div className={style.detail}>
                <input value={numberOreNeed} className={`${style.input} ${numberOreNeed > numberYourOre.length && style.oreInvalid}`} type="text" />
                <div className={style.ore}></div>
              </div>
            </div>
            <div>
              <div className={style.title}>
                Note
              </div>
              <div className={style.detail}>
                2 Ore makes 1 Hammer
              </div>
            </div>
            <Button sx={{cursor: 'url(/images/worldmap/SelectCursor.png), auto !important'}} disabled={numberHammer === 0} onClick={handleStartQuest} className={style.startQuestBtn}></Button>
          </div>
        </div>}

        {isStartQuestSuccess && <ResultForgeHammer hiddenPopupResult={hiddenPopupResult} hammerReceived={numberHammer} numberYourOre={numberYourOre} />}
        {isStartQuestFail && <NotificationForge hiddenNotification={hiddenNotification} />}
      </div>
    </>

  )
}