import styled from '@emotion/styled'

export default function AlchemistBgAnimate() {
  return (
    <AlchemistBgAnimateStyle>
      <div>
        <div className="alchemist-bg-animate">
          <img
            src="/images/alchemist/alchemist-bg-animation.png"
            alt="alchemist-bg-animate"
          />
        </div>
      </div>
    </AlchemistBgAnimateStyle>
  )
}

const AlchemistBgAnimateStyle = styled.div({
  '.alchemist-bg-animate': {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '1312px',
    height: '992.97px',
    zIndex: '400',
    overflow: 'hidden',
    img: {
      position: 'absolute',
      minWidth: '10560px',
      height: '973.97px',
      imageRendering: 'pixelated',
      transform: 'scale(1, 1)',
      animation:
        '0.8s steps(8) 0s infinite normal none running animate-alchemist-bg-animate',
    },
    '@keyframes animate-alchemist-bg-animate': {
      '0%': {
        left: 0,
        top: 0,
      },
      '100%': {
        left: '-10560px',
      },
    },
  },
})
