import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { listMultiItems } from 'utils/NFTMarket'
import styles from './dashboard.module.css'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { getHeroes, listingHero } from 'utils/HeroMarketUtils'
import Popup, { PopupRef } from '@components/Popup'

const numOfPage = 8

export default function DashBoard() {
  const [page, setPage] = useState(1)
  const [dataInit, setDataInit] = useState([])
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)
  const [priceInput, setPriceInput] = useState(null)
  const [status, setStatus] = useState('Loading ...')
  const handleTxStateChange = useTransactionState()
  const popupRef = useRef<PopupRef>()

  const getHeroesData = async () => {
    const result = await getHeroes()
    setData(result)
    setDataInit(result)
  }

  useEffect(() => {
    getHeroesData()
  }, [])

  const handleSell = async () => {
    const title = 'Sell item'
    setSelected(null)
    setData([])
    setStatus('Loading ...')
    const result = await listingHero(
      selected.id,
      Number(priceInput),
      (txHash) => {
        handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING,
          (type, content, subcontent) => {
          popupRef.current.open()
          popupRef.current.popup(type, content, subcontent)
        })
      }
    )
    if (result) {
      setDataInit([])
      await getHeroesData()
      handleTxStateChange(title, result.transactionHash, result.status, 
        (type, content, subcontent) => {
        popupRef.current.open()
        popupRef.current.popup(type, content, subcontent)
      })
    } else {
      setData(dataInit)
      setStatus('Loading ...')
      handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED,
        (type, content, subcontent) => {
        popupRef.current.open()
        popupRef.current.popup(type, content, subcontent)
      })
    }
  }
  const renderData = useMemo(() => {
    if (!data) {
      return []
    }
    return data.slice(
      (page - 1) * numOfPage,
      (page - 1) * numOfPage + numOfPage
    )
  }, [data, page])

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.body1}>
          <div>
            {renderData.length === 0 ? (
              <div className={styles.loading}>{status}</div>
            ) : (
              renderData.map((value) => {
                return (
                  <div key={value} className={styles.item}>
                    <div
                      onClick={() => {
                        setSelected(value)
                      }}
                      className={styles.itemInfo + ' click-cursor'}
                    >
                      <div>
                        <div>#{value.id}</div>
                        <img
                          src={`./images/marketplace/items/${value.trait}.webp`}
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        <div className={styles.body2}>
          <div className={styles.sellerBoard}>
            <div className={styles.header}>Selected Item:</div>
            {selected ? (
              <img
                className={styles.selectedImage}
                src={`./images/marketplace/items/${selected.trait}.webp`}
                alt="img"
              />
            ) : (
              <div className={styles.selectedImageFrame} />
            )}
            <div className={styles.priceInput}>
              <div>Price:</div>
              <input
                type="number"
                value={priceInput}
                onChange={(e) =>
                  setPriceInput(e.target.value !== '' && Number(e.target.value))
                }
              />
              <div>OPEN</div>
            </div>
            <div className={styles.containerTotal}>
              Total price: <span>{selected ? priceInput : 0}</span> OPEN
            </div>
            {priceInput > 0 && selected && (
              <div className={styles.btnSell}>
                <img
                  onClick={handleSell}
                  className="click-cursor"
                  src="./images/marketplace/sell.webp"
                  alt="img"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.pagination}>
          <img
            className="click-cursor"
            onClick={() => {
              setPage((pagePrev) => (pagePrev > 1 ? pagePrev - 1 : pagePrev))
            }}
            src="/images/marketplace/triangle-left.webp"
            alt="img"
          />
          <div>{page < 10 ? `0${page}` : page}</div>
          <img
            className="click-cursor"
            onClick={() => {
              setPage((pagePrev) =>
                pagePrev < Math.ceil(data.length / numOfPage)
                  ? pagePrev + 1
                  : pagePrev
              )
            }}
            src="./images/marketplace/triangle-right.webp"
            alt="img"
          />
        </div>
      </div>
      <Link href="/">
        <a className={styles.back}>
          <img
            className="click-cursor"
            src="./images/marketplace/back.webp"
            alt="img"
          />
        </a>
      </Link>
      <Popup ref={popupRef} />
    </div>
  )
}
