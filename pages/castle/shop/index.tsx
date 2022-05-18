import { Button, Grid, GridItem } from '@chakra-ui/react'
import style from '@components/castle/shop/shop.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  mintProfessionNFT,
  fetchProfessionsNFTAmount }
from 'utils/professions'
import { useDispatch } from 'react-redux'
import { updateIsLoading } from 'reduxActions/isLoadingAction'

function Shop() {
  const [nftsAmount, setNftsAmount] = useState({
    openianAmount: 0,
    supplierAmount: 0,
    blacksmithAmount: 0,
  })
  const [fetchAmountInterval, setFetchAmountInterval] = useState(null)
  const dispatch = useDispatch()


  const mintProfessionsNFT = async (trait) => {
    dispatch(updateIsLoading({ isLoading: true }))
    await mintProfessionNFT(trait)
    await fetchNFTAmount()
    dispatch(updateIsLoading({ isLoading: false }))
  }

  const fetchNFTAmount = useCallback(async () => {
    const amount = await fetchProfessionsNFTAmount();
    setNftsAmount(amount);
  }, [nftsAmount])

  const initialize = async () => {
    await fetchNFTAmount()
    dispatch(updateIsLoading({ isLoading: false }))
  }

  useEffect(() => {
    dispatch(updateIsLoading({ isLoading: true }))
    initialize()
    setFetchAmountInterval(
      setInterval(() => {
        fetchNFTAmount()
      }, 10000)
    )

    return () => {
      clearInterval(fetchAmountInterval)
    }
  }, [])

  return (
    <div className={`${style.shopOverlay} overlay game-scroll-bar`}>
      <Head>
        <title>Shop</title>
      </Head>
      <div className={style.shopContainer}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            '2xl': 'repeat(3, 1fr)',
          }}
          gap={12}
        >
          <GridItem
            w={{
              '2xl': 347,
            }}
          >
            <div
              className={`${style.npcCard} ${style.openianNPC} click-cursor`}
            ></div>
            <span className={style.shopSupply}>SUPPLY LEFT: { nftsAmount.openianAmount }</span>
            <div className={style.buyBtnWrap}>
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(1)}>
                <span>100 OPEN</span>
              </Button>
            </div>
          </GridItem>
          <GridItem
            w={{
              '2xl': 347,
            }}
          >
            <div
              className={`${style.npcCard} ${style.supplierNPC} click-cursor`}
              onClick={() => mintProfessionsNFT(2)}
            ></div>
            <span className={style.shopSupply}>SUPPLY LEFT: { nftsAmount.supplierAmount }</span>
            <div className={style.buyBtnWrap}>
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(2)}>
                <span>100 OPEN</span>
              </Button>
            </div>
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: 2,
              '2xl': 1,
            }}
            w={{
              '2xl': 347,
            }}
          >
            <div
              className={`${style.npcCard} ${style.smithNPC} click-cursor`}
              onClick={() => mintProfessionsNFT(3)}
            ></div>
            <span className={style.shopSupply}>SUPPLY LEFT: { nftsAmount.blacksmithAmount }</span>
            <div className={style.buyBtnWrap}>
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(3)}>
                <span>100 OPEN</span>
              </Button>
            </div>
          </GridItem>
        </Grid>

        <div className={style.shopBoard}></div>

        <Link href="/castle">
          <a className={`${style.backBtn} click-cursor`}></a>
        </Link>
      </div>
    </div>
  )
}

export default Shop
