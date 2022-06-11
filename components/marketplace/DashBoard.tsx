import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAmountItemByTrait, listMultiItems } from 'utils/NFTMarket'
import styles from './dashboard.module.css'

const numOfPage = 8

export default function DashBoard() {
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(0)
    const [dataInit, setDataInit] = useState([])
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null)
    const [priceInput, setPriceInput] = useState(null)
    const [status, setStatus] = useState('Loading ...')
    const [isOpenNotify, setIsOpenNotify] = useState(null)
    
    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        const result = await getAmountItemByTrait()
        if(result.length) {
            setDataInit(result)
            setData(result)
        } else {
            setStatus('No results found')
        }
    }

    const handleSell = async () => {
        setSelected(null)
        setData([])
        setStatus('Loading ...')
        const result = await listMultiItems([selected.id], Number(priceInput))
        if (result) {
            setDataInit([])
            await getItems()
            setIsOpenNotify({ type: true })
        } else {
            setData(dataInit)
            setStatus('Loading ...')
            setIsOpenNotify({ type: false })
        }
    }

    const sortId = (id: string) => {
        if (id !== '') {
            if (nav === 0) {
                if (!dataInit.length) {
                    setStatus('No results found')
                    setData([])
                } else {
                    setData(dataInit.filter(value => value.id === Number(id)))
                }
            }
            // else if (nav === 4) {
            //     const result = dataInit.filter(value => {
            //         return value.isOwner
            //     })
            //     if (!result.length) {
            //         setStatus('No results found')
            //         setData([])
            //     } else {
            //         setData(result.filter(value => value.id === Number(id)))
            //     }
            // }
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

    const changeNav = (nav: number) => {
        setNav(nav)
        setSelected(null)
        setPage(1)
        if (nav === 0) {
            if (!dataInit.length) {
                setStatus('No results found')
                setData([])
            } else {
                setData(dataInit)
            }
        }
        // else if (nav === 4) {
        //     const result = dataInit.filter(value => {
        //         return value.isOwner
        //     })
        //     if (!result.length) {
        //         setStatus('No results found')
        //         setData([])
        //     } else {
        //         setData(result)
        //     }
        // }
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
                    <div className={styles.notifyHeader}>{isOpenNotify.type ? 'SUCCESS' : 'FAILED'}</div>
                    <div className={styles.notifyBody}>{isOpenNotify.type ? 'Your Order has been Completed !' : 'Your Order has been Failed'}</div>
                    <img
                        onClick={() => {setIsOpenNotify(null)}}
                        className={styles.notifyConfirm + ' click-cursor'}
                        src="/images/marketplace/confirm-notify.png" 
                        alt="img" 
                    />
                </div>
            </div> : 
            <div className={styles.main}>
                <div className={styles.nav}>
                    <div className={styles.nav1}>
                        <div>MY NFT</div>
                        <input type="text" placeholder='NFT ID' onChange={(e) => {sortId(e.target.value)}} />
                    </div>
                    <div className={styles.nav2}>
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
                        {/* <div
                            onClick={() => {changeNav(4)}}
                        >
                            <div className={nav === 4 ? styles.select + ' click-cursor' : 'click-cursor'}>MY COLLECTION</div>
                        </div> */}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.body1}>
                        <div>
                            {data.length === 0 ? <div className={styles.loading}>{status}</div>
                            : data.slice((page - 1) * numOfPage, (page - 1) * numOfPage + numOfPage).map(value => {
                                return <div key={value} className={styles.item}>
                                    <div onClick={() => {setSelected(value)}} className={styles.itemInfo + ' click-cursor'}>
                                        <div>
                                            <div>#{value.id} HALLEN</div>
                                            <img src={`./images/marketplace/items/${value.trait}.png`} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles.body2}>
                        <div className={styles.sellerBoard}>
                            <div className={styles.header}>Selected Item:</div>
                            {selected ? 
                                <img className={styles.selectedImage} src={`./images/marketplace/items/${selected.trait}.png`} alt="img" /> 
                                : <div className={styles.selectedImageFrame} />
                            }
                            <div className={styles.priceInput}>
                                <div>Price:</div>
                                <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value !== '' && Number(e.target.value))} />
                                <div>OPEN</div>
                            </div>
                            <div className={styles.containerTotal}>Total price: <span>{selected ? priceInput : 0}</span> OPEN</div>
                            {(priceInput > 0) && selected && <div className={styles.btnSell}>
                                <img onClick={() => {handleSell()}} className='click-cursor' src="./images/marketplace/sell.png" alt="img" />
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.pagination}>
                        <img 
                            className='click-cursor'
                            onClick={() => {setPage(pagePrev => pagePrev > 1 ? pagePrev - 1 : pagePrev )}}
                            src="/images/marketplace/triangle-left.png" 
                            alt="img" 
                        />
                        <div>{page < 10 ? `0${page}` : page}</div>
                        <img
                            className='click-cursor'
                            onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                            src="./images/marketplace/triangle-right.png" 
                            alt="img" 
                        />
                    </div>
                </div>
                <Link href='/'>
                    <a className={styles.back}>
                        <img className='click-cursor' src="./images/marketplace/back.png" alt="img" />
                    </a>
                </Link>
            </div>
            }
        </>
    )
}