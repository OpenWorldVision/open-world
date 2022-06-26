import styles from "./popup.module.css"

const infoType = {
    sushi: '/images/popup/sushi.png',
    stamina: '/images/popup/stamina.png',
    fish: '/images/popup/fish.png',
    ore: '/images/popup/ore.png',
    other: '/images/popup/other.png',
    success: '/images/popup/success.png',
    failed: '/images/popup/failed.png',
    cancel: '/images/popup/cancel.png',
    waiting: '/images/popup/waiting.png',
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
                                <img src='/images/popup/close.png' />
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