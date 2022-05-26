import styles from '@components/professions/blacksmith/blacksmith.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export default function BlackSmith() {
  return (
    <div className={styles.blackSmithContainer}>
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
      >
        <TransformComponent>
          <div className={styles.blackSmithBg}>
            <Link href="/professions/blacksmith/sellerboard">
              <a className={`${styles.sellHammer}`}></a>
            </Link>
            <Link href="/professions/blacksmith/forgehammer">
              <a className={`${styles.forgeHammer}`}></a>
            </Link>
          </div>
        </TransformComponent>
      </TransformWrapper>
      <Link href="/professions">
        <a className={`${styles.backBtn}`}></a>
      </Link>
    </div>
  )
}