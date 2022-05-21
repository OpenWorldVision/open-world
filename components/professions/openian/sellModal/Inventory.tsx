import style from './inventory.module.css'
import modalStyle from './sellModal.module.css'
import { Grid, GridItem } from '@chakra-ui/react'


const inventoryEmptySlots = () => {
  const emptySlots = [];
  for (let i = 0; i < 20; i++) {
    const emptySlot = (
      <GridItem className={style.emptySlot}>
      </GridItem>
    )
    emptySlots.push(emptySlot);
  }
  return emptySlots;
}

function Inventory() {
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
          md: 'repeat(4, 1fr)'
        }}
        templateRows={{
          base: 'repeat(7, 1fr)',
          md: 'repeat(5, 1fr)'
        }}
        gap={{
          base: 3,
          md: 6
        }}
        className={style.invetoryList}
      >
        { inventoryEmptySlots() }
      </Grid>
    </div>
  )
}

export default Inventory
