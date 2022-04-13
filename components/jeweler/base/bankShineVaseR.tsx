import styled from '@emotion/styled'
import React from 'react'

export default function BankShineVaseR() {
  return (
    <BankShineVaseRStyle>
      <div>
        <div className="bankShine-vaseR">
          <img
            src="/images/jeweler/bankShine-vaseL.png"
            alt="bankShine-vaseR"
          />
        </div>
      </div>
    </BankShineVaseRStyle>
  )
}

const BankShineVaseRStyle = styled.div({
  '.bankShine-vaseR': {
    position: 'absolute',
    left: '788.622px',
    top: '493.054px',
    width: '92.8649px',
    height: '46.4324px',
    zIndex: '400',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '7429.19px',
      height: '46.4324px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation:
        '8.1s steps(81, end) 0s infinite normal none running animate-bankShine-vaseR',
    },
    '@keyframes animate-bankShine-vaseL': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-7429.19px',
        top: 0,
      },
    },
  },
})
