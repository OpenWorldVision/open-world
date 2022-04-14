import { PropsWithChildren, useState } from 'react'
import style from './alchemistModalStyle.module.css'
import CraftPotionsContainer from './craftPotionsContainer'

type Props = {
  isOpen: boolean
  width: number
  height?: number
  npcName?: string
  npcDialogue?: string
  zIndex?: number
  fancyTitle?: string
  title?: string
  toggleModal: () => void
}

export default function AlchemistModal(props: PropsWithChildren<Props>) {
  const {
    isOpen,
    width,
    height,
    npcName,
    npcDialogue,
    zIndex,
    fancyTitle,
    title,
    toggleModal,
    children,
  } = props

  const [isLandAuctionOpen, setIsLandAuctionOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <div
          className={`${style.overlayAlchemist} ${style.modalOverlay} ${
            isOpen && style.active
          }`}
        >
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

            <div className={style.modalBody}>{children}</div>
            <div
              onClick={() => {
                setIsLandAuctionOpen(true)
              }}
              className={`${style.btnCraftingContainer}`}
            >
              <div className={`click-cursor ${style.crafting}`}>
                <span>Start Crafting</span>
              </div>
            </div>
          </div>

          {npcDialogue && (
            <div
              className={style.npcDialogue}
              style={{
                width: width + 'px',
              }}
            >
              <h4 className={style.npcName}>
                <span>{npcName}</span>
              </h4>
              <p>{npcDialogue}</p>
            </div>
          )}
          <CraftPotionsContainer
            isOpen={isLandAuctionOpen}
            toggleLandAuction={() => setIsLandAuctionOpen(false)}
          />
        </div>
      )}
    </>
  )
}
