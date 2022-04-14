import style from './CraftPotionsContainerStyle.module.css'
import { useEffect, useState, useCallback } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

import BunkerCraft from './BunkerCraft'
import CraftPotions from './CraftPosition'

type Props = {
  // action: number,
  isOpen: boolean
  toggleLandAuction: () => void
}

export default function CraftPotionsContainer(props: Props) {
  const {
    // action,
    isOpen,
    toggleLandAuction,
  } = props

  return (
    // <Grid
    //   className={`${style.landAuction} overlay ${isOpen ? style.active : ''}`}
    //   templateColumns={{ 'base': 'repeat(2, 1fr)', 'md': 'repeat(12, 1fr)' }}
    //   gap={{ 'base': 0, 'md': 10 }}
    // >
    //   <GridItem
    //     colStart={{ 'xl': 3, '2xl': 3 }}
    //     colSpan={{ 'base': 2,'md': 6, 'xl': 4, '2xl': 4 }}
    //     h="fit-content"
    //     m="auto 0"
    //   >
    //     <div className={`${style.filterExpanded} game-border basic`}>
    //       <BunkerCraft />
    //     </div>
    //   </GridItem>

    //   <GridItem colStart={{ 'xl': 7, '2xl': 7 }} colSpan={{ 'base': 2, 'md': 6, 'xl': 4, '2xl': 4 }} h="fit-content" m="auto 0">
    // <div className={`${style.landViewContainer} game-border fancy`}>
    //   <div
    //     className="close-btn click-cursor"
    //     onClick={toggleLandAuction}
    //   ></div>

    // </div>
    //   </GridItem>
    // </Grid>
    <>
      <div
        className={`${style.landAuction} ${style.overlayCraftPotion} ${
          isOpen ? style.active : ''
        }`}
      >
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
    </>
  )
}
