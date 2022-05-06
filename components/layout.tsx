import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import Entry from '@components/entry/Entry'
import { useCallback, useState, useEffect } from 'react'
import BtnWorldMap from './worldmap/BtnWorldMap'

export const siteTitle = 'Open World #Metaverse'

export default function Layout({ children, home }) {
  const [connected, setConnected] = useState(false)

  const checkIsConnected = useCallback((status) => {
    console.log(`Connected change from ${connected} to ${status}`)
    setConnected(status)
  }, [])

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
      {!connected && (
        <Entry checkIsConnected={(status) => checkIsConnected(status)} />
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
