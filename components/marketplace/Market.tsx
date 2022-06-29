import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cancelListingItem, getListingIDs, purchaseItems } from 'utils/NFTMarket'
import styles from './market.module.css'
import useTransactionState, {
    TRANSACTION_STATE,
} from 'hooks/useTransactionState'

const numOfPage = 12

export default function Market() {
    const [isOpenSortPrice, setIsOpenSortPrice] = useState(false)
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(0)
    const [dataInit, setDataInit] = useState([])
    const [data, setData] = useState([])
    const [status, setStatus] = useState('Loading ...')
    const handleTxStateChange = useTransactionState()

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        const result = await getListingIDs(false, true)
        const dataResult = []
        for (const i of result) if (i.trait !== 4) dataResult.push(i)
        if(result.length) {
            setDataInit(dataResult)
            setData(dataResult)
        } else {
            setStatus('No results found')
        }
    }

    const sortHighest = () => {
        changeNav(nav)
        setIsOpenSortPrice(false)
        setData(data.sort((a, b) => b.price - a.price))
    }
    
    const sortLowest = () => {
        changeNav(nav)
        setIsOpenSortPrice(false)
        setData(data.sort((a, b) => a.price - b.price))
    }

    const sortId = (id) => {
        if (id !== '') {
            if (nav === 0) {
                if (!dataInit.length) {
                    setStatus('No results found')
                    setData([])
                } else {
                    setData(dataInit.filter(value => value.id === Number(id)))
                }
            }
            else if (nav === 4) {
                const result = dataInit.filter(value => {
                    return value.isOwner
                })
                if (!result.length) {
                    setStatus('No results found')
                    setData([])
                } else {
                    setData(result.filter(value => value.id === Number(id)))
                }
            }
            else {
                const result = dataInit.filter(value => {
                    return value.trait === nav
                })
                if (!result.length) {
                    setStatus('No results found')
                    setData([])
                } else {
                    setData(result.filter(value => value.id === Number(id)))
                }
            }
        } else {
            changeNav(nav)
        }
    }

    const handlePurchase = async (value) => {
        const title = 'Purchase item'
        setData([])
        setStatus('Loading ...')
        const result = await purchaseItems(
            parseInt(value?.id), 
            value?.items, 
            (txHash) => {
                handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
            }, 
            async (error) => {
                setData(dataInit)
                setStatus('Loading ...')
            }
        )
        if (result) {
            setDataInit([])
            await getItems()
            handleTxStateChange(title, result.transactionHash, result.status)
        } else {
            handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
        }
    }

    const handleCancel = async (value) => {
        const title = 'Cancel listing item'
        const result = await cancelListingItem(
            value?.id,
            (txHash) => {
                handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
            }, 
        )
        if (result) {
            setStatus('Loading ...')
            setData([])
            await getItems()
            handleTxStateChange(title, result.transactionHash, result.status)
        } else {
            handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
        }
    }

    const changeNav = (nav: number) => {
        setNav(nav)
        setPage(1)
        if (nav === 0) {
            if (!dataInit.length){
                setStatus('No results found')
                setData([])
            } else {
                setData(dataInit)
            }
        }
        else if (nav === 4) {
            const result = dataInit.filter(value => value.isOwner)
            if (!result.length) {
                setStatus('No results found')
                setData([])
            } else {
                setData(result)
            }
        }
        else {
            const result = dataInit.filter(value => {
                return value.trait === nav && !value.isOwner
            })
            if (!result.length) {
                setStatus('No results found')
                setData([])
            } else {
                setData(result)
            }
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.nav1}>
                    <div
                        onClick={() => {changeNav(0)}}
                    >
                        <div className={nav === 0 ? styles.select + ' click-cursor' : 'click-cursor'}>ALL</div>
                    </div>
                    <div
                        onClick={() => {changeNav(1)}}
                    >
                        <div className={nav === 1 ? styles.select + ' click-cursor' : 'click-cursor'}>OPENIAN</div>
                    </div>
                    <div
                        onClick={() => {changeNav(2)}}
                    >
                        <div className={nav === 2 ? styles.select + ' click-cursor' : 'click-cursor'}>SUPPLIER</div>
                    </div>
                    <div
                        onClick={() => {changeNav(3)}}
                    >
                        <div className={nav === 3 ? styles.select + ' click-cursor' : 'click-cursor'}>BLACKSMITH</div>
                    </div>
                    <div
                        onClick={() => {changeNav(4)}}
                    >
                        <div className={nav === 4 ? styles.select + ' click-cursor' : 'click-cursor'}>MY LISTING</div>
                    </div>
                </div>
                <div className={styles.nav2}>
                    <div>
                        <div
                            onClick={() => {setIsOpenSortPrice(isOpenSortPricePrev => !isOpenSortPricePrev)}}
                        >SORT PRICE</div>
                        {isOpenSortPrice && (
                            <div className={styles.sortPriceBoard}>
                                <div onClick={() => {sortHighest()}}>HIGHEST</div>
                                <div onClick={() => {sortLowest()}}>LOWEST</div>
                            </div>
                        )}
                    </div>
                    <input type="number" placeholder='NFT ID' onChange={(e) => {sortId(e.target.value)}} />
                </div>
            </div>
            <div className={styles.body}>
                <div>
                    {data.length === 0 ? <div className={styles.loading}>{status}</div>
                    : data.slice((page - 1) * numOfPage, (page - 1) * numOfPage + numOfPage).map(value => {
                        return <div key={value} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <div>#{value.id} HALLEN</div>
                                    <img src={`/images/marketplace/items/${value.trait}.webp`} alt="img" />
                                </div>
                                <div>{value.price} OPEN</div>
                            </div>
                            {nav !== 4 ? <div className={styles.itemBuy}>
                                <img className='click-cursor' onClick={() => handlePurchase(value)} src="./images/marketplace/buy.webp" alt="img" />
                            </div> : <div className={styles.itemCancel}>
                                {/* <img className='click-cursor' onClick={() => handlePurchase(value)} src="./images/marketplace/buy.webp" alt="img" /> */}
                                <div onClick={() => handleCancel(value)} className='click-cursor'>CANCEL</div>
                            </div>}
                        </div>
                    })}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.pagination}>
                    <img 
                        onClick={() => {setPage(pagePrev => pagePrev > 1 ? pagePrev - 1 : pagePrev )}}
                        src="./images/marketplace/triangle-left.webp" 
                        alt="img"
                        className='click-cursor' 
                    />
                    <div>{page < 10 ? `0${page}` : page}</div>
                    <img
                        onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                        src="./images/marketplace/triangle-right.webp" 
                        alt="img" 
                        className='click-cursor' 
                    />
                </div>
            </div>
            <Link href='/'>
                <a className={styles.back}>
                    <img src="./images/marketplace/back.webp" alt="img" />
                </a>
            </Link>
        </div>
    )
}