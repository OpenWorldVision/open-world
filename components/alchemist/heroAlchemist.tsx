import styled from '@emotion/styled'

export default function HeroAlchemist() {
  return (
    <HeroAlchemistStyle>
      <div>
        <div className="hero-alchemist">
          <img
            src="/images/alchemist/hero-alchemist.png"
            alt="hero-alchemist"
          />
        </div>
      </div>
    </HeroAlchemistStyle>
  )
}

const HeroAlchemistStyle = styled.div({
  '.hero-alchemist': {
    position: 'absolute',
    left: '484.176px',
    top: '251.672px',
    width: '77.8723px',
    height: '246.101px',
    zIndex: '188',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '5708.93px',
      height: '251.571px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation:
        '8.5s steps(71) 0s infinite normal none running animate-hero-alchemist',
    },
    '@keyframes animate-hero-alchemist': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-5708.93px',
        top: 0,
      },
    },
  },
})
