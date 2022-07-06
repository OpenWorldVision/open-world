import styles from "./popup.module.css"

const infoType = {
    sushi: '/images/popup/sushi.webp',
    stamina: '/images/popup/stamina.webp',
    fish: '/images/popup/fish.webp',
    ore: '/images/popup/ore.webp',
    other: '/images/popup/other.webp',
    success: '/images/popup/success.webp',
    failed: '/images/popup/failed.webp',
    cancel: '/images/popup/cancel.webp',
    waiting: '/images/popup/waiting.webp',
}

const Popup = ({ 
    type = null, 
    content, 
    subcontent = null, 
    actionContent,
    setIsOpen,
    action
}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.background3}>
                <div className={styles.background2}>
                    <div className={styles.background1}>
                        <div>
                            <div>NOTI</div>
                            <button className="click-cursor" onClick={() => {setIsOpen(null)}}>
                                <img src='/images/popup/close.webp' />
                            </button>
                        </div>
                        {type && <img src={infoType[type]} />}
                        <div>{content}</div>
                        {subcontent && <div>({subcontent})</div> }
                        <button className="click-cursor" onClick={action}>{actionContent}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup