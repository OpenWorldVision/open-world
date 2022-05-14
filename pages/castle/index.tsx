import { useRef, useState, useCallback } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '../../components/castle/castle.module.css'
import CastleBtn from '../../components/castle/CastleBtn'
import CastleModal from './../../components/castle/CastleModal'
import LandAuction from './../../components/castle/LandAuction'
import { ButtonGroup, Button, Flex, VStack } from '@chakra-ui/react'
import Layout from '@components/layout'
import Head from 'next/head'

export default function Castle() {
  // Ref
  const transformWrapper = useRef(null)
  const castleOverlay = useRef(null)
  const castle = useRef(null)

  // State
  const [isLandAuctionModalOpen, setIsLandAuctionModalOpen] = useState(false)
  const [isLandAuctionOpen, setIsLandAuctionOpen] = useState(false)
  const [isJesterModalOpen, setIsJesterModalOpen] = useState(false)
  const [action, setAction] = useState(0)

  const openLandAuctionModal = useCallback((action) => {
    setAction(action)
    setIsLandAuctionOpen(true)
  }, [])

  return (
    <div className={`${style.castleOverlay} overlay`}>
      <Layout home>
        <Head>
          <title>Castle</title>
        </Head>
        <VStack>
          <TransformWrapper
            ref={transformWrapper}
            maxScale={2}
            minScale={0.25}
            initialScale={0.8}
            centerZoomedOut={true}
            initialPositionX={0}
            initialPositionY={0}
            centerOnInit={true}
            // onZoomStop={() => {transformWrapper.current.centerView()}}
          >
            <TransformComponent
              wrapperStyle={{ height: '100vh', width: '100vw' }}
            >
              <div
                ref={castleOverlay}
                className={`${style.castleContainer} overlay`}
              >
                <div ref={castle} className={style.castleBg}>
                  {/* fire */}
                  <div className={`${style.fireWrap} ${style.fireWrap1}`}>
                    <div className={style.fire}></div>
                  </div>
                  <div className={`${style.fireWrap} ${style.fireWrap2}`}>
                    <div className={style.fire}></div>
                  </div>
                  <div className={`${style.fireWrap} ${style.fireWrap3}`}>
                    <div className={style.fire}></div>
                  </div>

                  {/* hall light  */}
                  <div
                    className={`${style.hallLightWrap} ${style.hallLightWrap1}`}
                  >
                    <div className={style.hallLight}></div>
                  </div>

                  <div
                    className={`${style.hallLightWrap} ${style.hallLightWrap2}`}
                  >
                    <div className={style.hallLigh}></div>
                  </div>

                  <div
                    className={`${style.hallLightWrap} ${style.hallLightWrap3}`}
                  >
                    <div className={style.hallLight}></div>
                  </div>

                  {/* torch  */}
                  <div className={`${style.torchWrap} ${style.torchWrap1}`}>
                    <div className={style.torch}></div>
                  </div>
                  <div className={`${style.torchWrap} ${style.torchWrap2}`}>
                    <div className={style.torch}></div>
                  </div>

                  {/* beast  */}
                  <div className={`${style.beastWrap} ${style.beastWrap1}`}>
                    <div className={style.beast1}></div>
                  </div>

                  <div className={`${style.beastWrap} ${style.beastWrap2}`}>
                    <div className={style.beast2}></div>
                  </div>

                  {/* throne light  */}
                  <div
                    className={`${style.throneLightWrap} ${style.throneLightWrap}`}
                  >
                    <div className={style.throneLight}></div>
                  </div>

                  {/* Jester */}
                  <div className={style.jesterContainer}>
                    <div className={style.jester}></div>
                  </div>

                  <div
                    className={`${style.jesterGrandleBtn} click-cursor`}
                    onClick={() => setIsJesterModalOpen(true)}
                  >
                    <CastleBtn title="Jester Grandle" />
                  </div>

                  {/* Land aution */}
                  <div
                    className={`${style.landAuctionBtn} click-cursor`}
                    onClick={() => setIsLandAuctionModalOpen(true)}
                  >
                    <CastleBtn title="Land Auction" />
                  </div>
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
            <ButtonGroup
              className={style.castleModalBody}
              colorScheme="#066c45"
            >
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

          <LandAuction
            action={action}
            isOpen={isLandAuctionOpen}
            toggleLandAuction={() => setIsLandAuctionOpen(false)}
            key={action}
          />

          <CastleModal
            isOpen={isJesterModalOpen}
            toggleModal={() => setIsJesterModalOpen(false)}
            fancyTitle="The Jester"
            height={264}
            width={700}
            disabled={true}
            npcDialogue="Ho there! Looking for adventure, fun, or a bit of both? I know a place not far from here. It's not quite ready yet, but be sure to come back in a few weeks, I'm sure it'll be an interesting place for you to visit, hehehe!"
            npcName="Jester Grandle"
          />
        </VStack>
      </Layout>
    </div>
  )
}
