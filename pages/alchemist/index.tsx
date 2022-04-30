import { VStack } from '@chakra-ui/react'
import Layout, { siteTitle } from '@components/layout'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useState } from 'react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import {
  AlchemistBgAnimate,
  AlchemistBtnAnimate,
  HeroAlchemist,
  HeroArnold,
  AlchemistModal,
  ArnoldModal,
} from '../../components/alchemist/index'

export default function Alchemist() {
  const [isAlchemistModalOpen, setIsAlchemistModalOpen] = useState(false)
  const [isArnoldModalOpen, setIsArnoldModalOpen] = useState(false)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <VStack>
        <AlchemistPage>
          <div>
            <div className="container_alchemist">
              <TransformWrapper
                maxScale={2}
                minScale={0.25}
                initialScale={0.8}
                centerZoomedOut={true}
                initialPositionX={0}
                initialPositionY={0}
                centerOnInit={true}
              >
                <TransformComponent>
                  <div className="alchemist container">
                    <AlchemistBgAnimate />
                    <HeroAlchemist />
                    <AlchemistBtnAnimate
                      top={242.868}
                      left={518.216}
                      contentButton="Alchemist"
                    />
                    <HeroArnold />
                    <button
                      onClick={() => {
                        setIsAlchemistModalOpen(true)
                      }}
                      className="layout-btn btn-alchemist cursor-btn"
                    ></button>
                    <button
                      onClick={() => {
                        setIsArnoldModalOpen(true)
                      }}
                      className="layout-btn btn-arnold cursor-btn"
                    ></button>
                  </div>
                </TransformComponent>
              </TransformWrapper>
              <AlchemistModal
                isOpen={isAlchemistModalOpen}
                toggleModal={() => setIsAlchemistModalOpen(false)}
                fancyTitle="Alchemist"
                height={264}
                width={700}
                npcDialogue="Double bubble, toil...wait, no. That`s not right. Grumble, grumble, toil and trouble? No! What do you need? Can you remember the incantation?"
                npcName="Herbert"
              />
              <ArnoldModal
                isOpen={isArnoldModalOpen}
                toggleModal={() => setIsArnoldModalOpen(false)}
                fancyTitle="Alchemist Assistance"
                height={264}
                width={700}
                npcDialogue="Potion making requires attention to detail, something I always remind Herbert of every time he blows off his beard! Perhaps if he was a little more organized he`d be able to see the warning labels?"
                disabled={true}
                npcName="Arnold"
              />
            </div>
          </div>
        </AlchemistPage>
      </VStack>
    </Layout>
  )
}

const AlchemistPage = styled.div({
  '.container_alchemist': {
    backgroundColor: '#131313',
    height: '100vh',
    width: '100vw',
    padding: '0 !important',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // cursor: 'url(/images/jeweler/default-cursor.png), auto',
    overflow: 'hidden',
    '.alchemist': {
      position: 'absolute',
      backgroundImage: 'url(/images/alchemist/alchemist-bg.png)',
      minWidth: '1318px',
      height: '992.97px',
      zIndex: '1',
      backgroundSize: '100%',
      imageRendering: 'pixelated',
      backgroundRepeat: 'no-repeat',
      margin: '0 auto',
      '.btn-alchemist': {
        top: '241px',
        left: '474px',
        height: '230px',
      },
      '.btn-arnold': {
        top: '334px',
        left: '187px',
        height: '172px',
      },
    },
    '.react-transform-wrapper.transform-component-module_wrapper__1_Fgj': {
      width: '100%',
      height: '100%',
    },
    '.react-transform-component.transform-component-module_content__2jYgh': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '@media (max-width: 768px)': {
      '.react-transform-wrapper.transform-component-module_wrapper__1_Fgj': {
        width: '350%',
        height: '150%',
      },
      '.react-transform-component.transform-component-module_content__2jYgh': {
        width: '350%',
        height: '150%',
      },
    },
  },
})
