import { Button } from '@chakra-ui/react'
import styles from './fishingModal.module.css'
type Props = {
  onConfirm: () => void
  loading: boolean
}
function FinishModal({ onConfirm, loading }: Props) {
  return (
    <div className={styles.descriptionFinish}>
      <h3 className={styles.sellBoard}>
        <img
          src="/images/professions/openian/questFinish.png"
          alt="Fish board"
        />
      </h3>
      <div className={styles.titleTextFinish}>You Caught</div>
      <div className={styles.rowView}>
        <div className={styles.valueTextFinish}>x1</div>
        <img
          src={`/images/professions/openian/fishNFT.png`}
          alt="Confirm"
          className={styles.fishNFT}
        />
      </div>
      <div className={styles.noteText}>
        All the Fishes you catch will be stored in your inventory.
      </div>
      <Button
        className={`btn-chaka ${styles.confirmBtn} ${styles.confirmFinishBtn} click-cursor`}
        onClick={onConfirm}
        isLoading={loading}
      >
        <img
          src={`/images/professions/openian/confirm-btn.png`}
          alt="Confirm"
        />
      </Button>
    </div>
  )
}

export default FinishModal
