import '../styles/global.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
function getLibrary(provider, connector) {
  return new providers.JsonRpcProvider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

export default function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  )
}
