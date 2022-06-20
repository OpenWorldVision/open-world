import DashBoard from '@components/marketplace/DashBoard'
import Market from '@components/marketplace/Market'
import History from '@components/marketplace/History'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useState } from 'react'
import ErrorPage from 'pages/404'

function MarketPlace() {
  const [nav, setNav] = useState(1)

  // return <ErrorPage />

  return (
    <MarketPlaceCSS>
      <Head>
        <title>MarketPlace</title>
      </Head>
      <div className="nav">
        <div className="nav-items-1">
          <img src="./favicon.ico" alt="img" />
          <div
            onClick={() => {
              setNav(1)
            }}
            className={nav === 1 && 'select'}
          >
            MARKET
          </div>
        </div>
        <div className="nav-items-2">
          <div
            onClick={() => {
              setNav(2)
            }}
            className={nav === 2 && 'select'}
          >
            DASHBOARD
          </div>
        </div>
        <div className="nav-items-3">
          <div
            onClick={() => {
              setNav(3)
            }}
            className={nav === 3 && 'select'}
          >
            HISTORY
          </div>
        </div>
      </div>
      <div>
        {nav === 1 ? <Market /> : nav === 2 ? <DashBoard /> : <History />}
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
        padding: '25px 100px',
        fontWeight: '700',
        fontSize: '22px',
      },
      '.select': {
        color: '#FFB966',
      },
    },
  },
})

export default MarketPlace
