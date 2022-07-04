import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Menu from '@components/worldmap/Menu'
import User from '@components/worldmap/User'
import Entry from '@components/entry/Entry'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from './LoadingModal'
import { updateIsConnected } from 'reduxActions/isConnectedAction'
import Shop, { ShopRef } from '@components/Shop'
import Inventory, { InventoryRef } from '@components/professions/Inventory'
import WorldMenu from '@components/worldmap/WorldMenu'
import { useMediaQuery } from '@chakra-ui/react'
import Shop, { ShopRef } from '@components/Shop'
import Inventory, { InventoryRef } from '@components/professions/Inventory'
import WorldMenu from '@components/worldmap/WorldMenu'

export const siteTitle = 'Open World #Metaverse'

export default function Layout({ children, home }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentActiveMenu, setCurrentActiveMenu] = useState<
    'inventory' | 'shop' | 'town' | 'none'
  >('town')
  const [isMobile] = useMediaQuery('(max-width: 1014px)')
  const [currentActiveMenu, setCurrentActiveMenu] = useState<
    'inventory' | 'shop' | 'town' | 'none'
  >('town')
  const dispatch = useDispatch()
  const shopRef = useRef<ShopRef>()
  const inventoryRef = useRef<InventoryRef>()

  const isCastleMobileUI = isMobile && window.location.href.includes('castle')

  const isConnected = useSelector(
    (state: any) => state.IsConnectedStore.isConnected
  )
  const checkConnect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts) {
        dispatch(updateIsConnected({ isConnected: true }))
      }
    } catch {
      dispatch(updateIsConnected({ isConnected: false }))
    }
  }

  const handleOpenShop = useCallback(() => {
    if (inventoryRef.current?.isOpen) {
      inventoryRef.current?.close()
    }

    shopRef.current?.open()

    if (!shopRef.current?.isOpen) {
      setCurrentActiveMenu('shop')
    } else {
      checkIfAtTown()
    }
  }, [])

  const handleOpenInventory = useCallback(() => {
    if (shopRef.current?.isOpen) {
      shopRef.current?.close()
    }

    inventoryRef.current?.open()

    if (!inventoryRef.current?.isOpen) {
      setCurrentActiveMenu('inventory')
    } else {
      checkIfAtTown()
    }
  }, [])

  const handleReturnToTown = useCallback(() => {
    if (inventoryRef.current?.isOpen) {
      inventoryRef.current?.close()
    }

    if (shopRef.current?.isOpen) {
      shopRef.current?.close()
    }

    router.push('/')
    setCurrentActiveMenu('town')
  }, [])

  const checkIfAtTown = useCallback(() => {
    if (window.location.pathname === '/') {
      setCurrentActiveMenu('town')
    } else {
      setCurrentActiveMenu('none')
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true)
    })

    router.events.on('routeChangeComplete', () => {
      checkIfAtTown()
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
          {window.location.href.includes('market') ||
          isCastleMobileUI ? null : (
            <header className={styles.headerMenu}>
              <Menu />
              <User />
            </header>
          )}
          {/* @ts-ignore */}
          <Shop ref={shopRef} />
          <Inventory ref={inventoryRef} />
          <WorldMenu
            currentType={currentActiveMenu}
            onOpenShop={handleOpenShop}
            onReturnToTown={handleReturnToTown}
            onOpenInventory={handleOpenInventory}
          />
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
