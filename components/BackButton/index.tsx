import Router from 'next/router'
import styles from './backButton.module.css'

function BackButton() {
  return (
    <div
      onClick={Router.back}
      className={`${styles.backBtn} click-cursor`}
    ></div>
  )
}

export default BackButton
