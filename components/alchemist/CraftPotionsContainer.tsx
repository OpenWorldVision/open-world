import style from './CraftPotionsContainerStyle.module.css'

import BunkerCraft from './BunkerCraft'
import CraftPotions from './CraftPosition'

type Props = {
  isOpen: boolean
  toggleLandAuction: () => void
}

export default function CraftPotionsContainer(props: Props) {
  const { isOpen, toggleLandAuction } = props

  return (
    <>
      <div
        className={`${style.landAuction} ${style.overlayCraftPotion} ${
          isOpen ? style.active : ''
        }`}
      >
        <div className={style.scrollContainer}>
          <div className={style.modalContent}>
            <div className={style.sizeBgContent}>
              <div className={`${style.filterExpanded} game-border basic`}>
                <BunkerCraft />
              </div>
            </div>
            <div className={style.sizeBgContent}>
              <div className={`${style.landViewContainer} game-border fancy`}>
                <div
                  className="close-btn click-cursor"
                  onClick={toggleLandAuction}
                ></div>
                <CraftPotions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
