import { useEffect, useRef, useState } from 'react'
import style from './professionsQuest.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

type StaPerAttempt = {
  stamina: number
  staForSpecHeroType: number
  specHeroType: string
}

type Props = {
  isOpen: boolean
  toggleQuest: () => void
  questName: string
  questLevel: number
  questDes: string
  questBaseDuration: string
  questStaPerAttempt: StaPerAttempt
  questMinHeroRange: number
  questMaxHeroRange: number
  questHelp: string
}

export default function ProfessionsQuest(props: Props) {
  const {
    isOpen,
    toggleQuest,
    questName,
    questLevel,
    questDes,
    questBaseDuration,
    questStaPerAttempt,
    questMinHeroRange,
    questMaxHeroRange,
    questHelp,
  } = props

  const questHelpEl = useRef(null)

  const [isOpenQuestHelp, setIsOpenQuestHelp] = useState(false)

  const onToggleQuestHelp = (state = !isOpenQuestHelp) => {
    setIsOpenQuestHelp(state)
  }

  const capitalizeText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        questHelpEl.current &&
        !questHelpEl.current.contains(e.target) &&
        isOpenQuestHelp
      ) {
        onToggleQuestHelp(false)
      }
    }

    document.addEventListener('click', handleClickOutSide)

    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  }, [isOpenQuestHelp, questHelpEl])

  return (
    <>
      {isOpen && (
        <div
          className={`overlay ${style.questOverlay} ${isOpen && style.active}`}
        >
          <div className={style.questContainer}>
            <div className={style.questBg}>
              {/* Banner */}
              <div className={style.questBanner}>
                <div className={style.questHelpContainer}>
                  <button
                    className={`${style.questHelpBtn} click-cursor`}
                    onClick={() => onToggleQuestHelp()}
                  ></button>

                  {isOpenQuestHelp && (
                    <div ref={questHelpEl} className={style.questHelp}>
                      <p>
                        <p>
                          <strong>{capitalizeText(questName)} Quests </strong>
                          {questHelp}
                        </p>
                        <br />
                        <p>
                          The main Quest window displays the amount of Stamina
                          that each Hero will expend on this Quest. The total
                          number of attempts defaults to the highest possible
                          number based on the available Stamina of the selected
                          Heroes. It also displays the minimum time required to
                          complete the Quest, which increases as multiple Heroes
                          join the Quest together. The likelihood of an increase
                          to a Hero&lsquo;s {capitalizeText(questName)}{' '}
                          profession skill will reduce the more the hero&lsquo;s
                          profession skill level exceeds the quest level.
                        </p>
                      </p>
                    </div>
                  )}
                </div>
                <img src="/images/professions/quests/quest-ribbon.png" />
                <h2>{questName} Quests</h2>
                <button
                  className={`${style.closeQuestBtn} click-cursor`}
                  onClick={toggleQuest}
                ></button>
              </div>

              {/* Level */}
              <div className={style.questLevel}>
                <h3>Level {questLevel}</h3>
              </div>

              {/* Animate Image */}
              <div className={style.questAnimateImgWrap}>
                <img src="/images/professions/quests/questscroll-box-image.png" />
                <img
                  src={`/images/professions/quests/quest-${questName}.gif`}
                />
              </div>

              {/* Description  */}
              <div className={style.questDescriptionWrap}>
                <div className={style.questDescription}>
                  <div className={style.questDesContent}>
                    <h4>Description</h4>
                    <p>{questDes}</p>
                    <div className="questRequireStat">
                      <p>
                        <strong>Base duration:</strong>
                        <br />
                        {questBaseDuration}
                      </p>
                      <p>
                        <strong>Stamina per attempt:</strong>
                        <br />
                        {questStaPerAttempt.stamina} stamina (
                        {questStaPerAttempt.staForSpecHeroType} stamina for
                        Heros with{' '}
                        <strong>{questStaPerAttempt.specHeroType}</strong>)
                      </p>
                      <p>
                        <strong>Require hero range</strong>
                        <br />
                        Between {questMinHeroRange} and {questMaxHeroRange}{' '}
                        heroes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero select */}
              <Tabs className={style.questTabs}>
                <TabList>
                  <Tab className={`${style.questTab} click-cursor`}>
                    START QUESTS
                  </Tab>
                  <Tab isDisabled className={`${style.questTab} click-cursor`}>
                    ACTIVE QUESTS (0)
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel className={style.beginQuestPanel}>
                    <p>
                      Select {questMinHeroRange} to {questMaxHeroRange} Heroes
                    </p>
                    <div className={style.heroSelectBtnWrap}>
                      <button className="click-cursor">
                        <img
                          src="/images/professions/quests/quesstscroll-box-heroselect.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <div className={style.questBeginBtnWrap}>
                      <button className={`${style.questBeginBtn} click-cursor`}>
                        BEGIN QUEST
                      </button>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
