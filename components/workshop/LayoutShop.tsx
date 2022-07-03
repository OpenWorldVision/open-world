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

import BuyerBoard from '@components/workshop/BuyerBoard'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faSackXmark, faFilter, faFish, faHotdog, faGavel, faGem } from '@fortawesome/free-solid-svg-icons'
import ItemLayout from './ItemLayout'

type Props = {
  isPage: string
}

export default function LayoutShop(props: Props) {
  const { isPage } = props
  const [isItemBoard, setIsItemBoard] = useState<'ore' | 'hammer' | 'sushi' | 'fish' | 'mine'>(
    isPage === 'workshop' ? 'ore' : 'sushi'
  )
  const [listItemsBoard, setListItemsBoard] = useState([])
  const { isOpen: isOpenBuyBoard, onToggle: onToggleBuyerBoard } =
    useDisclosure()
  const [pageBoard, setPageBoard] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [sellingPage, setSellingPage] = useState(true)
  const inventoryRef = useRef<InventoryRef>()
  const handleTxStateChange = useTransactionState()

  const handleGetOreOrSushiList = async () => {
    const data = await getListingIDs(false)
    if (isPage === 'workshop') {
      setListItemsBoard(data.filter((listing) => listing.trait === 2))
    } else {
      setListItemsBoard(
        data.filter(
          (listing) => listing.trait === 4 && listing?.items?.length !== 0
        )
      )
    }

  }

  const handleGetHammerOrFishList = async () => {
    const data = await getListingIDs(false)
    if (isPage === 'workshop') {
      setListItemsBoard(data.filter((listing) => listing.trait === 3))
    } else {
      setListItemsBoard(
        data.filter(
          (listing) => listing.trait === 1 && listing?.items?.length !== 0
        )
      )
    }
  }

  const handleGetMyList = async () => {
    const data = await getListingIDs(true)
    if (isPage === 'workshop') {
      const myOreList = data?.filter(
        (item) => item?.trait === 2 || item?.trait === 3
      )
      setListItemsBoard(myOreList)
    } else {
      const myFoodCourtList = data?.filter(
        (item) => item?.trait === 1 || item?.trait === 4
      )
      setListItemsBoard(myFoodCourtList)
    }
  }


  useEffect(() => {
    handleGetOreOrSushiList()
  }, [])

  const handleSelectItemBoard = useCallback(
    (item) => () => {
      setIsItemBoard(item)
      if (item === 'ore' || item === 'sushi') {
        handleGetOreOrSushiList()
      } else if (item === 'hammer' || item === 'fish') {
        handleGetHammerOrFishList()
      } else {
        handleGetMyList()
      }
    },
    []
  )
  const handleCancelItem = useCallback(
    (item) => async () => {
      const title = isPage === 'workshop' ? `Cancel listing item in Workshop` : `Cancel listing item in Food Court`
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
    if (listItemsBoard.slice(pageBoard * 5).length !== 0) {
      setPageBoard(pageBoard + 1)
    }
  }, [listItemsBoard, pageBoard])

  const handlePreviousPage = useCallback(() => {
    if (pageBoard > 1) {
      setPageBoard(pageBoard - 1)
    }
  }, [pageBoard])

  const handleRefresh = useCallback(() => {
    setPageBoard(1)
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
      const title = isPage === 'workshop' ? `Purchase ${isItemBoard} in Workshop` : `Purchase ${isItemBoard} in Food Court`
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
        if (isItemBoard === 'ore' || isItemBoard === 'sushi') {
          handleGetOreOrSushiList()
        } else {
          handleGetHammerOrFishList()
        }
        return data
      } else {
        setIsLoading(false)
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
    },
    [isItemBoard]
  )

  const renderStyleSelectedItem = (itemName) => {
    if (isItemBoard === itemName) {
      return <div
        className={styles.itemBoardSelected}
      ></div>
    }
  }

  const addClassSelected = (itemName) => {
    if (isItemBoard === itemName) {
      return styles.selected
    }
  }

  return (
    <>
      {isLoading && <LoadingModal />}
      <Head>
        <title>{isPage === 'workshop' ? 'Workshop' : 'FoodCourt'}</title>
      </Head>
      <div className={styles.workShopContainer}>
        <div className={styles.workShopBg}>
          <div className={styles.workShopTitleContainer}>
            <div className={styles.navWorkShop}></div>
            {isPage === 'workshop' ? <div className={styles.workShopTitle}></div> :
              <div className={styles.foodCourtTitle}></div>}
            <div className={styles.navWorkShop}></div>
          </div>
          <div>
            <Button
              onClick={handleSelectItemBoard(isPage === 'workshop' ? 'ore' : 'sushi')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={isPage === 'workshop' ? styles.oreBtn : styles.sushiBtn}></div>
              {renderStyleSelectedItem(isPage === 'workshop' ? 'ore' : 'sushi')}
            </Button>
            <Button
              onClick={handleSelectItemBoard(isPage === 'workshop' ? 'hammer' : 'fish')}
              className={`click-cursor ${styles.foodBtn}`}
            >
              <div className={isPage === 'workshop' ? styles.hammerBtn : styles.fishBtn}></div>
              {renderStyleSelectedItem(isPage === 'workshop' ? 'hammer' : 'fish')}
            </Button>
            <Button
              className={`${styles.buyButtonCustom} click-cursor`}
              backgroundColor={'#52241E'}
              onClick={handleSelectItemBoard('mine')}
              _hover={{ bg: '#52241E' }}
            >
              <Text color={'#fff'}>{isPage === 'workshop' ? 'My Workshop' : 'My FoodCourt'}</Text>
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
                      {pageBoard < 10 && 0}
                      {pageBoard}
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
                    .slice((pageBoard - 1) * 5)
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
        {/* <LayoutShopMobile /> */}
        <div className={styles.backgroundLayout}>
          <div className={styles.nav}>
            <Button className={sellingPage && styles.selected}>
              {isPage === 'workshop'
                ? <><FontAwesomeIcon icon={faGavel} />Workshop</>
                : <><FontAwesomeIcon icon={faBowlFood} />Food Court</>}
            </Button>
            <Button><FontAwesomeIcon icon={faSackXmark} />My Stall</Button>
            <Button>Fill<FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faFilter} /></Button>
          </div>
          <div className={styles.body}>
            <div className={styles.container}>
              <div className={styles.containerTitle}>
                {
                  isPage === 'workshop'
                    ? <img src="/images/workshop/mobile/logo-head-workshop.png" alt="workshop-img" />
                    : <img src="/images/workshop/mobile/logo-head-foodcourt.png" alt="foodcourt-img" />
                }
                <div className={styles.containerTitleText}>Selling Items</div>
              </div>
              <div className={styles.containerTitleButtop}>
                <Button className={`${addClassSelected(isPage === 'workshop' ? 'ore' : 'sushi')}`} onClick={handleSelectItemBoard(isPage === 'workshop' ? 'ore' : 'sushi')}>{isPage === 'workshop' ? <FontAwesomeIcon icon={faGem} /> : <FontAwesomeIcon icon={faFish} />}</Button>
                <Button className={`${addClassSelected(isPage === 'workshop' ? 'hammer' : 'fish')}`} onClick={handleSelectItemBoard(isPage === 'workshop' ? 'hammer' : 'fish')}>{isPage === 'workshop' ? <FontAwesomeIcon icon={faGavel} /> : <FontAwesomeIcon icon={faHotdog} />}</Button>
              </div>
              <div className={styles.listItem}>
                {
                  listItemsBoard
                    .slice((pageBoard - 1) * 5)
                    .map((item, index) => {
                      if (index < 5) {
                        return (
                          <ItemLayout item={item} />
                        )
                      }
                    })

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
