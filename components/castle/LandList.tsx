import { useState, useEffect } from 'react'
import style from './landList.module.css'
import LandItem from './LandItem'
import { Grid, GridItem } from '@chakra-ui/react'

type Owner = {
  name: string
  walletAddress: string
}

type Land = {
  id: number
  name: string
  region: number
  status: number
  level: number
  price: number
  owner: Owner
}

type Props = {
  action: number
  lands: Array<Land>
}

export default function LandList(props: Props) {
  const { action, lands } = props

  return (
    <>
      {lands.length ? (
        <Grid
          className={`${style.landList} game-scroll-bar`}
          templateColumns={{
            base: 'repeat(4, 1fr)',
            md: 'repeat(3, 1fr)',
            '2xl': 'repeat(4, 1fr)',
          }}
          gap={2}
        >
          {lands.map((land, index) => (
            <GridItem
              colSpan={{
                base: 4,
                sm: 2,
                md: 3,
                xl: 1,
              }}
              key={index}
            >
              <LandItem land={land} action={action} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <div className={style.landListEmpty}>
          <p>No lands available in this category.</p>
        </div>
      )}
    </>
  )
}
