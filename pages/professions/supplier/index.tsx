import styles from '../../../components/professions/supplier.module.css'
import Head from 'next/head'
import FishingModal, {
  TYPE_OF_MODAL,
} from '@components/professions/openian/FishingModal'
import { useCallback, useEffect, useState } from 'react'
import MakeSushiModal from '@components/professions/supplier/MakeSushiModal'
import { getNFTsByTrait } from 'utils/itemContract'
import { dispatchMakeSushi } from 'utils/professionContract'
import SellSushiModal from '@components/professions/supplier/SellSushiModal'
import { sellSushi } from 'utils/NFTMarket'

function Supplier() {
  const [showMakeSushi, setShowMakeSushi] = useState(false)
  const [showSellSushi, setShowSellSushi] = useState(false)
  const [listFish, setListFish] = useState([])
  const [listSushi, setListSushi] = useState([])
  const [typeModal, setTypeModal] = useState(TYPE_OF_MODAL.START)
  useEffect(() => {
    //get nfts by trait
    getListItemByTrait()
    getListSushi()
  }, [])
  console.log('212', listSushi)

  const _onStartCook = useCallback(async () => {
    setTypeModal(TYPE_OF_MODAL.START)
    console.log('?????', listFish[0], listFish[1])
    const data = await dispatchMakeSushi(listFish[0], listFish[1])

    // console.log('haha', listFish)
    console.log('21123', data)
    if (data?.status) {
      setTypeModal(TYPE_OF_MODAL.FINISH)
    }
    getListItemByTrait()
  }, [listFish])

  const _onSellSushi = useCallback(async (valueSushi, quantitySushi) => {
    // setTypeModal(TYPE_OF_MODAL.START)
    console.log('22123', listSushi)
    // console.log('?????', )
    const data = await sellSushi(listSushi[0], valueSushi)
    console.log('cho heo ga', data)

    // // console.log('haha', listFish)
    // console.log('21123', data)
    // if (data?.status) {
    //   setTypeModal(TYPE_OF_MODAL.FINISH)
    // }
    // getListItemByTrait()
  }, [])

  const getListItemByTrait = useCallback(async () => {
    const data = await getNFTsByTrait(1)
    setListFish(data)
    return data
  }, [])
  const getListSushi = useCallback(async () => {
    const listSushi = await getNFTsByTrait(4)
    setListSushi(listSushi)
  }, [])
  const toggleModal = useCallback(
    (type) => {
      console.log('c')
      setTypeModal(TYPE_OF_MODAL.START)
      if (type === 'make') {
        setShowMakeSushi(!showMakeSushi)
      } else {
        console.log('h2')
        setShowSellSushi(!showSellSushi)
      }
    },
    [showMakeSushi, showSellSushi, typeModal]
  )

  const renderModal = useCallback(() => {
    return (
      <div>
        <MakeSushiModal
          isOpen={showMakeSushi}
          toggleModal={() => toggleModal('make')}
          listFishArray={listFish}
          onStartCook={_onStartCook}
          typeModal={typeModal}
        />
        <SellSushiModal
          isOpen={showSellSushi}
          toggleModal={() => toggleModal('sell')}
          listSushi={listSushi}
          onSellSushi={_onSellSushi}
          typeModal={typeModal}
        />
      </div>
    )
  }, [showMakeSushi, showSellSushi, listFish, typeModal])
  return (
    <div>
      <Head>
        <title>Supplier</title>
      </Head>
      <div className={`${styles.supplierOverlay} overlay game-scroll-bar`}>
        <div className={styles.supplierContainer}>
          <div className={styles.containerSupplierSellBtn}>
            <div
              onClick={() => toggleModal('sell')}
              className={styles.supplierButtonSell}
            ></div>
          </div>
          <div className={styles.containerSupplierMakeBtn}>
            <div
              className={styles.supplierButtonMake}
              onClick={() => toggleModal('make')}
            ></div>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  )
}

export default Supplier
