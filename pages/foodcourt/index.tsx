import { Button, Link, styled, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import styles from '@components/foodcourt/foodcourt.module.css'

import { useCallback, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import BuyerBoard from '@components/foodcourt/BuyerBoard'

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
    'available': 1000
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
  const [isItemBoard, setIsItemBoard] = useState('sushi')
  const [listItemsBoard, setListItemsBoard] = useState(listSushi)
  const [isOpenBuyBoard, setIsOpenBuyBoard] = useState(false)

  const [pageFoodCourt, setPageFoodCourt] = useState(1)
  const [buyDetail, setBuyDetail] = useState({})

  const toggleBuyModal = useCallback((state) => {
    setIsOpenBuyBoard(state)
  }, [])

  const handleSelectItemBoard = (item) => () => {
    setIsItemBoard(item)
    setListItemsBoard(item === 'sushi' ? listSushi : listFish)
  }

  const handlePreviousPage = () => {
    if (listItemsBoard.slice(pageFoodCourt * 5).length !== 0) {
      setPageFoodCourt(pageFoodCourt + 1)
    }
  }

  const handleIncreasePage = () => {
    if (pageFoodCourt > 1) {
      setPageFoodCourt(pageFoodCourt - 1)
    }
  }

  const handleRefresh = () => {
    setPageFoodCourt(1)
  }

  const handleBuyItem = (available, price) => () => {
    setBuyDetail({
      'available': available,
      'price': price,
      'itemName': isItemBoard
    })
    toggleBuyModal(true)
  }
  
  return (
    <div className={styles.foodCourtContainer}>
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
          <div className={styles.foodCourtBg}>
            <div className={styles.foodCourtTitleContainer}>
              <div className={styles.navFoodCourt}></div>
              <div className={styles.foodCourtTitle}></div>
              <div className={styles.navFoodCourt}></div>
            </div>
            <div>
              <Button className={`${styles.buyBtn} click-cursor`}></Button>
              <Button onClick={handleSelectItemBoard('sushi')} className={`click-cursor ${styles.foodBtn} ${isItemBoard === 'sushi' && styles.itemBoardSelected}`}>
                <div className={styles.sushiBtn}></div></Button>
              <Button onClick={handleSelectItemBoard('fish')} className={`click-cursor ${styles.foodBtn} ${isItemBoard === 'fish' && styles.itemBoardSelected}`}><div className={styles.fishBtn}></div></Button>
            </div>
            <div className={styles.foodCourtBoard}>
              <TableContainer className={styles.table}>
                <Table size='sm' variant='strunstylediped'>
                  <TableCaption className={styles.test}>
                    <div className={styles.pagination}>
                      <div onClick={handleIncreasePage} className={`${styles.increase} click-cursor`}></div>
                      <div className={styles.numberPage}>{pageFoodCourt}</div>
                      <div onClick={handlePreviousPage} className={`${styles.previous} click-cursor`}></div>
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

          </div>
        </TransformComponent>
      </TransformWrapper>
      <BuyerBoard
        isOpen={isOpenBuyBoard}
        toggleModal={() => toggleBuyModal(false)}
        buyDetail={buyDetail}
      />
      <Link href="/">
        <a className={`${styles.backBtn}`}></a>
      </Link>
    </div>

  )
} 