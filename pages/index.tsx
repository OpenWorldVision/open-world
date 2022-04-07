import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'
import { VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { MapInteractionCSS } from 'react-map-interaction'
import { keyframes } from '@emotion/react'

import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <VStack>
        <WorldMap>
          <MapInteractionCSS
            defaultValue={valueDefaultInitial}
            minScale={0.6} maxScale={1.3}
          >
            <div className='containerWorldMap'>
              <img className='world_map' src='/images/WorldMapXmasPro.png' alt='img' />
              <Link href='/castle'>
                <a className='castle' >
                  <img src='/images/Castle.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/portal'>
                <a className='portal' >
                  <img src='/images/Portal.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/marketplace'>
                <a className='marketplace' >
                  <img src='/images/Marketplace.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/docks'>
                <a className='docks' >
                  <img src='/images/Docks.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/professions'>
                <a className='professions' >
                  <img src='/images/Professions.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/gardens'>
                <a className='gardens' >
                  <img src='/images/Gardens.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/tavern'>
                <a className='tavern' >
                  <img src='/images/Tavern.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/jeweler'>
                <a className='jeweler' >
                  <img src='/images/Jeweler.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/alchemist'>
                <a className='alchemist' >
                  <img src='/images/Alchemist.png' alt='img' />
                  <button></button>
                </a>
              </Link>
              <Link href='/meditation_circle'>
                <a className='meditation_circle' >
                  <img src='/images/MeditationCircle.png' alt='img' />
                  <button></button>
                </a>
              </Link>
            </div>
          </MapInteractionCSS>
          <Menu />
          <User />
        </WorldMap>
      </VStack>
    </Layout >
  )
}
export async function getStaticProps() {
  // const allPostsData = getSortedPostsData()
  const allPostsData =  []
  return {
    props: {
      allPostsData,
    },
  }
}
const wordMap_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-40960px, 0);
  }
`;
const items_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, -12px);
  }
`;
const WorldMap = styled.div({
  backgroundColor: 'rgb(148,151,168)',
  cursor: 'url(/images/CursorDefault.png), auto',
  'button, input, select': {
    cursor: 'url(/images/SelectCursor.png), auto',
  },
  '.containerWorldMap': {
    cursor: 'url(/images/CursorDefault.png), auto',
    width: '5120px',
    height: '5120px',
    overflow: 'hidden',
    position: 'relative',
    '.castle, .portal, .marketplace, .docks, .professions, .gardens, .tavern, .jeweler, .alchemist': {
      cursor: 'url(/images/SelectCursor.png), auto',
    },
    '.world_map': {
      position: 'absolute',
      minWidth: '40960px',
      height: '5120px',
      animation: `${wordMap_kf} 1.2s steps(8) 0s infinite normal none running`,
    },
    '.castle': {
      position: 'absolute',
      left: '2500px',
      top: '2125px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '124px',
        height: '45px',
      },
      button: {
        position: 'absolute',
        left: '-92px',
        top: '64px',
        width: '302px',
        height: '215px'
      }
    },
    '.portal': {
      position: 'absolute',
      left: '2168px',
      top: '2390px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '121px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0px',
        top: '50px',
        width: '114px',
        height: '90px'
      }
    },
    '.marketplace': {
      position: 'absolute',
      left: '2470px',
      top: '2492px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '178px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '29px',
        top: '60px',
        width: '122px',
        height: '124px'
      }
    },
    '.docks': {
      position: 'absolute',
      left: '2140px',
      top: '2626px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '128px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '-90px',
        top: '94px',
        width: '240px',
        height: '170px'
      }
    },
    '.professions': {
      position: 'absolute',
      left: '2290px',
      top: '2828px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '172px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0',
        top: '32px',
        width: '170px',
        height: '127px'
      }
    },
    '.gardens': {
      position: 'absolute',
      left: '2740px',
      top: '2380px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '148px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '50px',
        width: '110px',
        height: '100px'
      }
    },
    '.tavern': {
      position: 'absolute',
      left: '2350px',
      top: '2582px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '130px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '10px',
        top: '30px',
        width: '115px',
        height: '96px'
      }
    },
    '.jeweler': {
      position: 'absolute',
      left: '2708px',
      top: '2618px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '142px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0',
        top: '30px',
        width: '115px',
        height: '96px'
      }
    },
    '.alchemist': {
      position: 'absolute',
      left: '2795px',
      top: '2558px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '160px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '44px',
        width: '90px',
        height: '88px'
      }
    },
    '.meditation_circle': {
      position: 'absolute',
      left: '2822px',
      top: '2805px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '220px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '44px',
        width: '220px',
        height: '88px'
      }
    },
  },
})