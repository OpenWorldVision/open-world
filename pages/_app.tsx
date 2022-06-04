import '../styles/global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import '@fortawesome/fontawesome-svg-core/styles.css'
import theme from '../components/theme'
import Layout from '@components/layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'reducers'
import { AnimatePresence } from 'framer-motion'

// config.autoAddCss = false

function getLibrary(provider, connector) {
  return new providers.JsonRpcProvider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

export default function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout home>
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </Web3ReactProvider>
  )
}
