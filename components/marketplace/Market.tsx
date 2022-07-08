import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import styles from './market.module.css'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import NavItem from './NavItem'
import Item from './Item'
import { Box, Center, Image, Spinner, Stack, Text } from '@chakra-ui/react'
import {
  cancelListingItem,
  getListingIDs,
  purchaseHero,
} from 'utils/HeroMarketUtils'

const numOfPage = 12

const TRAIT_NAME = ['OPENIAN NFT', 'SUPPLIER NFT', 'BLACKSMITH NFT']

function Market() {
  const [page, setPage] = useState(1)
  const [nav, setNav] = useState(0)
  const [dataInit, setDataInit] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const handleTxStateChange = useTransactionState()
  const [popup, setPopup] = useState(null)

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    setLoading(true)
    const result = await getListingIDs(false, true)
    const dataResult = []
    for (const i of result) if (i.trait !== 4) dataResult.push(i)
    if (result.length) {
      setDataInit(dataResult)
      setData(dataResult)
    }
    setLoading(false)
  }

  const handlePurchase = async (value) => {
    const title = 'Purchase item'
    const result = await purchaseHero(
      parseInt(value?.id),
      (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, setPopup)
      },
      async (_) => {
        setData(dataInit)
      }
    )
    if (result) {
      await getItems()
      handleTxStateChange(title, result.transactionHash, result.status, setPopup)
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, setPopup)
    }
  }

  const handleCancel = async (value) => {
    const title = 'Cancel listing item'
    const result = await cancelListingItem(value?.id, (txHash) => {
      handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, setPopup)
    })
    if (result) {
      await getItems()
      handleTxStateChange(title, result.transactionHash, result.status, setPopup)
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, setPopup)
    }
  }

  const handleChangeTab = useCallback(
    (nav: number) => {
      setNav(nav)
      setPage(1)
      if (nav === 0) {
        if (!dataInit.length) {
          setData([])
        } else {
          setData(dataInit)
        }
      } else if (nav === 4) {
        const result = dataInit.filter((value) => value.isOwner)
        if (!result.length) {
          setData([])
        } else {
          setData(result)
        }
      } else {
        const result = dataInit.filter((value) => {
          return value.trait === nav && !value.isOwner
        })
        if (!result.length) {
          setData([])
        } else {
          setData(result)
        }
      }
    },
    [dataInit]
  )

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.nav1}>
          <NavItem
            index={0}
            onClick={handleChangeTab}
            label="ALL"
            selected={nav === 0}
          />
          {/* <NavItem
            index={1}
            onClick={handleChangeTab}
            label="OPENIAN"
            selected={nav === 1}
          />
          <NavItem
            index={2}
            onClick={handleChangeTab}
            label="SUPPLIER"
            selected={nav === 2}
          />
          <NavItem
            index={3}
            onClick={handleChangeTab}
            label="BLACKSMITH"
            selected={nav === 3}
          /> */}
          <NavItem
            index={4}
            onClick={handleChangeTab}
            label=" MY LISTING"
            selected={nav === 4}
          />
        </div>
      </div>
      <Box bgColor="#3F4F5F" m="8px 22px" borderRadius={10} p="0 16px">
        <Stack
          overflow="scroll"
          height="76vh"
          spacing={2}
          p="0 16px"
          bgColor="#C8BB98"
          align="center"
        >
          <Box zIndex={1}>
            <Box
              p="10px 18px"
              bgColor="#CFB183"
              borderRadius={10}
              m="16px 48px"
            >
              <Text fontWeight="bold" fontSize="16px" color="black">
                Selling NFT
              </Text>
            </Box>
            <Image
              src="/images/marketplace/header.webp"
              alt="header"
              position="absolute"
              top={58}
              mr="auto"
              ml="auto"
              left={0}
              right={0}
              zIndex={-1}
              w={`${210 * 0.6}px`}
              h={`${160 * 0.6}px`}
            />
          </Box>

          {loading && <Spinner />}
          {data.length === 0 && (
            <Center className={styles.loading}>No results found</Center>
          )}

          {data
            .slice((page - 1) * numOfPage, (page - 1) * numOfPage + numOfPage)
            .map((value, index) => (
              <Item
                onBuy={() => {
                  if (nav === 4) {
                    handleCancel(value)
                    return
                  }

                  handlePurchase(value)
                }}
                name={`${TRAIT_NAME[value.trait - 1]} #${value.id}`}
                price={value.price}
                seller={value.seller}
                available={1}
                imageUrl={`/images/marketplace/items/${value.trait}.webp`}
                key={`${value.id}${index}`}
                actionLabel={nav !== 4 ? 'buy' : 'cancel'}
              />
            ))}
        </Stack>
      </Box>

      <div className={styles.footer}>
        <div className={styles.pagination}>
          <img
            onClick={() => {
              setPage((pagePrev) => (pagePrev > 1 ? pagePrev - 1 : pagePrev))
            }}
            src="./images/marketplace/triangle-left.webp"
            alt="img"
            className="click-cursor"
          />
          <div>{page < 10 ? `0${page}` : page}</div>
          <img
            onClick={() => {
              setPage((pagePrev) =>
                pagePrev < Math.ceil(data.length / numOfPage)
                  ? pagePrev + 1
                  : pagePrev
              )
            }}
            src="./images/marketplace/triangle-right.webp"
            alt="img"
            className="click-cursor"
          />
        </div>
      </div>
      <Link href="/">
        <a className={styles.back}>
          <img src="./images/marketplace/back.webp" alt="img" />
        </a>
      </Link>
      {popup}
    </div>
  )
}

export default Market
