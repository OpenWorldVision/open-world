import { useRef, useState, useCallback, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '@components/castle/castle.module.css'
import CastleModal from '@components/castle/CastleModal'
import LandAuction from '@components/castle/LandAuction'
import { ButtonGroup, Button, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Castle() {
  // Ref
  const castleOverlay = useRef(null)
  const castle = useRef(null)

  // State
  const [isLandAuctionModalOpen, setIsLandAuctionModalOpen] = useState(false)
  const [isLandAuctionOpen, setIsLandAuctionOpen] = useState(false)
  const [action, setAction] = useState(0)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

  return (
    <div className={`${style.castleOverlay} overlay`}>
      <Head>
        <title>Castle</title>
      </Head>
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
        <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw' }}>
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
        </TransformComponent>
      </TransformWrapper>

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
