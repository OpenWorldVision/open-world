import styles from "./popup.module.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
} from '@chakra-ui/react'
import React, {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react'

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

export type PopupRef = {
    isOpen: boolean
    open: () => void
    close: () => void
    popup: (type, content, subcontent?, actionContent?, action?) => void
}

function Popup(_, ref) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [info, setInfo] = useState({
        type: '',
        content: '',
        subcontent: '',
        actionContent: 'Close',
        action: onClose
    })

    useImperativeHandle(ref, () => ({
        isOpen: isOpen,
        open: onOpen,
        close: onClose,
        popup(type, content, subcontent = '', actionContent = 'Close', action = onClose){
            setInfo({
                type,
                content,
                subcontent,
                actionContent,
                action
            })
        }
    }), [onClose])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent style={{ backgroundColor: "transparent" }}>
                <div className={styles.background3}>
                    <div className={styles.background2}>
                        <div className={styles.background1}>
                            <div>
                                <div>NOTI</div>
                                <button className="click-cursor" onClick={onClose}>
                                    <img src='/images/popup/close.webp' />
                                </button>
                            </div>
                            {info.type && <img src={infoType[info.type]} />}
                            <div>{info.content}</div>
                            {info.subcontent && <div>({info.subcontent})</div> }
                            <button className="click-cursor" onClick={info.action}>{info.actionContent}</button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef<PopupRef>(Popup)