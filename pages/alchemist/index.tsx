import styled from '@emotion/styled'
import React, { useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import AlchemistBgAnimate from '../../components/alchemist/alchemistBgAnimate'
import HeroAlchemist from '../../components/alchemist/heroAlchemist'
import AlchemistBtnAnimate from '../../components/alchemist/alchemistBtnAnimate'
import AlchemistModal from '../../components/alchemist/alchemistModal'

export default function Alchemist(props) {
  const [isAlchemistModalOpen, setIsAlchemistModalOpenn] = useState(false)

  return (
    <AlchemistPage>
      <div>
        <div className="container-alchemist">
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
              <div className="alchemist container transform-component">
                <AlchemistBgAnimate />
                <HeroAlchemist />
                <AlchemistBtnAnimate
                  top={242.868}
                  left={518.216}
                  contentButton="Alchemist"
                />
                <button
                  onClick={() => {
                    setIsAlchemistModalOpenn(true)
                  }}
                  className="layout-btn btn-alchemist cursor-btn"
                ></button>
              </div>
            </TransformComponent>
          </TransformWrapper>
          <AlchemistModal
            isOpen={isAlchemistModalOpen}
            toggleModal={() => setIsAlchemistModalOpenn(false)}
            fancyTitle="Alchemist"
            height={264}
            width={700}
            npcDialogue="Double bubble, toil...wait, no. That’s not right. Grumble, grumble, toil and trouble? No! What do you need? Can you remember the incantation?"
            npcName="Herbert"
          />
        </div>
      </div>
    </AlchemistPage>
  )
}

const AlchemistPage = styled.div({
  '.container-alchemist': {
    backgroundColor: '#131313',
    height: '100vh',
    width: '100vw',
    padding: '0 !important',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'url(/images/CursorDefault.png), auto',
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
