import styled from '@emotion/styled'

export default function HeroArnold() {
  return (
    <HeroArnoldStyle>
      <div>
        <div className="arnold-sheet">
          <img src="/images/alchemist/arnold-sheet.png" alt="arnold-sheet" />
        </div>
      </div>
    </HeroArnoldStyle>
  )
}

const HeroArnoldStyle = styled.div({
  '.arnold-sheet': {
    position: 'absolute',
    left: '178.176px',
    top: '361.672px',
    width: '95.8723px',
    height: '156.101px',
    zIndex: '1000',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '614.609px',
      height: '147.25px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation:
        '4s steps(6) 0s infinite normal none running animate-arnold-sheet',
    },
    '@keyframes animate-arnold-sheet': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-614.609px',
        top: 0,
      },
    },
  },
})
