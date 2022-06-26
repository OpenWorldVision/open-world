import { Button } from '@chakra-ui/button'
import style from './forgeHammer.module.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import NotificationForge from './NotificationForge'
import ResultForgeHammer from './ResultForgeHammer'
import { fetchAmountItemByTrait, makeHammer } from 'utils/blackSmithContract'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

type Props = {
  toggleModal: (boolean) => void
  toggleLoadingModal: (boolean) => void
  isOpen: boolean
}

export default function ForgeHammer(props: Props) {
  const { toggleModal, toggleLoadingModal, isOpen } = props

  const [numberHammer, setNumberHammer] = useState(0)
  const [numberYourOre, setNumberYourOre] = useState([])
  const [isStartQuest, setIsStartQuest] = useState(false)
  const [isStartQuestFail, setIsStartQuestFail] = useState(false)
  const [checkIsSuccess, setCheckIsSuccess] = useState(false)
  const handleTxStateChange = useTransactionState()
  const [popup, setPopup] = useState(null)

  const numberOreNeed = useMemo(() => numberHammer / 2, [numberHammer])

  const getListYourOre = async () => {
    const listYourOre = await fetchAmountItemByTrait(2)
    setNumberYourOre(listYourOre)
  }

  useEffect(() => {
    getListYourOre()
  }, [])

  const handleNext = useCallback(() => {
    setNumberHammer((prevNumberHammer) => prevNumberHammer + 2)
  }, [])

  const handlePrev = useCallback(() => {
    setNumberHammer((prevNumberHammer) =>
      prevNumberHammer <= 0 ? prevNumberHammer : prevNumberHammer - 2
    )
  }, [])

  const handleStartQuest = async () => {
    const title = 'Forge hammer'
    toggleLoadingModal(true)
    if (numberOreNeed <= numberYourOre.length && numberHammer !== 0) {
      const listSellHammer = numberYourOre.slice(0, numberOreNeed)
      const forgeHammer = await makeHammer(listSellHammer, (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, setPopup)
      })

      if (forgeHammer) {
        setCheckIsSuccess(forgeHammer)
        setIsStartQuest(true)
        handleTxStateChange(
          title,
          forgeHammer.transactionHash,
          forgeHammer.status,
          setPopup
        )
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, setPopup)
      }

      toggleLoadingModal(false)
    } else {
      toggleLoadingModal(false)
      setIsStartQuestFail(true)
    }
  }

  const hiddenNotification = useCallback(() => {
    setIsStartQuestFail(false)
  }, [])

  const hiddenPopupResult = useCallback(() => {
    setIsStartQuest(false)
  }, [])

  const handleToggleModal = useCallback(() => {
    toggleModal(false)
    setCheckIsSuccess(false)
  }, [toggleModal])

  return (
    <div
      className={`${style.forgeHammerOverlay} ${
        isOpen && style.active
      } overlay`}
    >
      {!isStartQuest && !isStartQuestFail && (
        <div className={style.frameforgeHammer}>
          <div className={style.frameHead}>
            <Button
              className={`${style.exitBtn} click-cursor`}
              onClick={handleToggleModal}
            ></Button>
          </div>
          <div className={style.forgeHammerBody}>
            <div className={style.artItem} />
          </div>
          <div className={style.forgeHammerFooter}>
            <div className={style.title}>Description</div>
            <div className={style.detail}>
              Hammer is item that help Openians doing their Mining quest
            </div>
            <div className={style.amountHammer}>
              <div className={style.title}>Amount of Hammer :</div>
              <div className={style.detail}>
                <input
                  value={numberHammer}
                  className={style.input}
                  type="text"
                />
                <div className={style.BtnContainer}>
                  <div
                    onClick={handleNext}
                    className={`${style.next} click-cursor`}
                  />
                  <div
                    onClick={handlePrev}
                    className={`${style.prev} click-cursor`}
                  />
                </div>
                <div className={style.hammer} />
              </div>
            </div>
            <div className={style.oreNeed}>
              <div className={style.title}>Ore You Need :</div>
              <div className={style.detail}>
                <input
                  value={numberOreNeed}
                  className={`${style.input} ${
                    numberOreNeed > numberYourOre.length && style.oreInvalid
                  }`}
                  type="text"
                />
                <div className={style.ore} />
              </div>
            </div>
            <div>
              <div className={style.title}>Note</div>
              <div className={style.detail}>1 Ore makes 2 Hammer</div>
            </div>
            <Button
              sx={{
                cursor:
                  'url(/images/worldmap/SelectCursor.webp), auto !important',
              }}
              disabled={
                numberHammer === 0 || numberOreNeed > numberYourOre.length
              }
              onClick={handleStartQuest}
              className={style.startQuestBtn}
            />
          </div>
        </div>
      )}

      {isStartQuest && (
        <ResultForgeHammer
          hiddenPopupResult={hiddenPopupResult}
          hammerReceived={numberHammer}
          checkIsSuccess={checkIsSuccess}
          toggleModal={toggleModal}
        />
      )}
      {isStartQuestFail && (
        <NotificationForge hiddenNotification={hiddenNotification} />
      )}
      {popup}
    </div>
  )
}
