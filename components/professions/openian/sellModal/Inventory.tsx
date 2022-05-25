import style from './inventory.module.css'
import modalStyle from './sellModal.module.css'
import { Grid, GridItem } from '@chakra-ui/react'
import { fetchUserInventoryItemAmount } from 'utils/Item'
import { useEffect, useState } from 'react'

type Props = {
  isOpenianSell?: boolean
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
  const { isOpenianSell, selectOpenianSellItem } = props
  const [userItems, setUserItems] = useState(null)

  const initialize = async () => {
    const items = await fetchUserInventoryItemAmount()
    setUserItems(items)
  }

  useEffect(() => {
    initialize()
  }, [])

  const onCickItemHandle = (itemTrait) => { // 0: Fish, 1: Ore, 2: Hammer, 3: Sushi
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
          onClick={() => onCickItemHandle(0)}
        >
          <div className={`${style.itemImage} ${style.fish}`}></div>
          <div className={style.itemAmount}>
            {userItems ? `x${userItems.fishAmount}` : 'Loading'}
          </div>
        </GridItem>

        <GridItem
          className={`${style.emptySlot} click-cursor`}
          onClick={() => onCickItemHandle(1)}
        >
          <div className={`${style.itemImage} ${style.ore}`}></div>
          <div className={style.itemAmount}>
            {userItems ? `x${userItems.oreAmount}` : 'Loading'}
          </div>
        </GridItem>

        {!isOpenianSell ? (
          <>
            <GridItem className={`${style.emptySlot} click-cursor`}>
              <div className={`${style.itemImage} ${style.hammer}`}></div>
              <div className={style.itemAmount}>
                {userItems ? `x${userItems.hammerAmount}` : 'Loading'}
              </div>
            </GridItem>

            <GridItem className={`${style.emptySlot} click-cursor`}>
              <div className={`${style.itemImage} ${style.sushi}`}></div>
              <div className={style.itemAmount}>
                {userItems ? `x${userItems.sushiAmount}` : 'Loading'}
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
