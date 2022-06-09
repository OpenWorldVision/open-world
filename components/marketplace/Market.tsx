import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getListingIDs, purchaseItems } from 'utils/NFTMarket'
import styles from './market.module.css'

const numOfPage = 12

export default function Market() {
    const [isOpenSortPrice, setIsOpenSortPrice] = useState(false)
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(0)
    const [dataInit, setDataInit] = useState([])
    const [data, setData] = useState([])
    const [status, setStatus] = useState('Loading ...')
    const [isOpenNotify, setIsOpenNotify] = useState(null)

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        const result = await getListingIDs(false, true)
        if(result.length) {
            setDataInit(result)
            setData(result)
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
        const result = await purchaseItems(value.id, value.items, async (error) => {
            setStatus('Loading ...')
            setDataInit([])
            setData([])
            await getItems()
            setIsOpenNotify({ 
                type: 'FAILED',
                content: error
            })
        })
        if (result) {
            setIsOpenNotify({ 
                type: 'SUCCESS',
                content: 'Your Order has been Completed'
            })
        }

    }

    const changeNav = (nav: number) => {
        setNav(nav)
        setPage(1)
        if (nav === 0) {
            if (!dataInit.length) {
                setStatus('No results found')
                setData([])
            } else {
                setData(dataInit)
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
                setData(result)
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
                setData(result)
            }
        }
    }

    return (
        <>
            {isOpenNotify ? <div className={styles.main}>
                <div className={styles.containerNotify}>
                    <div className={styles.notifyHeader}>{isOpenNotify.type}</div>
                    <div className={styles.notifyBody}>{isOpenNotify.content}</div>
                    <img
                        onClick={() => {setIsOpenNotify(null)}}
                        className={styles.notifyConfirm + ' click-cursor'}
                        src="/images/marketplace/confirm-notify.png" 
                        alt="img" 
                    />
                </div>
            </div> : <div className={styles.main}>
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
                            <div className={nav === 4 ? styles.select + ' click-cursor' : 'click-cursor'}>MY COLLECTION</div>
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
                    {data.length === 0 && <div className={styles.loading}>{status}</div>}
                    {data.slice((page - 1) * numOfPage, (page - 1) * numOfPage + numOfPage).map(value => {
                        return <div key={value} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <div>#{value.id} HALLEN</div>
                                    <img src={`/images/marketplace/items/${value.trait}.png`} alt="img" />
                                </div>
                                <div>{value.price} OPEN</div>
                            </div>
                            {nav !== 4 && <div className={styles.itemBuy}>
                                <img className='click-cursor' onClick={() => handlePurchase(value)} src="./images/marketplace/buy.png" alt="img" />
                            </div>}
                        </div>
                    })}
                </div>
                <div className={styles.footer}>
                    <div className={styles.pagination}>
                        <img 
                            onClick={() => {setPage(pagePrev => pagePrev > 1 ? pagePrev - 1 : pagePrev )}}
                            src="./images/marketplace/triangle-left.png" 
                            alt="img"
                            className='click-cursor' 
                        />
                        <div>{page < 10 ? `0${page}` : page}</div>
                        <img
                            onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                            src="./images/marketplace/triangle-right.png" 
                            alt="img" 
                            className='click-cursor' 
                        />
                    </div>
                </div>
                <Link href='/'>
                    <a className={styles.back}>
                        <img src="./images/marketplace/back.png" alt="img" />
                    </a>
                </Link>
            </div>
            }
        </>
    )
}