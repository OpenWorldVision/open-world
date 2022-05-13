// @ts-nocheck
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

let web3Client = null
let web3Provider = null

//rebuild

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: 'c02c03ef50ed46209d9e14eb1c30ce29', // required
      rpc: {
        56: 'https://bsc-dataseed.binance.org/',
        97: 'https://speedy-nodes-nyc.moralis.io/eba7d2e0234f08d2741c13aa/bsc/testnet',
        1666600000: 'https://api.harmony.one',
        1666700000: 'https://api.s0.b.hmny.io',
      },
    },
  },
}

export const getWeb3Client = async () => {
  try {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    })

    if (!web3Provider) {
      web3Provider = await web3Modal.connect()
    }

    if (!web3Client)
      web3Client = new Web3(web3Provider, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        timeout: 20000, // ms

        clientConfig: {
          // Useful if requests are large
          maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
          maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

          // Useful to keep a connection alive
          keepalive: true,
          keepaliveInterval: 60000, // ms
        },
      })

    return { web3Client, web3Provider }
  } catch (error) {}
}
