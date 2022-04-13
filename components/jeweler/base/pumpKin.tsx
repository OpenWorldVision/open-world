import styled from '@emotion/styled'
import React from 'react'

export default function PumpKin() {
  return (
    <PumpKinStyle>
      <div>
        <div className="pumpkin">
          <img src="/images/jeweler/Pumpkin01.png" alt="pumpkin" />
        </div>
      </div>
    </PumpKinStyle>
  )
}

const PumpKinStyle = styled.div({
  '.pumpkin': {
    position: 'absolute',
    left: '1206px',
    top: '612.081px',
    width: '33.8649px',
    height: '29.297px',
    zIndex: '400',
    overflow: 'hidden',
    'img:': {
      position: 'absolute',
      width: '63.8649px',
      height: '79.8649px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
    },
  },
})
