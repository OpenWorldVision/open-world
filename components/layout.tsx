import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import Entry from '@components/entry/Entry'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import BtnWorldMap from './worldmap/BtnWorldMap'
import { getWeb3Client } from '@lib/web3'
import { useDispatch, useSelector } from 'react-redux'
import { updateIsConnected } from 'reduxActions/isConnectedAction'
import LoadingModal from './LoadingModal'
import { motion } from 'framer-motion'

export const siteTitle = 'Open World #Metaverse'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function Layout({ children, home }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const isConnected = useSelector((state: any) => {
    return state.IsConnectedStore.isConnected
  })
  const checkConnect = async () => {
    setCurrentURL(window.location.href)
    const web3Client = await getWeb3Client()
    if (!web3Client) {
      dispatch(updateIsConnected({ isConnected: false }))
    }
  }
  const [currentURL, setCurrentURL] = useState('')
  useEffect(() => {
    checkConnect()
    setCurrentURL(window.location.href)

    router.events.on('routeChangeStart', () => {
      setIsLoading(true)
    })

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false)
    })
  }, [])

  const handleBackToWorldMap = () => {
    setCurrentURL('')
  }

  const checkCurrentPage = () => {
    const isArena = currentURL.includes('battleArena')
    const isCastle = currentURL.includes('castle')
    const isFoodCourt = currentURL.includes('foodCourt')
    const isMarketPlace = currentURL.includes('marketplace')
    const isProfessions = currentURL.includes('professions')
    const isWorkshop = currentURL.includes('workshop')
    if (
      // isArena ||
      // isFoodCourt ||
      // isMarketPlace ||
      isCastle
      // isProfessions
      // isWorkshop
    ) {
      return <BtnWorldMap backToWorldMap={handleBackToWorldMap} />
    }
  }

  return (
    <div
      style={{
        cursor: 'url(/images/worldmap/CursorDefault.webp), auto !important',
      }}
      className={`${styles.container} ${!isLoading && styles.loaded}`}
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
        <motion.main
          variants={variants}
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: 'linear' }} // Set the transition to linear
          className=""
        >
          {children}
          {!window.location.href.includes('market') && (
            <>
              <Menu />
              <User />
            </>
          )}
          {checkCurrentPage()}
        </motion.main>
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
