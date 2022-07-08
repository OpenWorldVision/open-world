import styles from '@components/professions/supplier.module.css'
import Head from 'next/head'
import { TYPE_OF_MODAL } from '@components/professions/openian/fishingModal/FishingModal'
import { useCallback, useEffect, useState, useRef } from 'react'
import MakeSushiModal from '@components/professions/supplier/MakeSushiModal'
import { getNFTsByTrait } from 'utils/itemContract'
import { makeMultiSushi } from '../../../utils/professionContract'
import LoadingModal from '@components/LoadingModal'
import BackButton from '@components/BackButton'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { useDisclosure } from '@chakra-ui/react'
import Inventory, { InventoryRef } from '@components/professions/Inventory'
import Popup, { PopupRef } from '@components/Popup'

function Supplier() {
  const { isOpen: isOpenMakeSushi, onToggle: onToggleMakeSushi } =
    useDisclosure()

  const [listFish, setListFish] = useState([])
  const [typeModal, setTypeModal] = useState(TYPE_OF_MODAL.START)
  const [isLoading, setIsLoading] = useState(false)
  const handleTxStateChange = useTransactionState()
  const inventoryRef = useRef<InventoryRef>()
  const popupRef = useRef<PopupRef>()

  const getListItemByTrait = useCallback(async () => {
    const data = await getNFTsByTrait(1)
    setListFish(data)
    return data
  }, [])

  useEffect(() => {
    //get nfts by trait
    getListItemByTrait()
  }, [getListItemByTrait])

  const handleStartCookingSushi = useCallback(
    async (valueFish) => {
      const title = 'Cooking sushi'
      const listFishBurn = listFish.slice(0, valueFish)
      setTypeModal(TYPE_OF_MODAL.START)
      setIsLoading(true)

      const data = await makeMultiSushi(listFishBurn, (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, popupRef)
      })

      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status, popupRef)
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, popupRef)
      }

      setIsLoading(false)

      if (data?.status) {
        setTypeModal(TYPE_OF_MODAL.FINISH)
      }
      getListItemByTrait()
    },
    [getListItemByTrait, handleTxStateChange, listFish]
  )

  return (
    <div>
      <Head>
        <title>Supplier</title>
      </Head>
      <div className={`${styles.supplierOverlay} overlay game-scroll-bar`}>
        <div className={styles.supplierContainer}>
          <div className={styles.containerSupplierSellBtn}>
            <div
              onClick={inventoryRef.current?.open}
              className={styles.supplierButtonSell}
            />
          </div>
          <div className={styles.containerSupplierMakeBtn}>
            <div
              className={styles.supplierButtonMake}
              onClick={onToggleMakeSushi}
            />
          </div>
        </div>
        <BackButton />
      </div>

      <div>
        <MakeSushiModal
          isOpen={isOpenMakeSushi}
          toggleModal={onToggleMakeSushi}
          listFishArray={listFish}
          onStartCook={handleStartCookingSushi}
          typeModal={typeModal}
          onClose={onToggleMakeSushi}
        />
      </div>
      <Inventory ref={inventoryRef} />
      {isLoading && <LoadingModal />}
      <Popup ref={popupRef} />
    </div>
  )
}

export default Supplier
