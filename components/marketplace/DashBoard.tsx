import Link from 'next/link'
import { useEffect, useState } from 'react'
import { addListing, getAmountItemByTrait } from 'utils/Market'
import styles from './dashboard.module.css'

const numOfPage = 12

export default function DashBoard() {
    const [page, setPage] = useState(1)
    const [nav, setNav] = useState(1)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null)
    const [priceInput, setPriceInput] = useState(null)
    const [status, setStatus] = useState('Loadding ...')
    
    useEffect(() => {
        getWeapons()
    }, [nav])

    const getWeapons = async () => {
        setStatus('Loadding ...')
        setData(await getAmountItemByTrait(nav))
        setStatus('No results found')
    }

    const handleSell = async () => {
        await addListing(selected, priceInput)
        await getWeapons()
    }

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <div className={styles.nav1}>
                    <div>MY NFT</div>
                    <input type="text" placeholder='NFT ID' />
                </div>
                <div className={styles.nav2}>
                    <div
                        className='click-cursor'
                        onClick={() => {setNav(1)}}
                    >
                        <div className={nav === 1 && styles.select}>OPENIAN</div>
                    </div>
                    <div
                        className='click-cursor'
                        onClick={() => {setNav(2)}}
                    >
                        <div className={nav === 2 && styles.select}>SUPPLIER</div>
                    </div>
                    <div
                        className='click-cursor'
                        onClick={() => {setNav(3)}}
                    >
                        <div className={nav === 3 && styles.select}>BLACKSMITH</div>
                    </div>
                    <div
                        className='click-cursor'
                        onClick={() => {setNav(4)}}
                    >
                        <div className={nav === 4 && styles.select}>COLLECTION</div>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.body1}>
                    {data.length === 0 && <div className={styles.loading}>{status}</div>}
                    {data.slice((page - 1) * numOfPage, (page - 1) * numOfPage + numOfPage).map(value => {
                        return <div key={value} className={styles.item}>
                            <div onClick={() => {setSelected(value)}} className={styles.itemInfo + ' click-cursor'}>
                                <div>
                                    <div>#{value} HALLEN</div>
                                    <img src={`./images/marketplace/market/items/${nav}.png`} alt="img" />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className={styles.body2}>
                    <div className={styles.sellerBoard}>
                        <div className={styles.header}>Selected Item:</div>
                        {selected ? 
                            <img className={styles.selectedImage} src={`./images/marketplace/market/items/${nav}.png`} alt="img" /> 
                            : <div className={styles.selectedImageFrame} />
                        }
                        <div className={styles.priceInput}>
                            <div>Price:</div>
                            <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value !== '' && Number(e.target.value))} />
                            <div>OPEN</div>
                        </div>
                        {priceInput && selected && <div className={styles.btnSell}>
                            <img onClick={() => {handleSell()}} className='click-cursor' src="./images/marketplace/market/sell.png" alt="img" />
                        </div>}
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.pagination}>
                    <img 
                        className='click-cursor'
                        onClick={() => {setPage(pagePrev => pagePrev > 1 ? pagePrev - 1 : pagePrev )}}
                        src="./images/marketplace/market/triangle-left.png" 
                        alt="img" 
                    />
                    <div>{page < 10 ? `0${page}` : page}</div>
                    <img
                        className='click-cursor'
                        onClick={() => {setPage(pagePrev => pagePrev < Math.ceil(data.length / numOfPage) ? pagePrev + 1 : pagePrev )}}
                        src="./images/marketplace/market/triangle-right.png" 
                        alt="img" 
                    />
                </div>
            </div>
            <Link href='/'>
                <a className={styles.back}>
                    <img className='click-cursor' src="./images/marketplace/market/back.png" alt="img" />
                </a>
            </Link>
        </div>
    )
}