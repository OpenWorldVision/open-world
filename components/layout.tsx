import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import Entry from '@components/entry/Entry'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from './LoadingModal'
import { updateIsConnected } from 'reduxActions/isConnectedAction'
import { getProfile } from 'utils/profileContract'
import { getWeb3Client } from '@lib/web3'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

export const siteTitle = 'Open World #Metaverse'

export default function Layout({ children, home }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  // const isProfileExist = useSelector((state: any) => {
  //   return state.ProfileStore.profile
  // })
  const isConnected = useSelector(
    (state: any) => state.IsConnectedStore.isConnected
  )
  const checkConnect = async () => {
    const chainId = await web3.eth.getChainId()
    if (![56, 97, 1666600000, 1666700000].includes(chainId)) {
      await getWeb3Client()
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts) {
        dispatch(updateIsConnected({ isConnected: true}))
      }
    } catch {
      dispatch(updateIsConnected({ isConnected: false}))
    }
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true)
    })

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false)
    })
    checkConnect()
  }, [])
  return (
    <div
      style={{
        cursor: 'url(/images/worldmap/CursorDefault.webp), auto !important',
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />

        <meta property="og:image" content="/images/worldmap/OW-logo.png" />
        <meta property="og:image:width" content="200" />

        <meta property="og:image:height" content="200" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {isLoading && <LoadingModal fullBlack />}

      {!isConnected && <Entry />}
      {isConnected && (
        <>
          {children}
          {!window.location.href.includes('market') && (
            <>
              <Menu />
              <User />
            </>
          )}
        </>
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
