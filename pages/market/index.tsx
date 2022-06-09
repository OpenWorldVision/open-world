import DashBoard from '@components/marketplace/DashBoard'
import Market from '@components/marketplace/Market'
import History from '@components/marketplace/History'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useState } from 'react'
import ErrorPage from 'pages/404'


function MarketPlace() {
  const [nav, setNav] = useState(1)


  return (
      <MarketPlaceCSS>
          <Head>
              <title>Marketplace</title>
          </Head>
          <div className='nav'>
              <div className='nav-items-1'>
                  <img src="./favicon.ico" alt="img" />
                  <div
                      onClick={() => {setNav(1)}}
                      className={nav === 1 ? 'select click-cursor' : 'click-cursor'}
                  >
                      MARKET
                  </div>
              </div>
              <div className='nav-items-2'>
                  <div
                      onClick={() => {setNav(2)}}
                      className={nav === 2 ? 'select click-cursor' : 'click-cursor'}
                  >
                      DASHBOARD
                  </div>
              </div>
              <div className='nav-items-3'>
                  <div
                      onClick={() => {setNav(3)}}
                      className={nav === 3 ? 'select click-cursor' : 'click-cursor'}
                  >
                      HISTORY
                  </div>
              </div>
          </div>
          <div>
              {nav === 1 ? <Market /> : (nav === 2 ? <DashBoard /> : <History />)}
          </div>
      </MarketPlaceCSS>
  )
}

const MarketPlaceCSS = styled.div({
  '.nav': {
    display: 'flex',
    backgroundColor: 'black',
    color: 'white',
    '.nav-items-1': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      img: {
        marginLeft: '100px',
        '@media(max-width: 950px)': {
          marginLeft: '20px',
        },
      },
      '@media(max-width: 520px)': {
        justifyContent: 'flex-end',
        img: {
          display: 'none'
        }
      },
    },
    '.nav-items-2': {
      display: 'flex',
      alignItems: 'center',
    },
    '.nav-items-3': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    '.nav-items-1, .nav-items-2, .nav-items-3': {
      div: {
        padding: '20px 100px',
        fontWeight: '700',
        fontSize: '22px',
        '@media(max-width: 1020px)': {
          padding: '20px 50px',
        },
        '@media(max-width: 640px)': {
          padding: '20px 10px',
        },
        '@media(max-width: 520px)': {
          fontSize: '18px',
          padding: '15px 10px',
        },
      },
      '.select': {
        color: '#FFB966',
      },
    },
  },
})

export default MarketPlace
