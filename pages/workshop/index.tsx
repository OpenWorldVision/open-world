import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import styles from '@components/workshop/workshop.module.css'

import BuyerBoard from '@components/foodcourt/BuyerBoard'
import Head from 'next/head'
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  cancelListingItem,
  getListingIDs,
  purchaseItems,
} from 'utils/NFTMarket'
import BackButton from '@components/BackButton'
import LoadingModal from '@components/LoadingModal'
import Link from 'next/link'
import Inventory, { InventoryRef } from '@components/professions/Inventory'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

export default function WorkShop() {
  const [isItemBoard, setIsItemBoard] = useState<'ore' | 'hammer' | 'mine'>(
    'ore'
  )
  const [listItemsBoard, setListItemsBoard] = useState([])
  const { isOpen: isOpenBuyBoard, onToggle: onToggleBuyerBoard } =
    useDisclosure()
  const [pageWorkShop, setPageWorkShop] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const inventoryRef = useRef<InventoryRef>()
  const handleTxStateChange = useTransactionState()

  const handleGetHammerList = async () => {
    const data = await getListingIDs(false)
    setListItemsBoard(data.filter((listing) => listing.trait === 3))
  }

  const handleGetOreList = async () => {
    const data = await getListingIDs(false)
    setListItemsBoard(data.filter((listing) => listing.trait === 2))
  }

  const handleGetMyList = async () => {
    const data = await getListingIDs(true)
    const myOreList = data?.filter(
      (item) => item?.trait === 2 || item?.trait === 3
    )
    setListItemsBoard(myOreList)
  }

  useEffect(() => {
    handleGetOreList()
  }, [])

  const handleSelectItemBoard = useCallback(
    (item) => () => {
      setIsItemBoard(item)
      if (item === 'ore') {
        handleGetOreList()
      } else if (item === 'hammer') {
        handleGetHammerList()
      } else {
        handleGetMyList()
      }
    },
    []
  )
  const handleCancelItem = useCallback(
    (item) => async () => {
      const title = `Cancel listing item in Workshop`
      const data = await cancelListingItem(item?.id, (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
      })
      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status)
        handleGetMyList()
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
    },
    []
  )

  const handleIncreasePage = useCallback(() => {
    if (listItemsBoard.slice(pageWorkShop * 5).length !== 0) {
      setPageWorkShop(pageWorkShop + 1)
    }
  }, [listItemsBoard, pageWorkShop])

  const handlePreviousPage = useCallback(() => {
    if (pageWorkShop > 1) {
      setPageWorkShop(pageWorkShop - 1)
    }
  }, [pageWorkShop])

  const handleRefresh = useCallback(() => {
    setPageWorkShop(1)
  }, [])

  const handleBuyItem = useCallback(
    (item) => () => {
      setBuyDetail(item)
      onToggleBuyerBoard()
    },
    [onToggleBuyerBoard]
  )

  const _handlePurchaseItem = useCallback(
    async (id: number, listIds: Array<number>) => {
      const title = `Purchase ${isItemBoard} in Workshop`
      setIsLoading(true)
      const data = await purchaseItems(
        id,
        listIds,
        (txHash) => {
          handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
        },
        (error) => {
          handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
          setIsLoading(false)
        }
      )
      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status)
        setIsLoading(false)
        if (isItemBoard === 'ore') {
          handleGetOreList()
        } else {
          handleGetHammerList()
        }
        return data
      } else {
        setIsLoading(false)
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
    },
    [isItemBoard]
  )

  return (
    <>
      {isLoading && <LoadingModal />}
      <Head>
        <title>Workshop</title>
      </Head>
      <div className={styles.workShopContainer}>
        <div className={styles.workShopBg}>
          <div className={styles.workShopTitleContainer}>
            <div className={styles.navWorkShop}></div>
            <div className={styles.workShopTitle}></div>
            <div className={styles.navWorkShop}></div>
          </div>
          <div>
            <Button
              onClick={handleSelectItemBoard('ore')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={styles.oreBtn}></div>
              <div
                className={`${
                  isItemBoard === 'ore' && styles.itemBoardSelected
                }`}
              ></div>
            </Button>
            <Button
              onClick={handleSelectItemBoard('hammer')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={styles.hammerBtn}></div>
              <div
                className={`${
                  isItemBoard === 'hammer' && styles.itemBoardSelected
                }`}
              ></div>
            </Button>
            <Button
              className={`${styles.buyButtonCustom} click-cursor`}
              backgroundColor={'#52241E'}
              onClick={handleSelectItemBoard('mine')}
              _hover={{ bg: '#52241E' }}
            >
              <Text color={'#fff'}>My Workshop</Text>
            </Button>
          </div>
          <div className={styles.workShopBoard}>
            <TableContainer className={styles.table}>
              <Table size="sm" variant="strunstylediped">
                <TableCaption className={styles.paginationContainer}>
                  <div className={styles.pagination}>
                    <div
                      onClick={handlePreviousPage}
                      className={`${styles.increase} click-cursor`}
                    ></div>
                    <div className={styles.numberPage}>
                      {pageWorkShop < 10 && 0}
                      {pageWorkShop}
                    </div>
                    <div
                      onClick={handleIncreasePage}
                      className={`${styles.previous} click-cursor`}
                    ></div>
                  </div>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>
                      <div className={styles.columnTitle}>SELLER</div>
                    </Th>
                    <Th>
                      <div className={styles.columnTitle}>PRICE</div>
                    </Th>
                    <Th>
                      <div className={styles.columnTitle}>AVAILABLE</div>
                    </Th>
                    <Th sx={{ textAlign: 'center' }}>
                      <Button
                        onClick={handleRefresh}
                        className={`${styles.refreshBtn} click-cursor`}
                      ></Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listItemsBoard
                    .slice((pageWorkShop - 1) * 5)
                    .map((item, index) => {
                      if (index < 5) {
                        return (
                          <>
                            <Tr key={index}>
                              <Td>
                                <div className={styles.columnItem}>
                                  {item.seller}
                                </div>
                              </Td>
                              <Td>
                                <div className={styles.columnItem}>
                                  {item.price} OPEN
                                </div>
                              </Td>
                              <Td>
                                <div className={styles.columnItem}>
                                  {item.items?.length}
                                </div>
                              </Td>
                              <Td sx={{ textAlign: 'center' }}>
                                {isItemBoard === 'mine' ? (
                                  <Button
                                    backgroundColor={'#1e4882'}
                                    onClick={handleCancelItem(item)}
                                    className={`${styles.customButton} click-cursor`}
                                    _hover={{ bg: '#52241E' }}
                                  >
                                    <Text color={'#fff'}>Cancel</Text>
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={handleBuyItem(item)}
                                    className={`${styles.buyBtnItem} click-cursor`}
                                  ></Button>
                                )}
                              </Td>
                            </Tr>
                          </>
                        )
                      }
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <BuyerBoard
            isOpen={isOpenBuyBoard}
            toggleModalBuyModal={onToggleBuyerBoard}
            buyDetail={buyDetail}
            handlePurchaseItem={_handlePurchaseItem}
          />
          <Link href="/">
            <a className={`${styles.backBtn} click-cursor`}></a>
          </Link>

          <Inventory ref={inventoryRef} />

          <BackButton />
        </div>
      </div>
    </>
  )
}
