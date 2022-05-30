import { Button, Link, styled, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import styles from '@components/foodcourt/foodcourt.module.css'

import { useCallback, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import BuyerBoard from '@components/foodcourt/BuyerBoard'
import Inventory from '@components/Inventory'

const listSushi = [
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
    'available': 500
  },
  {
    'seller': 'rose',
    'price': 10,
    'available': 1000
  }
]

const listFish = [
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

export default function FoodCourt() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isItemBoard, setIsItemBoard] = useState('sushi')
  const [listItemsBoard, setListItemsBoard] = useState(listSushi)
  const [isOpenBuyBoard, setIsOpenBuyBoard] = useState(false)
  const [pageFoodCourt, setPageFoodCourt] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})
  const [isOpenInventory, setIsOpenInventory] = useState(false)

  const toggleBuyModal = useCallback((state) => {
    setIsOpenBuyBoard(state)
  }, [])

  const handleSelectItemBoard = useCallback((item) => () => {
    setIsItemBoard(item)  
    setListItemsBoard(item === 'sushi' ? listSushi : listFish)
  }, [])

  const handleIncreasePage = useCallback(() => {
    if (listItemsBoard.slice(pageFoodCourt * 5).length !== 0) {
      setPageFoodCourt(pageFoodCourt + 1)
    }
  }, [pageFoodCourt])

  const handlePreviousPage = useCallback(() => {
    if (pageFoodCourt > 1) {
      setPageFoodCourt(pageFoodCourt - 1)
    }
  }, [pageFoodCourt])

  const handleRefresh = useCallback(() => {
    setPageFoodCourt(1)
  }, [])

  const handleBuyItem = useCallback((available, price) => () => {
    setIsOpenInventory(true)
    setBuyDetail({
      'available': available,
      'price': price,
      'itemName': isItemBoard
    })
    // toggleBuyModal(true)
  }, [isOpenBuyBoard, isItemBoard])

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
    <div className={styles.foodCourtContainer}>
      <div className={styles.foodCourtBg}>
        <div className={styles.foodCourtTitleContainer}>
          <div className={styles.navFoodCourt}></div>
          <div className={styles.foodCourtTitle}></div>
          <div className={styles.navFoodCourt}></div>
        </div>
        <div>
          <Button className={`${styles.buyBtn} click-cursor`}></Button>
          <Button onClick={handleSelectItemBoard('sushi')} className={`click-cursor ${styles.foodBtn}`}>
            <div className={styles.sushiBtn}></div>
            <div className={`${isItemBoard === 'sushi' && styles.itemBoardSelected}`}></div>
          </Button>
          <Button onClick={handleSelectItemBoard('fish')} className={`click-cursor ${styles.foodBtn}`}>
            <div className={styles.fishBtn}></div>
            <div className={`${isItemBoard === 'fish' && styles.itemBoardSelected}`}></div>
          </Button>
        </div>
        <div className={styles.foodCourtBoard}>
          <TableContainer className={styles.table}>
            <Table size='sm' variant='strunstylediped'>
              <TableCaption className={styles.paginationContainer}>
                <div className={styles.pagination}>
                  <div onClick={handlePreviousPage} className={`${styles.increase} click-cursor`}></div>
                  <div className={styles.numberPage}>{pageFoodCourt < 10 && 0}{pageFoodCourt}</div>
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
                {listItemsBoard.slice((pageFoodCourt - 1) * 5).map((item, index) => {
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
        {/* <BuyerBoard
          isOpen={isOpenBuyBoard}
          toggleModalBuyModal={() => toggleBuyModal(false)}
          buyDetail={buyDetail}
        /> */}
        <Link href="/">
          <a className={`${styles.backBtn} click-cursor`}></a>
        </Link>
        {isOpenInventory && <Inventory isOpenInventory={isOpenInventory} setIsOpenInventory={setIsOpenInventory} />}
      </div>
    </div>

  )
} 