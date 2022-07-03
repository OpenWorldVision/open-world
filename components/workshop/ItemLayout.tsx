import { Button } from '@chakra-ui/react'
import styles from './ItemLayoutStyle.module.css'

type Props = {
  item: object
}

export default function ItemLayout(props: Props) {
  const { item } = props

  const renderNameItem = () => {
    if (item['trait'] === 1) {
      return 'Fish'
    } 
    else if (item['trait'] === 2) {
      return 'Ore'
    }
    else if (item['trait'] === 3) {
      return 'Hammer'
    }
    else if (item['trait'] === 4) {
      return 'Sushi'
    }
  }

  const renderItemImg = () => {
    if (item['trait'] === 1) {
      return <img src="/images/workshop/mobile/fish.png" alt="" />
    } 
    else if (item['trait'] === 2) {
      return <img src="/images/workshop/mobile/ore.png" alt="" />
    }
    else if (item['trait'] === 3) {
      return <img src="/images/workshop/mobile/hammer.png" alt="" />
    }
    else if (item['trait'] === 4) {
      return <img src="/images/workshop/mobile/sushi.png" alt="" />
    }
  }
  
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemContainerHead}>
        <div className={styles.itemBackground}>
          <div className={styles.imgContainer}>
            {renderItemImg()}
          </div>
        </div>
        <div className={styles.itemNamePrice}>
          <span>{renderNameItem()}</span>
          <div className={styles.price}><span>{item['price']}</span><img src="/images/workshop/mobile/coin.png" alt="coin" /></div>
        </div>
        <div className={styles.itemQuantity}>
          <div className={styles.quantity}>Available: {item['items'].length}</div>
          <Button>Buy</Button>
        </div>
      </div>
      <div className={styles.itemContainerBody}>
        <div className={styles.itemSellerTitle}>Seller</div>
        <div className={styles.itemSellerAddress}>{`${item['seller'].slice(0, 5)}...${item['seller'].slice(item['seller'].length - 4, item['seller'].length)}`}</div>
      </div>
    </div>
  )
}