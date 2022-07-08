import DashBoard from '@components/marketplace/DashBoard'
import Market from '@components/marketplace/Market'
import History from '@components/marketplace/History'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useState } from 'react'
import { Box, Center } from '@chakra-ui/react'

function MarketPlace() {
  const [nav, setNav] = useState(1)

  return (
    <MarketPlaceCSS>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Box
        display="flex"
        justifyContent="space-evenly"
        gap={2}
        backgroundColor="black"
      >
        <Box>
          <Center
            onClick={() => {
              setNav(1)
            }}
            className={nav === 1 ? 'select click-cursor' : 'click-cursor'}
            color="white"
          >
            MARKET
          </Center>
        </Box>
        <Box>
          <Center
            onClick={() => {
              setNav(2)
            }}
            className={nav === 2 ? 'select click-cursor' : 'click-cursor'}
            color="white"
          >
            DASHBOARD
          </Center>
        </Box>
      </Box>

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
        '@media(max-width: 950px)': {
          marginLeft: '20px',
        },
      },
      '@media(max-width: 520px)': {
        justifyContent: 'flex-end',
        img: {
          display: 'none',
        },
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
