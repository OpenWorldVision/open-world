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
    type: string, 
    content: any, 
    subcontent: any, 
    actionContent: string,
    action: () => void
}

function Popup(_, ref) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        isOpen: isOpen,
        open: onOpen,
        close: onClose,
        type: '', 
        content: '', 
        subcontent: '', 
        actionContent: '',
        action: onClose
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
                            {ref.current?.type && <img src={infoType[ref.current?.type]} />}
                            <div>{ref.current?.content}</div>
                            {ref.current?.subcontent && <div>({ref.current?.subcontent})</div> }
                            <button className="click-cursor" onClick={ref.current?.action}>{ref.current?.actionContent}</button>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef<PopupRef>(Popup)