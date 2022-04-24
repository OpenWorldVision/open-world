import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useCallback, useRef, useState } from 'react'
import style from '../../components/professions/professions.module.css'
import ProfessionsBtn from '../../components/professions/ProfessionsBtn'
import ProfessionsModal from './../../components/professions/ProfessionsModal'

const questsDummyData = [
  {
    name: 'foraging',
    level: 0,
    description:
      'This forest is full of ragweed, but sometimes I find more valuable plants. Would you like to join me?',
    baseDuration: '20 seconds',
    staPerAttempt: {
      stamina: 7,
      staForSpecHeroType: 5,
      specHeroType: 'foraging',
    },
    minHeroRange: 1,
    maxHeroRange: 6,
    help: 'may yield a variety of rewards including various plants, special items, experience toward the Foraging skill, and experience toward your Hero’s next level. Heroes with higher Foraging, Dexterity, and Intelligence scores tend to be more successful on Foraging Quests, and Heroes who have Foraging as their main skill expend a reduced amount of Stamina to complete the Quest.',
  },
  null,
  null,
  {
    name: 'fishing',
    level: 0,
    description:
      'Ready to dip your toes into fishing? A moment to learn, a lifetime to master, as they say. Give it a try!',
    baseDuration: '20 seconds',
    staPerAttempt: {
      stamina: 7,
      staForSpecHeroType: 5,
      specHeroType: 'fishing',
    },
    minHeroRange: 1,
    maxHeroRange: 6,
    help: 'may yield a variety of rewards including various fish, special items, experience toward the Fishing skill, and experience toward your Hero’s next level. Heroes with higher Fishing, Agility, and Luck scores tend to be more successful on Fishing Quests, and Heroes who have Fishing as their main skill expend a reduced amount of Stamina to complete the Quest.',
  },
]

