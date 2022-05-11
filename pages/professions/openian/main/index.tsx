import { useEffect, useState } from 'react'
import styles from '@components/professions/openian.module.css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Link from 'next/link';

function Openian() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const checkWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    }

    checkWindowWidth()

    window.addEventListener('resize', checkWindowWidth)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])

  return (
    <div className={`${styles.openianOverlay} overlay game-scroll-bar`}>
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
				wheel={{
					disabled: true
				}}
				panning={{
					disabled: windowWidth >= 1858
				}}
      >
        <TransformComponent
          wrapperStyle={{ height: '100vh', width: '100vw' }}
        >
					<div
            className={`${styles.openianContainer} overlay`}
          >
						<div className={styles.openianBg}>

						</div>
					</div>
				</TransformComponent>
      </TransformWrapper>

			<Link href="/">
				<a className={`${styles.backBtn} click-cursor`}></a>
			</Link>
    </div>
  )
}

export default Openian
