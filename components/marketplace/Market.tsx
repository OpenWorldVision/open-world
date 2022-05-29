import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getWeaponListingIDsPage, purchaseListing } from 'utils/Market'
import styles from './market.module.css'

const numOfPage = 6

export default function Market() {
    const [isOpenSortPrice, setIsOpenSortPrice] = useState(false)
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        getWeapons()
    }, [nav])

    const getWeapons = async () => {
        setData(await getWeaponListingIDsPage(numOfPage, page, nav))
    }

    const increasePage = async () => {
        const result = await getWeaponListingIDsPage(numOfPage, page + 1, nav)
        if (result.length > 0) {
            setData(result)
            setPage(page => page + 1)
        }
        
    }

    const decreasePage = async () => {
        if (page - 1 > 0) {
            const result = await getWeaponListingIDsPage(numOfPage, page - 1, nav)
            setData(result)
            setPage(page => page - 1)
        }
    }

    const sortHighest = () => {
        setIsOpenSortPrice(false)
        setData(data => data.sort((a, b) => a.price - b.price))
    }
    
    const sortLowest = () => {
        setIsOpenSortPrice(false)
        setData(data => data.sort((a, b) => b.price - a.price))
    }

    const sortId = () => {
        setIsOpenSortPrice(false)
        setData(data => data.sort((a, b) => b.price - a.price))
    }

    const handlePurchase = async (value) => {
        await purchaseListing(value.id, value.price)
    }

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.nav1}>
                    <div
                        onClick={() => {setData([]), setNav(1)}}
                    >
                        <div className={nav === 1 && styles.select}>OPENIAN</div>
                    </div>
                    <div
                        onClick={() => {setData([]), setNav(2)}}
                    >
                        <div className={nav === 2 && styles.select}>SUPPLIER</div>
                    </div>
                    <div
                        onClick={() => {setData([]), setNav(3)}}
                    >
                        <div className={nav === 3 && styles.select}>BLACKSMITH</div>
                    </div>
                    <div
                        onClick={() => {setData([]), setNav(4)}}
                    >
                        <div className={nav === 4 && styles.select}>COLLECTION</div>
                    </div>
                </div>
                <div className={styles.nav2}>
                    <div>
                        <div
                            onClick={() => {setIsOpenSortPrice(isOpenSortPricePrev => !isOpenSortPricePrev)}}
                        >SORT PRICE</div>
                        {isOpenSortPrice && (
                            <div className={styles.sortPriceBoard}>
                                <div onClick={sortHighest}>HIGHEST</div>
                                <div onClick={sortLowest}>LOWEST</div>
                            </div>
                        )}
                    </div>
                    <input type="text" placeholder='NFT ID'  />
                </div>
            </div>
            <div className={styles.body}>
                {data.map(value => {
                    return <div key={value} className={styles.item}>
                        <div className={styles.itemInfo}>
                            <div>
                                <div>#{value.id} HALLEN</div>
                                <img src={`./images/marketplace/market/items/${nav}.png`} alt="" />
                            </div>
                            <div>{value.price} OPEN</div>
                        </div>
                        <div className={styles.itemBuy}>
                            <img className='click-cursor' onClick={() => handlePurchase(value)} src="./images/marketplace/market/buy.png" alt="img" />
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.footer}>
                <div className={styles.pagination}>
                    <img 
                        onClick={() => {decreasePage()}}
                        src="./images/marketplace/market/triangle-left.png" 
                        alt="img"
                        className='click-cursor' 
                    />
                    <div>{page < 10 ? `0${page}` : page}</div>
                    <img
                        onClick={() => {increasePage()}}
                        src="./images/marketplace/market/triangle-right.png" 
                        alt="img" 
                        className='click-cursor' 
                    />
                </div>
            </div>
            <Link href='/'>
                <a className={styles.back}>
                    <img src="./images/marketplace/market/back.png" alt="img" />
                </a>
            </Link>
        </div>
    )
}