export default function Professions() {
  const transformWrapper = useRef(null)

  const [isForagerOpen, setIsForagerOpen] = useState(false)
  const [isMinerOpen, setIsMinerOpen] = useState(false)
  const [isGardenerOpen, setIsGardenerOpen] = useState(false)
  const [isFisherOpen, setIsFisherOpen] = useState(false)
  const [isMysteriousSignOpen, setIsMysteriousSignOpen] = useState(false)

  const onToggleModal = useCallback((modalOrder, state) => {
    switch (modalOrder) {
      case 1:
        setIsForagerOpen(state)
        break
      case 2:
        setIsMinerOpen(state)
        break
      case 3:
        setIsGardenerOpen(state)
        break
      case 4:
        setIsFisherOpen(state)
        break
      case 5:
        setIsMysteriousSignOpen(state)
        break
    }
  }, [])

  return (
    <div className={`${style.professionsOverlay} overlay`}>
      <TransformWrapper
        ref={transformWrapper}
        maxScale={2}
        minScale={0.25}
        initialScale={0.8}
        centerZoomedOut={true}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        onZoomStop={() => {
          transformWrapper.current.centerView()
        }}
      >
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
          <div className={`${style.professionsContainer} overlay`}>
            <div className={style.professionsBg}>
              {/* fishing rods */}
              <div className={style.fishingRodWrap}>
                <div className={style.fishingRod}></div>
              </div>

              {/* pets */}
              <div className={style.petsWrap}>
                <div className={style.pets}></div>
              </div>
            </div>

            {/* pumpkins */}
            <div className={`${style.pumpkin} ${style.pumpkin1}`}></div>
            <div className={`${style.pumpkin} ${style.pumpkin2}`}></div>
            <div className={`${style.pumpkin} ${style.pumpkin3}`}></div>
            <div className={`${style.pumpkin} ${style.pumpkin4}`}></div>

            {/* Forager NPC */}
            <div
              className={`${style.npcBtn} ${style.foragerBtn} click-cursor`}
              onClick={() => onToggleModal(1, true)}
            >
              <ProfessionsBtn title="Forager" />
            </div>
            <div className={`${style.npcWrap}  ${style.npcForagerWrap}`}>
              <div className={`${style.npc} ${style.npcForager}`}></div>
            </div>

            {/* Druid NPC */}
            <div
              className={`${style.npcBtn} ${style.druidBtn} click-cursor`}
              onClick={() => onToggleModal(3, true)}
            >
              <ProfessionsBtn title="Gardener" />
            </div>
            <div className={`${style.npcWrap}  ${style.npcDruidWrap}`}>
              <div className={`${style.npc} ${style.npcDruid}`}></div>
            </div>

            {/* Fisher NPC */}
            <div
              className={`${style.npcBtn} ${style.fisherBtn} click-cursor`}
              onClick={() => onToggleModal(4, true)}
            >
              <ProfessionsBtn title="Fisher" />
            </div>
            <div className={`${style.npcWrap}  ${style.npcFisherWrap}`}>
              <div className={`${style.npc} ${style.npcFisher}`}></div>
            </div>

            {/* Miner NPC */}
            <div
              className={`${style.npcBtn} ${style.minerBtn} click-cursor`}
              onClick={() => onToggleModal(2, true)}
            >
              <ProfessionsBtn title="Miner" />
            </div>
            <div className={`${style.npcWrap}  ${style.npcMinerWrap}`}>
              <div className={`${style.npc} ${style.npcMiner}`}></div>
            </div>

            {/* Mysterious Sign */}
            <div
              className={`${style.npcBtn} ${style.mysteriousSignBtn} click-cursor`}
              onClick={() => onToggleModal(5, true)}
            ></div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      <ProfessionsModal
        isOpen={isForagerOpen}
        toggleModal={() => onToggleModal(1, false)}
        fancyTitle="Foraging Quests"
        height={264}
        width={700}
        questOrder={1}
        npcAvatar="forager"
        npcDialogue={
          <p>
            Many useful plants out in the wild hide themselves from the
            untrained eye. Do you have the knack for finding the medicinal
            ones…or the deadly ones? Both have their uses…
          </p>
        }
        npcName="Woodsman Aurum"
        questDummyData={questsDummyData[0]}
      />

      <ProfessionsModal
        isOpen={isMinerOpen}
        toggleModal={() => onToggleModal(2, false)}
        fancyTitle="Mining Quests"
        height={264}
        width={700}
        questOrder={2}
        disabled={true}
        npcAvatar="miner"
        npcDialogue={
          <p>
            The tunnels run deep in Hollowberry Mines. Careful you mind your
            path or you&apos;ll be lost in the dark for good.
          </p>
        }
        npcName="Quarrysmith Gren"
        questDummyData={questsDummyData[1]}
      />

      <ProfessionsModal
        isOpen={isGardenerOpen}
        toggleModal={() => onToggleModal(3, false)}
        fancyTitle="Gardening Quests"
        height={264}
        width={700}
        disabled={true}
        questOrder={3}
        npcAvatar="gardener"
        npcDialogue={
          <p>
            You have gained trust among some of the druids, I have heard. I will
            show you to some of our special gardens. Let&apos;s go see
            what&apos;s in season and ripe for the picking.
          </p>
        }
        npcName="Druid Lam"
        questDummyData={questsDummyData[2]}
      />

      <ProfessionsModal
        isOpen={isFisherOpen}
        toggleModal={() => onToggleModal(4, false)}
        fancyTitle="Fishing Quests"
        height={264}
        width={700}
        questOrder={4}
        npcAvatar="fisher"
        npcDialogue={
          <p>
            Have a sit. Got some drinks here if you want. It&apos;s a fine day
            for some company—besides the fish that is. They&apos;re always
            biting at this spot.
          </p>
        }
        npcName="Fisher Tom"
        questDummyData={questsDummyData[3]}
      />

      <ProfessionsModal
        isOpen={isMysteriousSignOpen}
        toggleModal={() => onToggleModal(5, false)}
        height={264}
        width={700}
        npcDialogue={
          <p>
            There&apos;s something out there -- beyond the mist...
            <br />
            <br />
            Can you hear it whispering?
          </p>
        }
        npcName="Mysterious Sign"
      />
    </div>
  )
}
