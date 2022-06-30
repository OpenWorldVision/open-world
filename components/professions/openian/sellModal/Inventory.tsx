import style from './inventory.module.css'
import modalStyle from './sellModal.module.css'
import { Grid, GridItem, Spinner } from '@chakra-ui/react'
import { fetchUserInventoryItemAmount } from 'utils/Item'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  isOpenianSell?: boolean
  isRefreshInventory?: boolean
  selectOpenianSellItem?: (number) => void
}

const renderEmptyInventorySlot = (slotNumber) => {
  const emptySlots = []
  for (let i = 0; i < slotNumber; i++) {
    const emptySlot = <GridItem key={i} className={style.emptySlot}></GridItem>
    emptySlots.push(emptySlot)
  }
  return emptySlots
}

function Inventory(props: Props) {
  const { isOpenianSell, isRefreshInventory, selectOpenianSellItem } = props
  const [userItems, setUserItems] = useState(null)

  const initialize = useCallback(async () => {
    const items = await fetchUserInventoryItemAmount()
    setUserItems(items)
  }, [])

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    if (isRefreshInventory) {
      setUserItems(null)
      initialize()
    }
  }, [isRefreshInventory])

  const handleClickItem = (itemTrait) => {
    // 0: Fish, 1: Ore, 2: Hammer, 3: Sushi
    if (userItems) {
      if (isOpenianSell) {
        selectOpenianSellItem(itemTrait)
      }
    }
  }

  return (
    <div id="inventory" className={`${modalStyle.modal} ${style.inventory}`}>
      <h3 className={modalStyle.board}>
        <img
          src="/images/professions/openian/inventoryboard.png"
          alt="Sell board"
        />
      </h3>

      <Grid
        templateColumns={{
          base: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        templateRows={{
          base: 'repeat(7, 1fr)',
          md: 'repeat(5, 1fr)',
        }}
        gap={{
          base: 3,
          md: 6,
        }}
        className={style.invetoryList}
      >
        <GridItem
          className={`${style.emptySlot} click-cursor`}
          onClick={() => handleClickItem(0)}
        >
          <div className={`${style.itemImage} ${style.fish}`}></div>
          <div className={style.itemAmount}>
            {userItems ? `x${userItems.fishAmount}` : <Spinner />}
          </div>
        </GridItem>

        <GridItem
          className={`${style.emptySlot} click-cursor`}
          onClick={() => handleClickItem(1)}
        >
          <div className={`${style.itemImage} ${style.ore}`}></div>
          <div className={style.itemAmount}>
            {userItems ? `x${userItems.oreAmount}` : <Spinner />}
          </div>
        </GridItem>

        {!isOpenianSell ? (
          <>
            <GridItem className={`${style.emptySlot} click-cursor`}>
              <div className={`${style.itemImage} ${style.hammer}`}></div>
              <div className={style.itemAmount}>
                {userItems ? `x${userItems.hammerAmount}` : <Spinner />}
              </div>
            </GridItem>

            <GridItem className={`${style.emptySlot} click-cursor`}>
              <div className={`${style.itemImage} ${style.sushi}`}></div>
              <div className={style.itemAmount}>
                {userItems ? `x${userItems.sushiAmount}` : <Spinner />}
              </div>
            </GridItem>
          </>
        ) : (
          renderEmptyInventorySlot(2)
        )}

        {renderEmptyInventorySlot(16)}
      </Grid>
    </div>
  )
}

export default Inventory
