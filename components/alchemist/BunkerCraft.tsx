import { Grid, GridItem } from '@chakra-ui/react'
import style from './BunkerCraftStyle.module.css'
// import styled from '@emotion/styled';

export default function BunkerCraft(props) {
  return (
    <>
      <div className={style.bunkerCraftGold}>
        <div className={`${style.currentGold}`}></div>
      </div>
      <div>
        <Grid
          templateColumns={{
            base: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
            lg: 'repeat(6, 1fr)',
          }}
          gap={3}
        >
          {/* <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>

          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div>
          <div style={{width: '70px', height: '80px', backgroundColor: 'red'}}></div> */}

          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
          <GridItem
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={`${style.currentGold} ${style.sizeBackgroundItem}`}
            ></div>
          </GridItem>
        </Grid>
      </div>
    </>
  )
}
