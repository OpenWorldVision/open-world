import { Button } from '@chakra-ui/react'
import styles from '@components/foodcourt/foodcourt.module.css'

export default function FoodCourt() {
  return (
    <div className={styles.foodCourtContainer}>
      <div className={styles.foodCourtTitle}></div>
      <div>
        <Button className={styles.buyBtn}></Button>
        <Button className={styles.foodBtn}><div className={styles.sushiBtn}></div></Button>
        <Button className={styles.foodBtn}><div className={styles.fishBtn}></div></Button>
      </div>
    </div>
  )
} 