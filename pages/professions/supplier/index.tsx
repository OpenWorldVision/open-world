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
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import Popup, { PopupRef } from '@components/Popup'

function Supplier() {
  const { isOpen: isOpenMakeSushi, onToggle: onToggleMakeSushi } =
    useDisclosure()

  const [listFish, setListFish] = useState([])
  const [typeModal, setTypeModal] = useState(TYPE_OF_MODAL.START)
  const [isLoading, setIsLoading] = useState(false)
  const handleTxStateChange = useTransactionState()
  const inventoryRef = useRef<InventoryRef>()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const popupRef = useRef<PopupRef>()

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    checkWindowWidth()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

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
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, 
          (type, content, subcontent) => {
          popupRef.current.open()
          popupRef.current.popup(type, content, subcontent)
        })
      })

      if (data) {
        handleTxStateChange(title, data.transactionHash, data.status, 
          (type, content, subcontent) => {
          popupRef.current.open()
          popupRef.current.popup(type, content, subcontent)
        })
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED, 
          (type, content, subcontent) => {
          popupRef.current.open()
          popupRef.current.popup(type, content, subcontent)
        })
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
        <TransformWrapper
          initialPositionX={0}
          initialPositionY={0}
          centerOnInit={true}
          wheel={{
            disabled: true,
          }}
          doubleClick={{
            disabled: true,
          }}
          panning={{
            disabled: windowWidth >= 1858,
          }}
        >
          <TransformComponent
            wrapperStyle={{ height: '100vh', width: '100vw' }}
          >
            <div className={styles.supplierContainer}>
              <div className={styles.supplierBg}>
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
            </div>
          </TransformComponent>
        </TransformWrapper>

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
