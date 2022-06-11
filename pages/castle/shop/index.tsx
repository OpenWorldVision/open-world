import { Button, Grid, GridItem } from '@chakra-ui/react'
import style from '@components/castle/shop/shop.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  mintProfessionNFT,
  fetchProfessionsNFTAmount,
  fetchProfessionsNFTPrices,
} from 'utils/professions'
import LoadingModal from '@components/LoadingModal'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

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
  const [isLoading, setIsLoading] = useState(false)
  const handleTxStateChange = useTransactionState()

  const mintProfessionsNFT = async (trait) => {
    const title = 'Purchase NFT card'
    setIsLoading(true)
    const data = await mintProfessionNFT(trait, (txHash) => {
      handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
    })
    if (data) {
      handleTxStateChange(title, data.transactionHash, data.status)
      await fetchNFTAmount()
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXCUTE)
    }
    setIsLoading(false)
  }

  const fetchNFTAmount = useCallback(async () => {
    const amount = await fetchProfessionsNFTAmount()
    setNftsAmount(amount)
  }, [nftsAmount])

  const fetchNFTPrices = useCallback(async () => {
    const prices = await fetchProfessionsNFTPrices()
    setNftsPrices(prices)
  }, [nftsPrices])

  const initialize = async () => {
    setIsLoading(true)
    await fetchNFTAmount()
    await fetchNFTPrices()
    setIsLoading(false)
  }

  useEffect(() => {
    initialize()
    setFetchPricesInterval(
      setInterval(() => {
        fetchNFTPrices()
      }, 5000)
    )
    setFetchAmountInterval(
      setInterval(() => {
        fetchNFTAmount()
      }, 5000)
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

      {/* Loading modal */}
      {isLoading && <LoadingModal />}

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
            <span className={style.shopSupply}>
              SUPPLY LEFT: {nftsAmount.openianAmount}
            </span>
            <div className={style.buyBtnWrap}>
              <Button
                className={style.buyBtn}
                onClick={() => mintProfessionsNFT(1)}
              >
                <span>{nftsPrices.openianPrice} OPEN</span>
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
            <span className={style.shopSupply}>
              SUPPLY LEFT: {nftsAmount.supplierAmount}
            </span>
            <div className={style.buyBtnWrap}>
              <Button
                className={style.buyBtn}
                onClick={() => mintProfessionsNFT(2)}
              >
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
            <span className={style.shopSupply}>
              SUPPLY LEFT: {nftsAmount.blacksmithAmount}
            </span>
            <div className={style.buyBtnWrap}>
              <Button
                className={style.buyBtn}
                onClick={() => mintProfessionsNFT(3)}
              >
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
