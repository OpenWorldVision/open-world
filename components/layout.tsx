import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import BtnWorldMap from './worldmap/BtnWorldMap'
import { useEffect, useState } from 'react'

export const siteTitle = 'Open World #Metaverse'

export default function Layout({ children, home }) {
  const [currentURL, setCurentURL] = useState('')
  useEffect(() => {
    setCurentURL(window.location.href)
  }, [])

  const checkCurrentPage = () => {
    // const urlCurrent = window.location.href
    const isAlchemist = currentURL.includes('alchemist')
    const isCastle = currentURL.includes('castle')
    const isDocks = currentURL.includes('docks')
    const isGardens = currentURL.includes('gardens')
    const isJeweler = currentURL.includes('jeweler')
    const isMarketPlace = currentURL.includes('marketplace')
    const isMeditation = currentURL.includes('meditation-circle')
    const isPortal = currentURL.includes('portal')
    const isProfessions = currentURL.includes('professions')
    const isTavern = currentURL.includes('tavern')
    if (
      isAlchemist ||
      isCastle ||
      isDocks ||
      isGardens ||
      isJeweler ||
      isMarketPlace ||
      isMeditation ||
      isPortal ||
      isProfessions ||
      isTavern
    ) {
      return <BtnWorldMap />
    }
  }

  return (
    <div
      style={{ cursor: 'url(/images/default-cursor.png), auto' }}
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
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        {children}
        <Menu />
        <User />
        {checkCurrentPage()}
      </main>
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
