import styled from '@emotion/styled';
import React from 'react'

export default function BankShine() {
  return (
    <BankShineStyle>
      <div>
        <div className="bankShine">
          <img
            src="/images/jeweler/bankShine-statue.png"
            alt="bankShine"
          />
        </div>
      </div>
    </BankShineStyle>
  )
}

const BankShineStyle = styled.div({
  '.bankShine': {
    position: 'absolute',
    left: '141.73px',
    top: '113.297px',
    width: '132.162px',
    height: '159.162px',
    zIndex: '400',
    overflow: 'hidden',
    'img': {
      position: 'absolute',
      minWidth: '20894.6px',
      height: '232.162px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation: '9s steps(90, end) 0s infinite normal none running animate-bankShine',
    },
    '@keyframes animate-bankShine': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-20894.6px',
        top: 0,
      }
    }
  },
})
