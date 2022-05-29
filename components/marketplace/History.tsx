import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getListingIDsBySeller, getNumberOfItemListings } from 'utils/Market'
import styles from './history.module.css'

const numOfPage = 4

export default function History() {
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(1)
    const [data, setData] = useState([])
    const [totalItems, setTotalItems] = useState(null)
    
    useEffect(() => {
        getWeapons()
    }, [nav])

    const getWeapons = async () => {
        setData(await getListingIDsBySeller())
        setTotalItems(await getNumberOfItemListings())
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.col}>
                        <div>BUY</div>
                        <div>SELL</div>
                    </div>
                    <div className={styles.col}>
                        <div>OPENIAN</div>
                        <div>{totalItems.openianAmount}</div>
                    </div>
                    <div className={styles.col}>
                        <div>SUPPLIER</div>
                        <div>{totalItems.supplierAmount}</div>
                    </div>
                    <div className={styles.col}>
                        <div>BLACKSMITH</div>
                        <div>{totalItems.blacksmithAmount}</div>
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
                    <div
                        onClick={() => {setNav(4)}}
                    >
                        <div className={nav === 4 && styles.select}>COLLECTION</div>
                    </div>
                </div>
                <div className={styles.boardInfo}>
                    <div className={styles.boardInfoHeader}>
                        <div>NFT ID</div>
                        <div>DATE</div>
                        <div>BUYER</div>
                        <div>PRICE</div>
                        <div>STATUS</div>
                        <div>ACTION</div>
                    </div>
                    <div className={styles.boardInfoItems}>
                        {data.slice((page - 1)*numOfPage, (page - 1)*numOfPage + numOfPage).map(value => (
                            <div key={value} className={styles.boardInfoItem}>
                                <div>#{value.id}</div>
                                <div>05/30/2022</div>
                                <div>0xA619D31...2F9F6A7D2D</div>
                                <div>100 OPEN</div>
                                <div>SELLING</div>
                                <div>
                                    <img src="./images/marketplace/market/history-cancel.png" alt="img" />
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
                        src="./images/marketplace/market/triangle-left.png" 
                        alt="img" 
                    />
                    <div>{page < 10 ? `0${page}` : page}</div>
                    <img
                        onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                        src="./images/marketplace/market/triangle-right.png" 
                        alt="img" 
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