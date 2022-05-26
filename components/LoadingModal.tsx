import styles from './loadingModal.module.css'

function LoadingModal() {
  return (
    <div className={`overlay ${styles.preLoader}`}>
      <div className={styles.preloaderFoldingCube}>
        <div
          className={`${styles.preloaderCube1} ${styles.preloaderCube}`}
        ></div>
        <div
          className={`${styles.preloaderCube2} ${styles.preloaderCube}`}
        ></div>
        <div
          className={`${styles.preloaderCube4} ${styles.preloaderCube}`}
        ></div>
        <div
          className={`${styles.preloaderCube3} ${styles.preloaderCube}`}
        ></div>
      </div>
    </div>
  )
}

export default LoadingModal
