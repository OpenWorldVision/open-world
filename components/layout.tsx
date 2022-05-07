import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import Entry from '@components/entry/Entry'
import { useCallback, useState, useEffect } from 'react'
import BtnWorldMap from './worldmap/BtnWorldMap'

import { chainName } from 'utils/chainName'
import { getBalanceOfOpen } from '../utils/checkBalanceOpen'
import { getWeb3Client } from '@lib/web3'
import { faTruckField } from '@fortawesome/free-solid-svg-icons'

export const siteTitle = 'Open World #Metaverse'

export default function Layout({ children, home }) {
  const [connected, setConnected] = useState(false)
  const [nameOfChain, setNameOfChain] = useState('Binance Smart Chain')
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false)
  const [isEntry, setIsEntry] = useState(false)

  console.log(isEntry)
  const [currentURL, setCurentURL] = useState('')
  useEffect(() => {
    setCurentURL(window.location.href)
  }, [])

  const handleBackToWorldMap = () => {
    setCurentURL('')
  }

  const checkCurrentPage = () => {
    const isArena = currentURL.includes('battleArena')
    const isCastle = currentURL.includes('castle')
    const isFoodCourt = currentURL.includes('foodCourt')
    const isMarketPlace = currentURL.includes('market')
    const isProfessions = currentURL.includes('professions')
    const isWorkshop = currentURL.includes('workshop')
    if (
      // isArena ||
      // isFoodCourt ||
      // isMarketPlace ||
      isCastle ||
      isProfessions
      // isWorkshop
    ) {
      return <BtnWorldMap backToWorldMap={handleBackToWorldMap} />
    }
  }
  //deploy cloudfare 2
  useEffect(() => {
    try {
      const connectWallet = async () => {
        if (window.ethereum) {
          const chainId = window?.ethereum?.chainId
          setNameOfChain(chainName[chainId] || '')
          if (
            chainId === '0x63564c40' ||
            chainId === '0x6357d2e0' ||
            chainId === '0x61'
          ) {
            window.ethereum
              .request({ method: 'eth_requestAccounts' })
              .then(() => {
                setConnected(true)
                setIsEntry(false)
                localStorage.setItem('checkConnect', 'true')
              })
              .catch(() => {
                setConnected(false)
                setIsEntry(true)
                localStorage.setItem('checkConnect', 'false')
              })
          } else {
            window.ethereum
              .request({ method: 'eth_requestAccounts' })
              .then(() => {
                setConnected(true)
                setIsEntry(false)
                localStorage.setItem('checkConnect', 'true')
                window.ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x63564c40' }],
                  })
                  .then(() => {
                    setConnected(true)
                    setIsEntry(false)
                    localStorage.setItem('checkConnect', 'true')
                  })
                  .catch((error) => {
                    window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '0x63564c40',
                          chainName: 'Harmony Mainnet',
                          rpcUrls: ['https://api.harmony.one'],
                          nativeCurrency: {
                            name: 'ONE',
                            symbol: 'ONE',
                            decimals: 18,
                          },
                        },
                      ],
                    })
                  })
              })
              .catch(() => {
                setConnected(false)
                setIsEntry(true)
                localStorage.setItem('checkConnect', 'false')
              })
          }
        }
      }
      connectWallet()
      checkTokenWasAdded()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const subscribeChainChanged = window.ethereum.on(
        'chainChanged',
        async () => {
          setTimeout(async () => {
            await connectWallet()
          }, 1000)
        }
      )
      const subscribeWalletChanged = window.ethereum.on(
        'accountsChanged',
        async () => {
          setTimeout(async () => {
            await checkTokenWasAdded()
          }, 1000)
        }
      )
      return () => {
        if (typeof subscribeChainChanged === 'function') {
          subscribeChainChanged()
        }
        if (typeof subscribeWalletChanged === 'function') {
          subscribeWalletChanged()
        }
      }
    } catch (error: unknown) {
      setIsEntry(true)
      setOpenModalAddWallet(true)
    }
  }, [])
  const checkTokenWasAdded = async () => {
    const web3Client = await getWeb3Client()
    const balance = await getBalanceOfOpen(web3Client)
    if (balance === 0) {
      const tokenAddress = '0x27a339d9B59b21390d7209b78a839868E319301B'
      const tokenSymbol = 'OPEN'
      const tokenDecimals = 18
      const tokenImage =
        'https://nomics.com/imgpr/https%3A%2F%2Fs3.us-east-2.amazonaws.com%2Fnomics-api%2Fstatic%2Fimages%2Fcurrencies%2FXBLADE.jpeg?width=96'
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: tokenImage,
              },
            },
          })
        } catch (error: unknown) {}
      }
    }
  }

  return (
    <div
      // style={{ cursor: 'url(/images/default-cursor.png), auto' }}
      className={styles.container}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
        {/* <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        /> */}
        <meta
          property="og:image"
          // content={`https://og-image.vercel.app/${encodeURI(
          //   siteTitle
          // )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}

          // content={`/images/favicon-3${encodeURI(siteTitle)}.png`}
          content="/images/worldmap/OW-logo.png"
        />
        <meta property="og:image:width" content="200" />

        <meta property="og:image:height" content="200" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {isEntry && (
        <Entry nameOfChain={nameOfChain} openModalAddWalletProp={openModalAddWallet} />
      )}
      {connected && (
        <main>
          {children}
          <Menu />
          <User />
          {checkCurrentPage()}
        </main>
      )}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
