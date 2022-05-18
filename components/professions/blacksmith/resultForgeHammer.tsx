import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from './resultForgeHammer.module.css'

type Props = {
  hammerReceived: number
}

export default function ResultForgeHammer(props: Props) {
  const { hammerReceived } = props
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <div className={`${!isLoading && style.loadedResultForgeHammer}`}>
        <div className={`overlay ${style.preLoaderResultForgeHammer}`}>
          <div className={style.preloaderFoldingCube}>
            <div className={`${style.preloaderCube1} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube2} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube4} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube3} ${style.preloaderCube}`}></div>
          </div>
        </div>
      </div>
      <div className={style.resultContainer}>
        <h3 className={style.finished}>
          <img
            src="/images/professions/blacksmith/finished.png"
            alt="Finished"
          />
        </h3>
        <div className={style.frameHead}>
            <Link href="/professions/blacksmith">
              <a className={style.exitBtn}></a>
            </Link>
          </div>
        <div className={style.content}>
          <div className={style.title}>You Get</div>
          <div className={style.received}>X{hammerReceived} <div className={style.hammer}></div></div>
          <div className={style.helpText}>All the Hammers you make will be stored at your Inventory</div>
          <Button className={style.btnConfirm}></Button>
        </div>
      </div>
    </>
  )
}