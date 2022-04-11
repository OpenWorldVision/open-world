import { VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { MapInteractionCSS } from 'react-map-interaction'
import { keyframes } from '@emotion/react'
import Link from 'next/link'


const valueDefaultInitial = {
  scale: 1.2,
  translation: {
    x: -510,
    y: -2650
  },
}
export default function Home({ allPostsData }) {
  return (
    <VStack>
      <WorldMap>
        <MapInteractionCSS
          defaultValue={valueDefaultInitial}
          minScale={0.6} maxScale={1.3}
          disableZoom
          disablePan
        >
          <div className='containerWorldMap'>
            <img className='world_map' src='/images/worldmap/WorldMapXmasPro.png' alt='img' />
          </div>
        </MapInteractionCSS>
        <div className="modal">
          <div className="modal-content">
            <img src="/images/worldmap/Logo.png" alt="logo" />
            <div>Coming Soon</div>
            <Link href="/">
              <button>
                <a>BACK TO WORLD MAP</a>
              </button>
            </Link>
          </div>
        </div>
      </WorldMap>
    </VStack>
  )
}
const wordMap_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-40960px, 0);
  }
`;
const WorldMap = styled.div({
  backgroundColor: 'rgb(148,151,168)',
  cursor: 'url(/images/worldmap/CursorDefault.png), auto',
  'button, input, select': {
    cursor: 'url(/images/worldmap/SelectCursor.png), auto',
  },
  '.containerWorldMap': {
    cursor: 'url(/images/worldmap/CursorDefault.png), auto',
    width: '5120px',
    height: '5120px',
    overflow: 'hidden',
    position: 'relative',
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
    backgroundColor: 'rgba(0,0,0,0.9)',
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
      color: 'rgb(253,206,110)'
    },
    button: {
      backgroundColor: 'rgb(0,156,68)',
      minWidth: '300px',
      height: '50px',
      borderRadius: '15px',
      marginTop: '50px',
      fontWeight: 'bold',
      a: {
        textDecoration: 'none'
      },
      ':hover': {
        backgroundColor: 'rgb(253,206,110)',
        color: 'black'
      }
    }
  }
})