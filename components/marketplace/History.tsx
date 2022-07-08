import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cancelListingItem, getListingIDsBySeller, getNumberOfItemListings } from 'utils/NFTMarket'
import styles from './history.module.css'
import useTransactionState, {
    TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import Popup, { PopupRef } from '@components/Popup'

const numOfPage = 4

export default function History() {
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(1)
    const [data, setData] = useState([])
    const [totalItems, setTotalItems] = useState(null)
    const [status, setStatus] = useState('Loading ...')
    const [isOpenNotify, setIsOpenNotify] = useState(null)
    const handleTxStateChange = useTransactionState()
    const popupRef = useRef<PopupRef>()
    
    useEffect(() => {
        getItems()
    }, [nav])

    const getItems = async () => {
        const result = await getListingIDsBySeller()
        if(result.length) {
            setData(result)
        } else {
            setStatus('No results found')
        }
        setTotalItems(await getNumberOfItemListings())
    }

    const handleCancel = async (id: number) => {
        const title = 'Cancel listing item'
        const result = await cancelListingItem(
            id,
            (txHash) => {
                handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING, popupRef)
            }, 
        )
        if (result) {
            setStatus('Loading ...')
            setData([])
            await getItems()
            setIsOpenNotify({ type: true })
        } else setIsOpenNotify({ type: false })
    }

    return (
        <>
            {isOpenNotify ? <div className={styles.main}>
                <div className={styles.containerNotify}>
                    <div className={styles.notifyHeader}>{isOpenNotify.type ? 'SUCCESS' : 'FAILED'}</div>
                    <div className={styles.notifyBody}>{isOpenNotify.type ? 'Your Order has been Completed !' : 'Your Order has been Failed'}</div>
                    <img
                        onClick={() => {setIsOpenNotify(null)}}
                        className={styles.notifyConfirm + ' click-cursor'}
                        src="/images/marketplace/confirm-notify.webp" 
                        alt="img" 
                    />
                </div>
            </div> :
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <div className={styles.col}>
                            <div>BUY</div>
                            <div>SELL</div>
                        </div>
                        <div className={styles.col}>
                            <div>OPENIAN</div>
                            <div>{totalItems?.openianAmount}</div>
                        </div>
                        <div className={styles.col}>
                            <div>SUPPLIER</div>
                            <div>{totalItems?.supplierAmount}</div>
                        </div>
                        <div className={styles.col}>
                            <div>BLACKSMITH</div>
                            <div>{totalItems?.blacksmithAmount}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.nav}>
                        <div
                            onClick={() => {setNav(1)}}
                        >
                            <div className={nav === 1 && styles.select}>OPENIAN</div>
                        </div>
                        <div
                            onClick={() => {setNav(2)}}
                        >
                            <div className={nav === 2 && styles.select}>SUPPLIER</div>
                        </div>
                        <div
                            onClick={() => {setNav(3)}}
                        >
                            <div className={nav === 3 && styles.select}>BLACKSMITH</div>
                        </div>
                        {/* <div
                            onClick={() => {setNav(4)}}
                        >
                            <div className={nav === 4 && styles.select}>COLLECTION</div>
                        </div> */}
                    </div>
                    <div className={styles.boardInfo}>
                        <div className={styles.boardInfoHeader}>
                            <div>NFT ID</div>
                            {/* <div>DATE</div> */}
                            {/* <div>BUYER</div> */}
                            <div>PRICE</div>
                            {/* <div>STATUS</div> */}
                            <div>ACTION</div>
                        </div>
                        <div className={styles.boardInfoItems}>
                            {data.length === 0 && <div className={styles.loading}>{status}</div>}
                            {data.slice((page - 1)*numOfPage, (page - 1)*numOfPage + numOfPage).map(value => (
                                <div key={value} className={styles.boardInfoItem}>
                                    <div>#{value.id}</div>
                                    {/* <div>05/30/2022</div> */}
                                    {/* <div>UNKNOWN</div> */}
                                    <div>{value.price} OPEN</div>
                                    {/* <div>SELLING</div> */}
                                    <div>
                                        <img className='click-cursor' onClick={() => {handleCancel(value.id)}} src="./images/marketplace/history-cancel.webp" alt="img" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.pagination}>
                        <img 
                            onClick={() => {setPage(pagePrev => pagePrev > 1 ? pagePrev - 1 : pagePrev )}}
                            src="./images/marketplace/triangle-left.webp" 
                            alt="img" 
                        />
                        <div>{page < 10 ? `0${page}` : page}</div>
                        <img
                            onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                            src="./images/marketplace/triangle-right.webp" 
                            alt="img" 
                        />
                    </div>
                </div>
                <Link href='/'>
                    <a className={styles.back}>
                        <img src="./images/marketplace/back.webp" alt="img" />
                    </a>
                </Link>
                <Popup ref={popupRef} />
            </div>
            }
        </>
    )
}