import style from './craftPotionsStyle.module.css'
import { useEffect, useState, useCallback } from 'react';
import { Grid, GridItem } from '@chakra-ui/react'

type Props = {
  // action: number,
  isOpen: boolean,
  toggleLandAuction: () => void,
}

export default function CraftPotions(props: Props) {
  const {
    // action,
    isOpen,
    toggleLandAuction
  } = props;

  return (
    <Grid
      className={`${style.landAuction} overlay ${isOpen ? style.active : ''}`}
      templateColumns={{ 'base': 'repeat(2, 1fr)', 'md': 'repeat(6, 1fr)' }}
      gap={{ 'base': 0, 'md': 5 }}
    >
      <GridItem
        colStart={{ 'xl': 2 }}
        colSpan={{ 'base': 2, 'md': 3, 'xl': 2 }}
        h="fit-content"
      >
        <div className={`${style.filterExpanded} game-border basic`}>

        </div>
      </GridItem>

      <GridItem colStart={{ 'xl': 4 }} colSpan={{ 'base': 2, 'md': 3, 'xl': 2 }} minH="100%" >
        <div className={`${style.landViewContainer} game-border fancy`}>
          <div
            className="close-btn click-cursor"
            onClick={toggleLandAuction}
          ></div>
        </div>
      </GridItem>
    </Grid>
  )
}