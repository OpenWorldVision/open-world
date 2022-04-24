import { PropsWithChildren, useCallback, useState } from 'react'
import style from './professionsModal.module.css'
import ProfessionsQuest from './ProfessionsQuest'

type StaPerAttempt = {
  stamina: number
  staForSpecHeroType: number
  specHeroType: string
}

type questData = {
  name: string
  level: number
  description: string
  baseDuration: string
  staPerAttempt: StaPerAttempt
  minHeroRange: number
  maxHeroRange: number
  help: string
}

type Props = {
  isOpen: boolean
  width: number
  height?: number
  questOrder?: number
  npcName?: string
  npcAvatar?: string
  npcDialogue?: JSX.Element
  zIndex?: number
  fancyTitle?: string
  title?: string
  disabled?: boolean
  questDummyData?: questData
  toggleModal: () => void
}

export default function ProfessionsModal(props: PropsWithChildren<Props>) {
  const {
    isOpen,
    width,
    height,
    questOrder,
    npcName,
    npcAvatar,
    npcDialogue,
    zIndex,
    fancyTitle,
    title,
    disabled,
    questDummyData,
    toggleModal,
  } = props

  const [isStartQuest, setIsStartQuest] = useState(false)

  const onStartQuest = useCallback(
    (state) => {
      setIsStartQuest(state)
    },
    [isStartQuest]
  )

  return (
    <>
      {isOpen && (
        <div
          className={`overlay ${style.modalOverlay} ${isOpen && style.active}`}
        >
          {questOrder && (
            <div
              className={`${style.modal} game-border fancy`}
              style={{
                width: width + 'px',
                height: height + 'px',
                marginBottom: (npcDialogue ? 30 : 0) + 'px',
                zIndex: zIndex,
              }}
            >
              <div
                className={`click-cursor ${style.closeBtn}`}
                onClick={toggleModal}
              ></div>

              {fancyTitle && (
                <h3 className={`${style.modalTitle} ${style.fancy}`}>
                  <span>{fancyTitle}</span>
                </h3>
              )}

              {title && (
                <h3 className={`${style.modalTitle} ${style.basic}`}>
                  <span>{title}</span>
                </h3>
              )}

              {disabled ? (
                <div className={style.comingSoonWrap}>
                  <div className={style.comingSoon}>
                    <span>Coming Soon</span>
                  </div>
                </div>
              ) : (
                <div
                  className={`${style.startQuestWrap} click-cursor`}
                  onClick={() => onStartQuest(true)}
                >
                  <div className={style.startQuest}>
                    <span>Start Quests</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {npcDialogue && (
            <div
              className={style.npcDialogue}
              style={{
                width: width + 'px',
              }}
            >
              <div className={style.npcAvaWrap}>
                <img
                  id={npcAvatar}
                  src={`/images/professions/npcAva/${npcAvatar}Ava.png`}
                  alt=""
                />
              </div>
              <div className={style.npcDialogueGroup}>
                <h4 className={style.npcName}>
                  <span>{npcName}</span>
                </h4>
                <p>{npcDialogue}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {questDummyData && (
        <ProfessionsQuest
          isOpen={isStartQuest}
          toggleQuest={() => onStartQuest(false)}
          questName={questDummyData.name}
          questLevel={questDummyData.level}
          questDes={questDummyData.description}
          questBaseDuration={questDummyData.baseDuration}
          questStaPerAttempt={questDummyData.staPerAttempt}
          questMinHeroRange={questDummyData.minHeroRange}
          questMaxHeroRange={questDummyData.maxHeroRange}
          questHelp={questDummyData.help}
        />
      )}

      <style jsx>{`
        #miner {
          bottom: -61px;
        }
      `}</style>
    </>
  )
}
