import { PropsWithChildren } from 'react'
import style from './castleModal.module.css'

type Props = {
    isOpen: boolean,
    width: number,
    height?: number,
    npcName?: string,
    npcDialogue?: string,
    zIndex?: number,
    fancyTitle?: string,
    title?: string,
    disabled?: boolean,
    toggleModal: () => void,
}

export default function CastleModal(props: PropsWithChildren<Props>) {
    const {
        isOpen,
        width,
        height,
        npcName,
        npcDialogue,
        zIndex,
        fancyTitle,
        title,
        disabled,
        toggleModal,
        children,
    } = props

    return (
        <>
        { isOpen &&
                <div
                    className={`overlay ${style.modalOverlay} ${isOpen && style.active}`}
                >
                    <div
                        className={`${style.modal} game-border fancy`}
                        style={{
                            width: width + 'px',
                            height: height + 'px',
                            marginBottom: (npcDialogue ? 30 : 0) + 'px',
                            zIndex: zIndex,
                        }}
                    >
                        <div
                            className={`click-cursor ${style.closeBtn}`}
                            onClick={toggleModal}
                        ></div>

                        { fancyTitle &&
                            <h3 className={`${style.modalTitle} ${style.fancy}`}>
                                <span>{ fancyTitle }</span>
                            </h3>
                        }

                        { title &&
                            <h3 className={`${style.modalTitle} ${style.basic}`}>
                                <span>{ title }</span>
                            </h3>
                        }

                        <div className={style.modalBody}>
                            { children }
                        </div>
                        { disabled &&
                            <div className={style.comingSoonWrap}>
                                <div className={style.comingSoon}>
                                    <span>Coming Soon</span>
                                </div>
                            </div>
                        }
                    </div>

                    { npcDialogue &&
                        <div
                            className={style.npcDialogue}
                            style={{
                                width: width + 'px',
                            }}
                        >
                                <h4 className={style.npcName}>
                                    <span>{ npcName }</span>
                                </h4>
                                <p>{ npcDialogue }</p>
                        </div>
                    }
                </div>
        }
        </>
    )
}