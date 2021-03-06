import styles from './sellModal.module.css'
import SellBoard from './SellBoard'
import Inventory from './Inventory'
import { Grid, GridItem } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  toggleModal: () => void
  updateInventory: boolean
}

function SellModal(props: Props) {
  const { isOpen, updateInventory, toggleModal } = props
  const [selectedItem, setSelectedItem] = useState(-1)
  const [isRefreshInventory, setIsRefreshInventory] = useState(false)

  const selectItemForSell = useCallback((item) => {
    setSelectedItem(item)
  }, [])

  const handleFinishListing = useCallback(() => {
    selectItemForSell(-1)
    setIsRefreshInventory(true)
    setTimeout(() => setIsRefreshInventory(false), 2000)
  }, [])

  useEffect(() => {
    setIsRefreshInventory(true)
    setTimeout(() => setIsRefreshInventory(false), 2000)
  }, [updateInventory])

  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          xl: 'repeat(2, 1fr)',
        }}
        gap={12}
        className={styles.modalContainer}
      >
        <GridItem
          rowStart={{
            base: 2,
            xl: 1,
          }}
        >
          <Inventory
            isOpenianSell
            selectOpenianSellItem={selectItemForSell}
            isRefreshInventory={isRefreshInventory}
          />
        </GridItem>
        <GridItem>
          <SellBoard
            toggleModal={toggleModal}
            selectedItem={selectedItem}
            handleFinishListing={() => handleFinishListing()}
          />
        </GridItem>
      </Grid>
    </div>
  )
}

export default SellModal
