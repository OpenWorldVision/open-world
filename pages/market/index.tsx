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
    <div style={{
      position: 'relative',
      zIndex: 1,
    }}>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Box
        display="flex"
        justifyContent="space-evenly"
        gap={2}
        backgroundColor="black"
        style={{
          padding: '16px'
        }}
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
    </div>
  )
}

export default MarketPlace
