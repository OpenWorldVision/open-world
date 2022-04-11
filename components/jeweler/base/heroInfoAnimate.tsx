import styled from '@emotion/styled'
import React from 'react'

export default function HeroInfoAnimate() {
  return (
    <HeroInfoAnimateStyle>
      <div>
        <div className="hero-info">
          <img src="/images/jeweler/banker-idle.png" alt="hero_info" />
        </div>
      </div>
    </HeroInfoAnimateStyle>
  )
}

const HeroInfoAnimateStyle = styled.div({
  '.hero-info': {
    position: 'absolute',
    left: '284.176px',
    top: '571.672px',
    width: '65.081px',
    height: '116.101px',
    zIndex: '188',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '670.368px',
      height: '101.571px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation: '11s steps(11, end) 0s infinite normal none running dKpWqB',
    },
    '@keyframes dKpWqB': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-670px',
        top: 0,
      },
    },
  },
})
