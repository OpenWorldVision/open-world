import { Button } from '@chakra-ui/react'
import styles from './fishingModal.module.css'

type Props = {
  requireStamina: number
  onStartQuest: () => void
  duration: number
  loading: boolean
}
function DefaultModal({
  requireStamina,
  onStartQuest,
  duration,
  loading,
}: Props) {
  return (
    <div className={styles.boardContent}>
      <div className={`${styles.description}`}>
        <div className={styles.content}>
          <div className={styles.titleText}>Description</div>
          <div className={styles.valueText}>
            Fish is the main ingredient for making Sushi and Suppliers are
            paying good money for them. Let&apos;s go catch some !!!
          </div>
          <div className={styles.titleText}>Base Duration</div>
          <div className={styles.valueText}>{duration / 3600} hours</div>
          <div className={styles.titleText}>Stamina Per Attemp</div>
          <div className={styles.valueText}>
            {requireStamina} Stamina <div className={styles.iconStamina}></div>
          </div>
        </div>
      </div>
      <Button
        className={`btn-chaka ${styles.confirmBtn} click-cursor`}
        onClick={onStartQuest}
        isLoading={loading}
      >
        <img
          src={`/images/professions/openian/startFishing.png`}
          alt="Start Quest"
        />
      </Button>
    </div>
  )
}

export default DefaultModal
