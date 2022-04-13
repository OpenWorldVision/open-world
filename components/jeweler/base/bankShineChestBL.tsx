import styled from '@emotion/styled'
import React from 'react'

export default function BankShineChestBL() {
  return (
    <BankShineChestBLStyle>
      <div>
        <div className="bankShine-chestBL">
          <img
            src="/images/jeweler/bankShine-chestBL.png"
            alt="bankShine-chestBL"
          />
        </div>
      </div>
    </BankShineChestBLStyle>
  )
}

const BankShineChestBLStyle = styled.div({
  '.bankShine-chestBL': {
    position: 'absolute',
    left: '70px',
    top: '717.081px',
    width: '92.8649px',
    height: '139.297px',
    zIndex: '400',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '8079.24px',
      height: '139.297px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation:
        '8.7s steps(87, end) 0s infinite normal none running animate-bankShine-chestBL',
    },
    '@keyframes animate-bankShine-chestBL': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-8079.24px',
        top: 0,
      },
    },
  },
})
