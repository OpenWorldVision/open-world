import { Button } from '@chakra-ui/react'
import { Duration, formatDuration } from 'date-fns'
import { useMemo } from 'react'
import styles from './fishingModal.module.css'
type Props = {
  canFinish: boolean
  onFinish: () => void
  timeLeft: Duration
  loading: boolean
}
function WaitingModal({ canFinish, onFinish, timeLeft, loading }: Props) {
  const formattedTimeLeft = useMemo(
    () =>
      formatDuration(timeLeft, {
        format: ['hours', 'minutes', 'seconds'],
      }),
    [timeLeft]
  )
  return (
    <div className={styles.boardContent}>
      <div className={styles.description}>
        <div className={styles.content}>
          <div className={styles.titleText}>Active Quest</div>
          <div className={styles.valueText}>
            Openian is on Fishing Quest. Be patient!
          </div>
          {!loading && !!formattedTimeLeft && (
            <>
              <div className={styles.titleText}>Time Left</div>
              <div className={styles.valueText}>{formattedTimeLeft}</div>
            </>
          )}
        </div>
      </div>
      <Button
        className={`btn-chaka ${styles.confirmBtn} click-cursor`}
        onClick={onFinish}
        isLoading={loading}
      >
        {canFinish ? (
          <img
            src={`/images/professions/openian/finishFishing.png`}
            alt="Finish"
          />
        ) : (
          <img
            src={`/images/professions/openian/finish-disable-btn.png`}
            alt="Finish"
          />
        )}
      </Button>
    </div>
  )
}

export default WaitingModal
