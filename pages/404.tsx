import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Link from 'next/link'
import Head from 'next/head'
import { Wrap, Text } from '@chakra-ui/react'

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Open World</title>
      </Head>
      <NotFoundPage>
        <Wrap className="containerWorldMap">
          <div className="modal">
            <div className="modal-content">
              <img src="/images/worldmap/OW-logo.png" alt="logo" />
              <Text fontSize="5xl" fontWeight="bold">
                Coming Soon
              </Text>
              <Link href="/" passHref>
                <button className="click-cursor">
                  <Text fontWeight="bold">BACK TO WORLD MAP</Text>
                </button>
              </Link>
            </div>
          </div>
        </Wrap>
      </NotFoundPage>
    </>
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
  cursor: 'url(/images/worldmap/CursorDefault.webp), auto',
  'button, input, select': {
    cursor: 'url(/images/worldmap/SelectCursor.webp), auto',
  },
  '.containerWorldMap': {
    backgroundImage: 'url(/images/background/game-bg.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    cursor: 'url(/images/worldmap/CursorDefault.webp), auto',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    zIndex: '999999',
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
    button: {
      backgroundImage: 'linear-gradient(to right, #f85474 ,#8937f1)',
      minWidth: '300px',
      height: '50px',
      borderRadius: '15px',
      marginTop: '50px',
      fontWeight: 'bold',
      ':hover': {
        backgroundImage: 'linear-gradient(to right, #f85474 ,#8937f1)',
        color: 'black',
      },
    },
  },
})
