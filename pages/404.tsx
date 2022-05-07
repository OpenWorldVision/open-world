import { VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { MapInteractionCSS } from 'react-map-interaction'
import { keyframes } from '@emotion/react'
import Link from 'next/link'

const valueDefaultInitial = {
  scale: 1.2,
  translation: {
    x: -510,
    y: -2650,
  },
}
export default function Home({ allPostsData }) {
  return (
    <NotFoundPage>
      <div className="containerWorldMap">
        <div className="modal">
          <div className="modal-content">
            <img src="/images/worldmap/OW-logo.png" alt="logo" />
            <div>Coming Soon</div>
            <Link href="/">
              <button>
                <a>BACK TO WORLD MAP</a>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </NotFoundPage>
  )
}
const wordMap_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-40960px, 0);
  }
`
const NotFoundPage = styled.div({
  backgroundColor: 'rgb(148,151,168)',
  // cursor: 'url(/images/worldmap/CursorDefault.png), auto',
  'button, input, select': {
    // cursor: 'url(/images/worldmap/SelectCursor.png), auto',
  },
  '.containerWorldMap': {
    backgroundImage: 'url(/images/background/game-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // cursor: 'url(/images/worldmap/CursorDefault.png), auto',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    zIndex: '10000',
    '.world_map': {
      position: 'absolute',
      minWidth: '40960px',
      height: '5120px',
      animation: `${wordMap_kf} 1.2s steps(8) 0s infinite normal none running`,
    },
  },
  '.modal': {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  '.modal-content': {
    margin: '10% auto',
    padding: '20px',
    maxWidth: '500px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    div: {
      fontSize: '50px',
      color: '#fff',
    },
    button: {
      backgroundImage: 'linear-gradient(to right, #f85474 ,#8937f1)',
      minWidth: '300px',
      height: '50px',
      borderRadius: '15px',
      marginTop: '50px',
      fontWeight: 'bold',
      a: {
        textDecoration: 'none',
      },
      ':hover': {
        backgroundImage: 'linear-gradient(to right, #f85474 ,#8937f1)',
        color: 'black',
      },
    },
  },
})
