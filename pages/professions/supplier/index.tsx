import styles from '../../../components/professions/supplier.module.css'
import Head from 'next/head'
import { TYPE_OF_MODAL } from '@components/professions/openian/fishingModal/FishingModal'
import { useCallback, useEffect, useState } from 'react'
import MakeSushiModal from '@components/professions/supplier/MakeSushiModal'
import {
  getApprovalAll,
  getNFTsByTrait,
  setApprovedAll,
} from 'utils/itemContract'
import { makeMultiSushi } from '../../../utils/professionContract'
import SellSushiModal from '@components/professions/supplier/SellSushiModal'
import { listMultiItems } from 'utils/NFTMarket'
import LoadingModal from '@components/LoadingModal'
import BackButton from '@components/BackButton'
import useTransactionState from 'hooks/useTransactionState'

function Supplier() {
  const [showMakeSushi, setShowMakeSushi] = useState(false)
  const [showSellSushi, setShowSellSushi] = useState(false)
  const [listFish, setListFish] = useState([])
  const [listSushi, setListSushi] = useState([])
  const [typeModal, setTypeModal] = useState(TYPE_OF_MODAL.START)
  const [isLoading, setIsLoading] = useState(false)
  const handleTxStateChange = useTransactionState()

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

  const _onStartCook = useCallback(
    async (valueFish) => {
      const title = 'Cooking sushi'
      const listFishBurn = listFish.slice(0, valueFish)
      setTypeModal(TYPE_OF_MODAL.START)
      setIsLoading(true)

      const data = await makeMultiSushi(
        listFishBurn,
        (txHash) => {
          handleTxStateChange(title, txHash, 2)
        }
      )

      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status)
      } else {
        handleTxStateChange(title, '', 3)
      }

      setIsLoading(false)

      if (data?.status) {
        setTypeModal(TYPE_OF_MODAL.FINISH)
      }
      getListItemByTrait()
    },
    [getListItemByTrait, listFish]
  )

  const _onSellSushi = useCallback(
    async (valueSushi) => {
      const title = 'Sell sushi'
      getApprovedStatus()
      setTypeModal(TYPE_OF_MODAL.START)
      setIsLoading(true)
      const listSushiSell = []
      listSushiSell.push(parseInt(listSushi[0]))
      const data = await listMultiItems(
        listSushiSell,
        valueSushi,
        (txHash) => {
          handleTxStateChange(title, txHash, 2)
        }
      )
      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status)
        setTypeModal(TYPE_OF_MODAL.FINISH)
        getListSushi()
        setIsLoading(false)
      } else {
        setIsLoading(false)
        handleTxStateChange(title, '', 3)
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
        <BackButton />
      </div>

      {renderModal()}
      {isLoading ? <LoadingModal /> : null}
    </div>
  )
}

export default Supplier
