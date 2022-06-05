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
} from '@chakra-ui/react'
import styles from '@components/foodcourt/foodcourt.module.css'

import BuyerBoard from '@components/foodcourt/BuyerBoard'
import { useCallback, useEffect, useState } from 'react'
import {
  cancelListingItem,
  getListingIDs,
  purchaseItems,
} from 'utils/NFTMarket'
import LoadingModal from '@components/LoadingModal'
import BackButton from '@components/BackButton'

export default function FoodCourt() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isItemBoard, setIsItemBoard] = useState<'sushi' | 'fish' | 'mine'>(
    'sushi'
  )
  const [listItemsBoard, setListItemsBoard] = useState([])
  const [isOpenBuyBoard, setIsOpenBuyBoard] = useState(false)
  const [pageFoodCourt, setPageFoodCourt] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleGetSushiList = async () => {
    const data = await getListingIDs(false)
    setListItemsBoard(
      data.filter(
        (listing) => listing.trait === '4' && listing?.items?.length !== 0
      )
    )
  }

  const handleGetFishList = async () => {
    const data = await getListingIDs(false)
    setListItemsBoard(
      data.filter(
        (listing) => listing.trait === '1' && listing?.items?.length !== 0
      )
    )
  }

  const handleGetMyList = async () => {
    const data = await getListingIDs(true)
    const myFoodCourtList = data?.filter(
      (item) => item?.trait === '1' || item?.trait === '4'
    )
    setListItemsBoard(myFoodCourtList)
  }

  useEffect(() => {
    handleGetSushiList()
  }, [])

  const toggleBuyModal = useCallback(() => {
    setIsOpenBuyBoard((prev) => !prev)
  }, [])

  const handleSelectItemBoard = useCallback(
    (item) => () => {
      setIsItemBoard(item)
      if (item === 'sushi') {
        handleGetSushiList()
      } else if (item === 'fish') {
        handleGetFishList()
      } else {
        handleGetMyList()
      }
    },
    []
  )

  const handleIncreasePage = useCallback(() => {
    setPageFoodCourt((prevPageFoodCourt) => {
      if (listItemsBoard.slice(prevPageFoodCourt * 5).length !== 0) {
        return prevPageFoodCourt + 1
      }
      return prevPageFoodCourt
    })
  }, [listItemsBoard])

  const handlePreviousPage = useCallback(() => {
    setPageFoodCourt((prevPageFoodCourt) =>
      prevPageFoodCourt > 1 ? prevPageFoodCourt - 1 : prevPageFoodCourt
    )
  }, [])

  const handleRefresh = useCallback(() => {
    setPageFoodCourt(1)
  }, [])

  const handleBuyItem = useCallback(
    (item) => () => {
      setBuyDetail(item)
      toggleBuyModal()
    },
    [toggleBuyModal]
  )

  const handleCancelItem = useCallback(
    (item) => async () => {
      setIsLoading(true)
      const data = await cancelListingItem(item?.id)
      setIsLoading(false)
      if (data) {
        handleGetMyList()
      }
    },
    []
  )

  const _handlePurchaseItem = useCallback(
    async (id: number, listIds: Array<number>) => {
      setIsLoading(true)
      const data = await purchaseItems(id, listIds)
      if (data) {
        setIsLoading(false)
        if (isItemBoard === 'sushi') {
          handleGetSushiList()
        } else {
          handleGetFishList()
        }
        return data
      }
    },
    [isItemBoard]
  )

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    checkWindowWidth()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className={styles.foodCourtContainer}>
        <div className={styles.foodCourtBg}>
          <div className={styles.foodCourtTitleContainer}>
            <div className={styles.navFoodCourt}></div>
            <div className={styles.foodCourtTitle}></div>
            <div className={styles.navFoodCourt}></div>
          </div>
          <div>
            <Button
              onClick={handleSelectItemBoard('sushi')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={styles.sushiBtn}></div>
              <div
                className={`${
                  isItemBoard === 'sushi' && styles.itemBoardSelected
                }`}
              ></div>
            </Button>
            <Button
              onClick={handleSelectItemBoard('fish')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={styles.fishBtn}></div>
              <div
                className={`${
                  isItemBoard === 'fish' && styles.itemBoardSelected
                }`}
              ></div>
            </Button>
            <Button
              className={`${styles.buyButtonCustom} click-cursor`}
              backgroundColor={'#52241E'}
              onClick={handleSelectItemBoard('mine')}
              _hover={{ bg: '#52241E' }}
            >
              <Text color={'#fff'}>My FoodCourt</Text>
            </Button>
          </div>
          <div className={styles.foodCourtBoard}>
            <TableContainer className={styles.table}>
              <Table size="sm" variant="strunstylediped">
                <TableCaption className={styles.paginationContainer}>
                  <div className={styles.pagination}>
                    <div
                      onClick={handlePreviousPage}
                      className={`${styles.increase} click-cursor`}
                    ></div>
                    <div className={styles.numberPage}>
                      {pageFoodCourt < 10 && 0}
                      {pageFoodCourt}
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
                    .slice((pageFoodCourt - 1) * 5)
                    .map((item, index) => {
                      if (index < 5) {
                        return (
                          <>
                            <Tr>
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
                                    backgroundColor={'#DD8600'}
                                    onClick={handleCancelItem(item)}
                                    className={`${styles.customButton} click-cursor`}
                                    _hover={{ bg: '#DD8600' }}
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
            toggleModalBuyModal={toggleBuyModal}
            buyDetail={buyDetail}
            handlePurchaseItem={_handlePurchaseItem}
          />
          <BackButton />
        </div>
      </div>
    </>
  )
}
