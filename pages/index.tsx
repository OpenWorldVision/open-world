import Head from 'next/head'
import { useCallback, useEffect, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '@components/worldmap/worldMap.module.css'
import Navigation from '@components/worldmap/Navigation'
import { getWeb3Client } from '@lib/web3'
import { updateIsConnected } from 'reduxActions/isConnectedAction'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const transformWrapper = useRef(null)
  const dispatch = useDispatch()
  
  const isConnected = useSelector(
    (state: any) => state.IsConnectedStore.isConnected
  )

  const checkConnect = async () => {
    if (!isConnected) {
      const web3Client = await getWeb3Client()
      dispatch(updateIsConnected({ isConnected: !!web3Client}))
    }
  }

  const checkWhenZoom = useCallback(() => {
    transformWrapper.current.centerView()
  }, [])

  useEffect(() => {
    checkConnect()
  }, [])

  return (
    <>
      <Head>
        <title>World Map</title>
      </Head>

      <div className={`${style.worldMapOverlay} overlay`}>
        <TransformWrapper
          ref={transformWrapper}
          maxScale={2.5}
          minScale={1}
          initialScale={1}
          centerZoomedOut={true}
          minPositionX={100}
          limitToBounds={true}
          minPositionY={0}
          maxPositionY={100}
          centerOnInit={true}
          onZoomStop={checkWhenZoom}
        >
          <TransformComponent
            wrapperStyle={{ height: '100vh', width: '100vw' }}
          >
            <div className={style.worldMapContainer}>
              <Navigation />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  )
}
