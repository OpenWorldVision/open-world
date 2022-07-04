import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '@components/castle/castle.module.css'
import CastleModal from '@components/castle/CastleModal'
import LandAuction from '@components/castle/LandAuction'
import {
  ButtonGroup,
  Button,
  Flex,
  useMediaQuery,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@components/castle/mobile/MobileHeaderBar.module.css'
import MobileHeaderBar from '@components/castle/mobile/MobileHeaderBar'
import CastleLayout from '@components/castle/mobile/CastleLayout'
import ModalBuyItem from '@components/ModalBuyItem/ModalBuyItem'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { getOpenBalance } from 'utils/checkBalanceOpen'
import {
  fetchProfessionsNFTAmount,
  fetchProfessionsNFTPrices,
  mintProfessionNFT,
} from 'utils/professions'
import LoadingModal from '@components/LoadingModal'
import { useDispatch } from 'react-redux'
import { setOpenBalance } from 'reduxActions/profileAction'

export default function Castle() {
  // Ref
  const castleOverlay = useRef(null)
  const castle = useRef(null)

  // State
  const [isLandAuctionModalOpen, setIsLandAuctionModalOpen] = useState(false)
  const [isLandAuctionOpen, setIsLandAuctionOpen] = useState(false)
  const [action, setAction] = useState(0)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile] = useMediaQuery('(max-width: 1014px)')
  const [showModalBuy, setShowModalBuy] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null)
  const handleTxStateChange = useTransactionState()
  const { onClose } = useDisclosure()
  const toast = useToast()

  const [nftsAmount, setNftsAmount] = useState({
    openianAmount: 0,
    supplierAmount: 0,
    blacksmithAmount: 0,
  })
  const [nftsPrices, setNftsPrices] = useState({
    openianPrice: '0',
    supplierPrice: '0',
    blacksmithPrice: '0',
  })

  const fetchNFTAmount = useCallback(async () => {
    const amount = await fetchProfessionsNFTAmount()
    setNftsAmount(amount)
  }, [])

  const fetchNFTPrices = useCallback(async () => {
    const prices = await fetchProfessionsNFTPrices()
    setNftsPrices(prices)
  }, [])

  const dispatch = useDispatch()

  const getListNFTs = useMemo(() => {
    const listNFTs = [
      {
        id: 'openian',
        name: 'Openian NFT',
        image: '/images/professions/npc/openianNPC.webp',
        price: nftsPrices.openianPrice,
        available: nftsAmount.openianAmount,
      },
      {
        id: 'supplier',
        name: 'Supplier NFT',
        image: '/images/professions/npc/supplierNPC.webp',
        price: nftsPrices.supplierPrice,
        available: nftsAmount.supplierAmount,
      },
      {
        id: 'blacksmith',
        name: 'Blacksmith NFT',
        image: '/images/professions/npc/smithNPC.webp',
        price: nftsPrices.blacksmithPrice,
        available: nftsAmount.blacksmithAmount,
      },
    ]
    return listNFTs
  }, [
    nftsAmount.blacksmithAmount,
    nftsAmount.openianAmount,
    nftsAmount.supplierAmount,
    nftsPrices.blacksmithPrice,
    nftsPrices.openianPrice,
    nftsPrices.supplierPrice,
  ])

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    checkWindowWidth()
    fetchNFTAmount()
    fetchNFTPrices()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

  const openLandAuctionModal = useCallback((action) => {
    setAction(action)
    setIsLandAuctionOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setShowModalBuy(false)
  }, [setShowModalBuy])

  const _onBuyNFT = useCallback(
    (nft) => {
      //get nft to open modal
      setShowModalBuy(true)
      setSelectedNFT(nft)
    },
    [setShowModalBuy, setSelectedNFT]
  )

  const renderMobileUI = useCallback(() => {
    return (
      <>
        <MobileHeaderBar />
        <CastleLayout onPressBuyNFT={_onBuyNFT} listNFTs={getListNFTs} />
      </>
    )
  }, [_onBuyNFT, getListNFTs])
  const _mintProfessionsNFT = useCallback(
    async (trait) => {
      setShowModalBuy(false)
      setIsLoading(true)
      const balance = parseFloat(await getOpenBalance(false))
      const NTFCardPrice = parseFloat(selectedNFT?.price)
      if (balance >= NTFCardPrice) {
        const title = 'Purchase NFT card'
        const data = await mintProfessionNFT(trait, (txHash) => {
          handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
        })
        if (data) {
          handleTxStateChange(title, data.transactionHash, data.status)
          // await fetchNFTAmount()
        } else {
          handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
        }
      } else {
        toast({
          title: 'Purchase NFT card transaction is failed to excute',
          description: "You don't have enough OPEN to purchase",
          duration: 10000,
          isClosable: true,
          status: 'error',
        })
        onClose()
      }
      fetchNFTAmount()
      fetchNFTPrices()
      setIsLoading(false)
      const newBalance = await getOpenBalance(true)
      dispatch(setOpenBalance(newBalance))
    },
    [
      dispatch,
      fetchNFTAmount,
      fetchNFTPrices,
      handleTxStateChange,
      onClose,
      selectedNFT?.price,
      toast,
    ]
  )

  const _confirmBuy = useCallback(() => {
    const id =
      selectedNFT?.id === 'openian' ? 1 : selectedNFT?.id === 'supplier' ? 2 : 3
    _mintProfessionsNFT(id)
  }, [_mintProfessionsNFT, selectedNFT])

  return (
    <div
      className={
        !isMobile
          ? `${style.castleOverlay} overlay`
          : `${style.castleMobileOverlay} overlay`
      }
    >
      {isLoading && <LoadingModal />}
      <Head>
        <title>Castle</title>
      </Head>
      {isMobile ? (
        <>
          {renderMobileUI()}
          <ModalBuyItem
            isOpen={showModalBuy}
            nft={selectedNFT}
            onClose={closeModal}
            fromCastle={true}
            title={'Buy Items'}
            confirmBuy={_confirmBuy}
          />
        </>
      ) : (
        <div className={styles.webContainer}>
          <div
            ref={castleOverlay}
            className={`${style.castleContainer} overlay`}
          >
            <div ref={castle} className={style.castleBg}>
              <div
                className={`${style.castleBtn} ${style.bankBtn} click-cursor`}
              ></div>
              <div
                className={`${style.castleBtn} ${style.wowBtn} click-cursor`}
              ></div>
              <div
                className={`${style.castleBtn} ${style.landAuctionBtn} click-cursor`}
                // onClick={() => setIsLandAuctionModalOpen(true)}
              ></div>
              <Link href="/castle/shop">
                <a
                  className={`${style.castleBtn} ${style.shopBtn} click-cursor`}
                ></a>
              </Link>
            </div>
          </div>
        </div>
      )}

      <CastleModal
        isOpen={isLandAuctionModalOpen}
        toggleModal={() => setIsLandAuctionModalOpen(false)}
        fancyTitle="Land Auction"
        height={316}
        width={600}
      >
        <ButtonGroup className={style.castleModalBody} colorScheme="#066c45">
          <Flex direction="column">
            <Button
              className="green-button click-cursor"
              height={8}
              onClick={() => openLandAuctionModal(0)}
            >
              View All Lands
            </Button>
            <Button
              className="green-button click-cursor"
              height={8}
              onClick={() => openLandAuctionModal(1)}
            >
              Buy Lands
            </Button>
          </Flex>
        </ButtonGroup>
      </CastleModal>

      <Link href="/">
        <a className={`${style.backBtn} click-cursor`}></a>
      </Link>

      <LandAuction
        action={action}
        isOpen={isLandAuctionOpen}
        toggleLandAuction={() => setIsLandAuctionOpen(false)}
        key={action}
      />
    </div>
  )
}
function trait(trait: any, arg1: (txHash: any) => void) {
  throw new Error('Function not implemented.')
}
