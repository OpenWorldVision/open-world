import Link from 'next/link'
import { useState } from 'react'
import styles from './market.module.css'

const numOfPage = 12

export default function Market() {
    const [isOpenSortPrice, setIsOpenSortPrice] = useState(false)
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(1)

    
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.nav1}>
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
                <div className={styles.nav2}>
                    <div>
                        <div
                            onClick={() => {setIsOpenSortPrice(isOpenSortPricePrev => !isOpenSortPricePrev)}}
                        >SORT PRICE</div>
                        {isOpenSortPrice && (
                            <div className={styles.sortPriceBoard}>
                                <div>HIGHEST</div>
                                <div>LOWEST</div>
                            </div>
                        )}
                    </div>
                    <input type="text" placeholder='NFT ID' />
                </div>
            </div>
            <div className={styles.body}>
                {test.slice((page - 1)*numOfPage, (page - 1)*numOfPage + numOfPage).map(value => {
                    return <div key={value} className={styles.item}>
                        <div className={styles.itemInfo}>
                            <div>
                                <div>#1 HALLEN</div>
                                <img src={`./images/marketplace/market/items/${nav}.png`} alt="" />
                            </div>
                            <div>100 OPEN</div>
                        </div>
                        <div className={styles.itemBuy}>
                            <img src="./images/marketplace/market/buy.png" alt="img" />
                        </div>
                    </div>
                })}
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
                        onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(test.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
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