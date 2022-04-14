import styled from '@emotion/styled'

type Props = {
  top: number
  left: number
  contentButton: string
}

export default function AlchemistBtnAnimate(props: Props) {
  const { top, left, contentButton } = props
  return (
    <AlchemistBtnAnimateStyle>
      <div>
        <div style={{ top, left }} className="alchemist-popup">
          <button className="btn-alchemist-animate cursor-btn">
            <div className="btn-content">{contentButton}</div>
            <img src="/images/jeweler/bubble-arrow.png" alt="img" />
          </button>
        </div>
      </div>
    </AlchemistBtnAnimateStyle>
  )
}

const AlchemistBtnAnimateStyle = styled.div({
  '.alchemist-popup': {
    position: 'absolute',
    '.btn-alchemist-animate': {
      animation: '4.5s ease-in-out 0s infinite normal none running animate-btn',
      'pointer-events': 'revert !important',
      position: 'relative',
      backgroundImage:
        'url(/images/jeweler/text-bubble-left.png), url(/images/jeweler/text-bubble-right.png)',
      backgroundPosition: 'left top, right top',
      backgroundRepeat: 'repeat-y',
      backgroundColor: 'rgb(255, 224, 183)',
      backgroundSize: '11.6081px 8.70608px',
      imageRendering: 'initial',
      left: '-50%',
      zIndex: '2000',
      border: '0',
      img: {
        position: 'absolute',
        width: '14.2162px',
        height: '20.3142px',
        imageRendering: 'pixelated',
        left: '55%',
        transform: 'translateX(-50%)',
        zIndex: '2002',
      },
    },
    '@keyframes animate-btn': {
      '0%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(10px)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    },
    '.btn-alchemist-animate::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '-11.6081px',
      left: '11.6081px',
      width: '71px',
      height: '45px',
      backgroundImage:
        ' url(/images/jeweler/text-bubble-top.png), url(/images/jeweler/text-bubble-btm.png)',
      backgroundPosition: 'center top, center bottom',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '46.4324px 11.6081px',
    },
    '.btn-alchemist-animate::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '-11.6081px',
      left: '0',
      width: '109px',
      height: '45px',
      backgroundImage:
        'url(/images/jeweler/text-bubble-topLeft.png),' +
        'url(/images/jeweler/text-bubble-topRight.png),' +
        'url(/images/jeweler/text-bubble-btmLeft.png),' +
        'url(/images/jeweler/text-bubble-btmRight.png)',
      backgroundPosition: 'left top, right top, left bottom, right bottom',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '26.1182px 24.1182px',
    },
    '.btn-content': {
      position: 'relative',
      textAlign: 'center',
      color: 'rgb(0, 0, 0)',
      padding: '0 10.9223px',
      fontFamily: 'Lora, serif',
      fontWeight: 'bold',
      zIndex: '2003',
      fontSize: 'calc(15.1182px)',
      marginLeft: '11px',
    },
  },
})
