import styles from './sellModal.module.css'
import SellBoard from './SellBoard'
import Inventory from './Inventory'
import { Grid, GridItem } from '@chakra-ui/react'


type Props = {
  isOpen: boolean
  toggleModal: () => void
}

function SellModal(props: Props) {
  const { isOpen, toggleModal } = props


  return (
    <div
      className={`overlay ${styles.modalOverlay} ${isOpen && styles.active}`}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          'xl': 'repeat(2, 1fr)',
        }}
        gap={12}
        className={styles.modalContainer}
      >
        <GridItem
          rowStart={{
            base: 2,
            'xl': 1,
          }}
        >
          <Inventory />
        </GridItem>
        <GridItem>
          <SellBoard
            toggleModal={() => toggleModal()}
          />
        </GridItem>
      </Grid>
    </div>
  )
}

export default SellModal
