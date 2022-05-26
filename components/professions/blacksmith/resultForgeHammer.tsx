import { Button, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from './resultForgeHammer.module.css'

import { makeHammer } from 'utils/blackSmithContract'

type Props = {
  hammerReceived: number
  numberYourOre: Array<number>
  hiddenPopupResult: () => void
}

export default function ResultForgeHammer(props: Props) {
  const { hammerReceived, numberYourOre, hiddenPopupResult } = props
  const [isLoading, setIsLoading] = useState(true)

  const [checkIsSucess, setCheckIsSuccess] = useState(false)
  console.log(checkIsSucess);

  const handleForgeHammer = async () => {
    const forgeHammer = await makeHammer(numberYourOre[0], numberYourOre[1])
    setIsLoading(false)
    setCheckIsSuccess(forgeHammer)
  }

  useEffect(() => {
    handleForgeHammer()
  }, [])

  const handleConfirm = () => {
    if (!checkIsSucess) {
      hiddenPopupResult()
    }
  }

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
          {checkIsSucess ? <><div className={style.title}>You Get</div><div className={style.received}>X{hammerReceived} <div className={style.hammer}></div></div><div className={style.helpText}>All the Hammers you make will be stored at your Inventory</div></>
            : <div className={style.title}>FAILED!!</div>
          }
          <Button onClick={handleConfirm} className={style.btnConfirm}></Button>
        </div>
      </div>
    </>
  )
}