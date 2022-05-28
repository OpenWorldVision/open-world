import styles from '../../../components/professions/supplier.module.css'
import Head from 'next/head'
import FishingModal, {
  TYPE_OF_MODAL,
} from '@components/professions/openian/fishingModal/FishingModal'
import { useCallback, useEffect, useState } from 'react'
import MakeSushiModal from '@components/professions/supplier/MakeSushiModal'
import {
  getApprovalAll,
  getNFTsByTrait,
  setApprovedAll,
} from 'utils/itemContract'
import { dispatchMakeSushi } from '../../../utils/professionContract'
import SellSushiModal from '@components/professions/supplier/SellSushiModal'
import { sellSushi } from 'utils/NFTMarket'
import LoadingModal from '@components/LoadingModal'
import Link from 'next/link'

function Supplier() {
  const [showMakeSushi, setShowMakeSushi] = useState(false)
  const [showSellSushi, setShowSellSushi] = useState(false)
  const [listFish, setListFish] = useState([])
  const [listSushi, setListSushi] = useState([])
  const [typeModal, setTypeModal] = useState(TYPE_OF_MODAL.START)
  const [isLoading, setIsLoading] = useState(false)
  const getListItemByTrait = useCallback(async () => {
    const data = await getNFTsByTrait(1)
    setListFish(data)
    return data
  }, [])
  const getListSushi = useCallback(async () => {
    const listSushi = await getNFTsByTrait(4)
    setListSushi(listSushi)
  }, [])
  useEffect(() => {
    //get nfts by trait
    getListItemByTrait()
    getListSushi()
  }, [getListItemByTrait, getListSushi])

  const setApproved = async () => {
    await setApprovedAll()
  }
  const getApprovedStatus = useCallback(async () => {
    const isApproved = await getApprovalAll()
    if (!isApproved) {
      setApproved()
    }
    return isApproved
  }, [])

  const _onStartCook = useCallback(async () => {
    setTypeModal(TYPE_OF_MODAL.START)
    setIsLoading(true)
    const data = await dispatchMakeSushi(listFish[0], listFish[1])

    if (data?.status) {
      setTypeModal(TYPE_OF_MODAL.FINISH)
      setIsLoading(false)
    }
    getListItemByTrait()
  }, [getListItemByTrait, listFish])

  const _onSellSushi = useCallback(
    async (valueSushi) => {
      getApprovedStatus()
      setTypeModal(TYPE_OF_MODAL.START)
      setIsLoading(true)
      const data = await sellSushi(listSushi[0], valueSushi)
      if (data) {
        setTypeModal(TYPE_OF_MODAL.FINISH)
        getListSushi()
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    },
    [getApprovedStatus, getListSushi, listSushi]
  )

  const toggleModal = useCallback(
    (type) => {
      setTypeModal(TYPE_OF_MODAL.START)
      if (type === 'make') {
        setShowMakeSushi(!showMakeSushi)
      } else {
        setShowSellSushi(!showSellSushi)
      }
    },
    [showMakeSushi, showSellSushi]
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
  }, [
    showMakeSushi,
    listFish,
    _onStartCook,
    typeModal,
    showSellSushi,
    listSushi,
    _onSellSushi,
    toggleModal,
  ])
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
      {isLoading ? <LoadingModal /> : null}
      <Link href="/">
        <a className={`${styles.backBtn} click-cursor`}></a>
      </Link>
    </div>
  )
}

export default Supplier
