import { useRef, useState, useCallback, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '@components/castle/castle.module.css'
import CastleModal from '@components/castle/CastleModal'
import LandAuction from '@components/castle/LandAuction'
import { ButtonGroup, Button, Flex, useMediaQuery } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@components/castle/mobile/MobileHeaderBar.module.css'
import MobileHeaderBar from '@components/castle/mobile/MobileHeaderBar'
import CastleLayout from '@components/castle/mobile/CastleLayout'

export default function Castle() {
  // Ref
  const castleOverlay = useRef(null)
  const castle = useRef(null)

  // State
  const [isLandAuctionModalOpen, setIsLandAuctionModalOpen] = useState(false)
  const [isLandAuctionOpen, setIsLandAuctionOpen] = useState(false)
  const [action, setAction] = useState(0)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobile] = useMediaQuery('(max-width: 1014px)')
  const [showModalBuy, setShowModalBuy] = useState(false)

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

  const openLandAuctionModal = useCallback((action) => {
    setAction(action)
    setIsLandAuctionOpen(true)
  }, [])

  const _onBuyNFT = useCallback((nft) => {
    //get nft to open modal
  }, [])

  const renderMobileUI = useCallback(() => {
    return (
      <>
        <MobileHeaderBar />
        <CastleLayout onPressBuyNFT={_onBuyNFT} />
      </>
    )
  }, [])

  return (
    <div className={`${style.castleOverlay} overlay`}>
      <Head>
        <title>{!isMobile ? 'Castle' : 'Mobile Castle'}</title>
      </Head>
      {isMobile ? (
        renderMobileUI()
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
