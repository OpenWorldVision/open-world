
import { Button } from '@chakra-ui/button'
import style from '@components/professions/blacksmith/forgeHammer.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NotificationForge from '@components/professions/blacksmith/NotificationForge'
import ResultForgeHammer from '@components/professions/blacksmith/resultForgeHammer'

export default function ForgeHammer() {
  const [isLoading, setIsLoading] = useState(true)
  const [numberHammer, setNumberHammer] = useState(0)
  const [numberOreNeed, setNumberOreNeed] = useState(0)
  const [numberYourOre, setNumberYourOre] = useState(1)

  const [isStartQuestSuccess, setIsStartQuestSuccess] = useState(false)
  const [isStartQuestFail, setIsStartQuestFail] = useState(false)


  const handleNext = () => {
    setNumberHammer(numberHammer + 2)
    setNumberOreNeed(numberOreNeed + 1)
  }

  const handlePrev = () => {
    if (numberHammer > 0) {
      setNumberHammer(numberHammer - 2)
      setNumberOreNeed(numberOreNeed - 1)
    }
  }

  const handleStartQuest = () => {
    if (numberOreNeed <= numberYourOre && numberHammer !== 0) {
      setIsStartQuestSuccess(true)
    }
    else{
      setIsStartQuestFail(true)
    }
  }

  const hiddenNotification = () => {
    setIsStartQuestFail(false)
  }

  return (
    <>
      <div className={style.forgeHammerOverlay}>
        {!isStartQuestSuccess && !isStartQuestFail && <div className={style.frameforgeHammer}>
          <div className={style.frameHead}>
            <Link href="/professions/blacksmith">
              <a className={style.exitBtn}></a>
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
                  <div onClick={handleNext} className={style.next}></div>
                  <div onClick={handlePrev} className={style.prev}></div>
                </div>
                <div className={style.hammer}></div>
              </div>
            </div>
            <div className={style.oreNeed}>
              <div className={style.title}>
                Ore You Need :
              </div>
              <div className={style.detail}>
                <input value={numberOreNeed} className={`${style.input} ${numberOreNeed > numberYourOre && style.oreInvalid}`} type="text" />
                <div className={style.ore}></div>
              </div>
            </div>
            <div>
              <div className={style.title}>
                Note
              </div>
              <div className={style.detail}>
                1 Ore makes 2 Hammers
              </div>
            </div>
            <Button disabled={numberHammer === 0} onClick={handleStartQuest} className={style.startQuestBtn}></Button>
          </div>
        </div>}

        {isStartQuestSuccess && <ResultForgeHammer hammerReceived={numberHammer}/>}
        {isStartQuestFail && <NotificationForge hiddenNotification={hiddenNotification}/>}
      </div>
    </>

  )
}