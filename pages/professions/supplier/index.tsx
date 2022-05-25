import styles from '../../../components/professions/supplier.module.css'
import Head from 'next/head'
import FishingModal from '@components/professions/openian/FishingModal'
import { useCallback, useState } from 'react'
import MakeSushiModal from '@components/professions/supplier/MakeSushiModal'

function Supplier() {
  const [showMakeSushi, setShowMakeSushi] = useState(false)
  const [showSellSushi, setShowSellSushi] = useState(false)
  const toggleModal = useCallback(
    (type) => {
      if (type === 'make') {
        setShowMakeSushi(!showMakeSushi)
      } else {
        setShowSellSushi(!showSellSushi)
      }
    },
    [showMakeSushi, showSellSushi]
  )
  return (
    <div>
      <Head>
        <title>Supplier</title>
      </Head>
      <div className={`${styles.supplierOverlay} overlay game-scroll-bar`}>
        <div className={styles.supplierContainer}>
          <div className={styles.containerSupplierSellBtn}>
            <div className={styles.supplierButton}></div>
          </div>
          <div className={styles.containerSupplierMakeBtn}>
            <div
              className={styles.supplierButtonMake}
              onClick={() => toggleModal('make')}
            ></div>
          </div>
        </div>
      </div>
      <MakeSushiModal
        isOpen={showMakeSushi}
        toggleModal={() => toggleModal('make')}
        haveQuestUnfinish={true}
      />
    </div>
  )
}

export default Supplier
