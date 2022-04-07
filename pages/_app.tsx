import '../styles/global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import theme from '../components/theme'
config.autoAddCss = false

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
