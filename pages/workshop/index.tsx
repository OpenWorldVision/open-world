import { Button, Link, styled, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import styles from '@components/workshop/workshop.module.css'

import { useCallback, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import BuyerBoard from '@components/workshop/BuyerBoard'

const listOre = [
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'jennei',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'alex',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'jennei',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'jennei',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'jennei',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'rose',
    'price': 10,
    'available': 1000
  }
]

const listHammer = [
  {
    'seller': 'peter',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'peter',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'peter',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'peter',
    'price': 10,
    'available': 1000
  },
  {
    'seller': 'peter',
    'price': 10,
    'available': 1000
  }
]

export default function WorkShop() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [isItemBoard, setIsItemBoard] = useState('ore')
  const [listItemsBoard, setListItemsBoard] = useState(listOre)
  const [isOpenBuyBoard, setIsOpenBuyBoard] = useState(false)
  const [pageWorkShop, setPageWorkShop] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})

  const toggleBuyModal = useCallback((state) => {
    setIsOpenBuyBoard(state)
  }, [])

  const handleSelectItemBoard = useCallback((item) => () => {
    setIsItemBoard(item)
    setListItemsBoard(item === 'ore' ? listOre : listHammer)
  }, [])

  const handleIncreasePage = useCallback(() => {
    if (listItemsBoard.slice(pageWorkShop * 5).length !== 0) {
      setPageWorkShop(pageWorkShop + 1)
    }
  }, [pageWorkShop])

  const handlePreviousPage = useCallback(() => {
    if (pageWorkShop > 1) {
      setPageWorkShop(pageWorkShop - 1)
    }
  }, [pageWorkShop])
 
  const handleRefresh = useCallback(() => {
    setPageWorkShop(1)
  }, [])

  const handleBuyItem = useCallback((available, price) => () => {
    setBuyDetail({
      'available': available,
      'price': price,
      'itemName': isItemBoard
    })
    toggleBuyModal(true)

  }, [])

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
      <div className={styles.workShopContainer}>
        <div className={styles.workShopBg}>
          <div className={styles.workShopTitleContainer}>
            <div className={styles.navWorkShop}></div>
            <div className={styles.workShopTitle}></div>
            <div className={styles.navWorkShop}></div>
          </div>
          <div>
            <Button className={`${styles.buyBtn} click-cursor`}></Button>
            <Button onClick={handleSelectItemBoard('ore')} className={`click-cursor ${styles.foodBtn}`}>
              <div className={styles.oreBtn}></div>
              <div className={`${isItemBoard === 'ore' && styles.itemBoardSelected}`}></div>
            </Button>
            <Button onClick={handleSelectItemBoard('hammer')} className={`click-cursor ${styles.foodBtn}`}>
              <div className={styles.hammerBtn}></div>
              <div className={`${isItemBoard === 'hammer' && styles.itemBoardSelected}`}></div>
            </Button>
          </div>
          <div className={styles.workShopBoard}>
            <TableContainer className={styles.table}>
              <Table size='sm' variant='strunstylediped'>
                <TableCaption className={styles.paginationContainer}>
                  <div className={styles.pagination}>
                    <div onClick={handlePreviousPage} className={`${styles.increase} click-cursor`}></div>
                    <div className={styles.numberPage}>{pageWorkShop < 10 && 0}{pageWorkShop}</div>
                    <div onClick={handleIncreasePage} className={`${styles.previous} click-cursor`}></div>
                  </div>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>
                      <div className={styles.columnTitle}>SELLER</div>
                    </Th>
                    <Th><div className={styles.columnTitle}>PRICE</div></Th>
                    <Th><div className={styles.columnTitle}>AVAILABLE</div></Th>
                    <Th sx={{ textAlign: 'center' }}><Button onClick={handleRefresh} className={`${styles.refreshBtn} click-cursor`}></Button></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listItemsBoard.slice((pageWorkShop - 1) * 5).map((item, index) => {
                    if (index < 5) {
                      return <>
                        <Tr>
                          <Td><div className={styles.columnItem}>{item.seller}</div></Td>
                          <Td><div className={styles.columnItem}>{item.price} OPEN</div></Td>
                          <Td><div className={styles.columnItem}>{item.available}</div></Td>
                          <Td sx={{ textAlign: 'center' }}><Button onClick={handleBuyItem(item.available, item.price)} className={`${styles.buyBtnItem} click-cursor`}></Button></Td>
                        </Tr>
                      </>
                    }
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <BuyerBoard
            isOpen={isOpenBuyBoard}
            toggleModalBuyModal={() => toggleBuyModal(false)}
            buyDetail={buyDetail}
          />
        </div>
        {/* <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
        // minScale={windowWidth <= 912 ? 0.5 : 1}
      >
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
          <div className={styles.workShopBg}>
            <div className={styles.workShopTitleContainer}>
              <div className={styles.navWorkShop}></div>
              <div className={styles.workShopTitle}></div>
              <div className={styles.navWorkShop}></div>
            </div>
            <div>
              <Button className={`${styles.buyBtn} click-cursor`}></Button>
              <Button onClick={handleSelectItemBoard('ore')} className={`click-cursor ${styles.foodBtn}`}>
                <div className={styles.oreBtn}></div>
                <div className={`${isItemBoard === 'ore' && styles.itemBoardSelected}`}></div>
              </Button>
              <Button onClick={handleSelectItemBoard('hammer')} className={`click-cursor ${styles.foodBtn}`}>
                <div className={styles.hammerBtn}></div>
                <div className={`${isItemBoard === 'hammer' && styles.itemBoardSelected}`}></div>
              </Button>
            </div>
            <div className={styles.workShopBoard}>
              <TableContainer className={styles.table}>
                <Table size='sm' variant='strunstylediped'>
                  <TableCaption className={styles.paginationContainer}>
                    <div className={styles.pagination}>
                      <div onClick={handlePreviousPage} className={`${styles.increase} click-cursor`}></div>
                      <div className={styles.numberPage}>{pageWorkShop < 10 && 0}{pageWorkShop}</div>
                      <div onClick={handleIncreasePage} className={`${styles.previous} click-cursor`}></div>
                    </div>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>
                        <div className={styles.columnTitle}>SELLER</div>
                      </Th>
                      <Th><div className={styles.columnTitle}>PRICE</div></Th>
                      <Th><div className={styles.columnTitle}>AVAILABLE</div></Th>
                      <Th sx={{ textAlign: 'center' }}><Button onClick={handleRefresh} className={`${styles.refreshBtn} click-cursor`}></Button></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {listItemsBoard.slice((pageWorkShop - 1) * 5).map((item, index) => {
                      if (index < 5) {
                        return <>
                          <Tr>
                            <Td><div className={styles.columnItem}>{item.seller}</div></Td>
                            <Td><div className={styles.columnItem}>{item.price} OPEN</div></Td>
                            <Td><div className={styles.columnItem}>{item.available}</div></Td>
                            <Td sx={{ textAlign: 'center' }}><Button onClick={handleBuyItem(item.available, item.price)} className={`${styles.buyBtnItem} click-cursor`}></Button></Td>
                          </Tr>
                        </>
                      }
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>

          </div>
        </TransformComponent>
      </TransformWrapper> */}
        <Link href="/">
          <a className={`${styles.backBtn} click-cursor`}></a>
        </Link>
      </div>
    </>
  )
} 