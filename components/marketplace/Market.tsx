import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import styles from './market.module.css'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import NavItem from './NavItem'
import Item from './Item'
import { Center, Spinner, Stack } from '@chakra-ui/react'
import {
  cancelListingItem,
  getListingIDs,
  purchaseHero,
} from 'utils/HeroMarketUtils'

const numOfPage = 12

function Market() {
  const [page, setPage] = useState(1)
  const [nav, setNav] = useState(0)
  const [dataInit, setDataInit] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const handleTxStateChange = useTransactionState()

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
    setData([])

    const result = await purchaseHero(
      parseInt(value?.id),
      (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
      },
      async (error) => {
        setData(dataInit)
      }
    )
    if (result) {
      setDataInit([])
      await getItems()
      handleTxStateChange(title, result.transactionHash, result.status)
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
    }
  }

  const handleCancel = async (value) => {
    const title = 'Cancel listing item'
    const result = await cancelListingItem(value?.id, (txHash) => {
      handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
    })
    if (result) {
      setData([])
      await getItems()
      handleTxStateChange(title, result.transactionHash, result.status)
    } else {
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
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

      <Stack overflow="scroll" height="80vh" spacing={2} p="0 22px">
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
              name={`#${value.id}`}
              price={value.price}
              available={1}
              imageUrl={`/images/marketplace/items/${value.trait}.webp`}
              key={`${value.id}${index}`}
              actionLabel={nav !== 4 ? 'buy' : 'cancel'}
            />
          ))}
      </Stack>

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
    </div>
  )
}

export default Market
