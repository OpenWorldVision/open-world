import { Button, Grid, GridItem } from '@chakra-ui/react'
import style from '@components/castle/shop/shop.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  mintProfessionNFT,
  fetchProfessionsNFTAmount,
  fetchProfessionsNFTPrices
 }
from 'utils/professions'
import { useDispatch } from 'react-redux'
import { updateIsLoading } from 'reduxActions/isLoadingAction'

function Shop() {
  const [nftsAmount, setNftsAmount] = useState({
    openianAmount: 0,
    supplierAmount: 0,
    blacksmithAmount: 0,
  })
  const [nftsPrices, setNftsPrices] = useState({
    openianPrice: '0',
    supplierPrice: '0',
    blacksmithPrice: '0',
  })
  const [fetchAmountInterval, setFetchAmountInterval] = useState(null)
  const [fetchPricesInterval, setFetchPricesInterval] = useState(null)
  const dispatch = useDispatch()


  const mintProfessionsNFT = async (trait, price) => {
    dispatch(updateIsLoading({ isLoading: true }))
    await mintProfessionNFT(trait, price)
    await fetchNFTAmount()
    dispatch(updateIsLoading({ isLoading: false }))
  }

  const fetchNFTAmount = useCallback(async () => {
    const amount = await fetchProfessionsNFTAmount();
    setNftsAmount(amount);
  }, [nftsAmount])

  const fetchNFTPrices = useCallback(async () => {
    const prices = await fetchProfessionsNFTPrices();
    setNftsPrices(prices);
  }, [nftsPrices])

  const initialize = async () => {
    await fetchNFTAmount()
    await fetchNFTPrices()
    dispatch(updateIsLoading({ isLoading: false }))
  }

  useEffect(() => {
    dispatch(updateIsLoading({ isLoading: true }))
    initialize()
    setFetchPricesInterval(
      setInterval(() => {
        fetchNFTPrices()
      }, 5000)
    )
    setFetchAmountInterval(
      setInterval(() => {
        fetchNFTAmount()
      }, 10000)
    )

    return () => {
      clearInterval(fetchAmountInterval)
      clearInterval(fetchPricesInterval)
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
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(1, parseInt(nftsPrices.openianPrice))}>
                <span>{ nftsPrices.openianPrice } OPEN</span>
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
            ></div>
            <span className={style.shopSupply}>SUPPLY LEFT: { nftsAmount.supplierAmount }</span>
            <div className={style.buyBtnWrap}>
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(2, parseInt(nftsPrices.supplierPrice))}>
                <span>{nftsPrices.supplierPrice} OPEN</span>
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
            ></div>
            <span className={style.shopSupply}>SUPPLY LEFT: { nftsAmount.blacksmithAmount }</span>
            <div className={style.buyBtnWrap}>
              <Button className={style.buyBtn} onClick={() => mintProfessionsNFT(3, parseInt(nftsPrices.blacksmithPrice))}>
                <span>{nftsPrices.blacksmithPrice} OPEN</span>
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
