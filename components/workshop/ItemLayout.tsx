import { Button, useDisclosure } from '@chakra-ui/react'
import styles from './ItemLayoutStyle.module.css'
import NotificationCancelItem from './NotificationCancelItem'

type Props = {
  item: object,
  handleBuyItem: (object) => () => void,
  handleCancelItem: (object) => () => void,
  isItemBoard: string
}

export default function ItemLayout(props: Props) {
  const { item, handleBuyItem, handleCancelItem, isItemBoard } = props
  const { isOpen: isOpenCancelBoard, onToggle: onToggleCancelBoard } =
    useDisclosure()
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
      return <img src="/images/workshop/mobile/fish.webp" alt="" />
    }
    else if (item['trait'] === 2) {
      return <img src="/images/workshop/mobile/ore.webp" alt="" />
    }
    else if (item['trait'] === 3) {
      return <img src="/images/workshop/mobile/hammer.webp" alt="" />
    }
    else if (item['trait'] === 4) {
      return <img src="/images/workshop/mobile/sushi.webp" alt="" />
    }
  }

  return (
    <>
      <div className={styles.itemContainer}>
        <div className={styles.itemContainerHead}>
          <div className={styles.itemBackground}>
            <div className={styles.imgContainer}>
              {renderItemImg()}
            </div>
          </div>
          <div className={styles.itemNamePrice}>
            <span>{renderNameItem()}</span>
            <div className={styles.price}><span>{item['price']}</span><img src="/images/workshop/mobile/coin.webp" alt="coin" /></div>
          </div>
          <div className={styles.itemQuantity}>
            <div className={styles.quantity}>Available: {item['items'].length}</div>
            {isItemBoard === 'mine' ? <Button onClick={onToggleCancelBoard}>Cancel</Button>
              : <Button onClick={handleBuyItem(item)}>Buy</Button>}
          </div>
        </div>
        <div className={styles.itemContainerBody}>
          <div className={styles.itemSellerTitle}>Seller</div>
          <div className={styles.itemSellerAddress}>{`${item['seller'].slice(0, 5)}...${item['seller'].slice(item['seller'].length - 4, item['seller'].length)}`}</div>
        </div>
      </div>
      {isOpenCancelBoard && <NotificationCancelItem handleCancelItem={handleCancelItem} item={item} handleToggleCancelBoard={onToggleCancelBoard} isOpenCancelBoard={isOpenCancelBoard}/>}
    </>
  )
}