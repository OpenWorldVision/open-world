import styled from '@emotion/styled';
import React, { useState } from 'react'
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function Jeweler(props) {

    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [modalLila, setModalLila] = useState(false)
    const [modalJeweler, setModalJeweler] = useState(false)
    const [modalDeposit, setModalDeposit] = useState(false)
    const [modalClaim, setModalClaim] = useState(false)
    const [modalWaitClaim, setModalWaitClaim] = useState(false)
    const [modalWithdraw, setModalWithdraw] = useState(false)
    
    function closeModal() {
    setIsOpen(false)
    setModalInfo(false)
    setModalLila(false)
    setModalJeweler(false)
    }
    return (
        <JewelerPage>
            <div>
                <div className="container-jeweler" >   
                    <TransformWrapper 
                        maxScale={2}
                        minScale={0.25}
                        initialScale={0.8}
                        centerZoomedOut={true}
                        initialPositionX={0}
                        initialPositionY={0}
                        centerOnInit={true}

                    >
                        <TransformComponent>
                            <div
                    className="jeweler container transform-component"
                    id="handle_mobile"
                    >
                        <div className="info-manage">
                            <button className="btn-info-manage cursor-btn">
                                <div className="btn-content">Manager</div>
                                <img
                                    src="/images/bubble-arrow.png"
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className="info-jeweler">
                            <button className="btn-info-manage cursor-btn">
                                <div className="btn-content">Jeweler</div>
                                <img
                                    src="/images/bubble-arrow.png"
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className="info-info">
                            <button className="btn-info-info cursor-btn">
                                <img
                                    src="/images/text_bubble_excl_mark.png"
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className="hero-manage">
                            <img
                            src="/images/bank-npc.png"
                            alt="hero_manager"
                            />
                        </div>
                        <div className="table-manager">
                            <img
                            src="/images/bank-desk3.png"
                            alt=""
                            />
                        </div>
                        <div className="table-jeweler">
                            <img
                            src="/images/bank-desk2.png"
                            alt=""
                            />
                        </div>
                        <div className="table-info">
                            <img
                            src="/images/bank-desk3.png"
                            alt=""
                            />
                        </div>
                        <button onClick={() =>{setIsOpen(true)}} className="layout-btn btn-manage cursor-btn">
                        </button>
                        <button onClick={() =>{setModalJeweler(true)}} className="layout-btn cursor-btn btn-jeweler">
                        </button>
                        <button onClick={() =>{setModalInfo(true)}} className="layout-btn cursor-btn btn-info">
                        </button>
                        <button onClick={() =>{setModalLila(true)}} className="layout-btn cursor-btn btn-lila">
                        </button>
                        <div className="hero-jeweler">
                            <img
                            src="/images/teller-idle.png"
                            alt="hero_jeweler"
                            />
                        </div>
                        <div className="hero-info">
                            <img
                            src="/images/banker-idle.png"
                            alt="hero_info"
                            />
                        </div>
                        <div className="hero-lila">
                            <img
                            src="/images/lila-animation.png"
                            alt="hero_lila"
                            />
                        </div>
                        <div className="bank-eyes">
                            <img
                            src="/images/bank-eyes.png"
                            alt="bank_eyes"
                            />
                        </div>
                        <div className="bank-lights">
                            <img
                            src="/images/bank-lights.png"
                            alt="bank_lights"
                            />
                        </div>
                        <div className="bankShine">
                            <img
                            src="/images/bankShine-statue.png"
                            alt="bankShine"
                            />
                        </div>
                        <div className="bankShine-chestTL">
                            <img
                            src="/images/bankShine-chestTL.png"
                            alt="bankShine-chestTL"
                            />
                        </div>
                        <div className="bankShine-chestTC">
                            <img
                            src="/images/bankShine-chestTC.png"
                            alt="bankShine-chestTC"
                            />
                        </div>
                        <div className="bankShine-pig">
                            <img
                            src="/images/bankShine-pig.png"
                            alt="bankShine-pig"
                            />
                        </div>
                        <div className="bankShine-chestTR">
                            <img
                            src="/images/bankShine-chestTR.png"
                            alt="bankShine-chestTR"
                            />
                        </div>
                        <div className="bankShine-vaseL">
                            <img
                            src="/images/bankShine-vaseL.png"
                            alt="bankShine-vaseL"
                            />
                        </div>
                        <div className="bankShine-vaseR">
                            <img
                            src="/images/bankShine-vaseL.png"
                            alt="bankShine-vaseR"
                            />
                        </div>
                        <div className="bankShine-chestBL">
                            <img
                            src="/images/bankShine-chestB.png"
                            alt="bankShine-chestBL"
                            />
                        </div>
                        <div className="bankShine-chestBR">
                            <img
                            src="/images/bankShine-chestBR.png"
                            alt="bankShine-chestBR"
                            />
                        </div>
                        <div className="pumpkin">
                            <img
                            src="/images/Pumpkin01.png"
                            alt="pumpkin"
                            />
                        </div>
                        </div>
                        </TransformComponent>
                    </TransformWrapper>
                    <Modal
                        className="modal"
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}

                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10000',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10001',
                                border: '1px solid rgb(76, 62, 35)',
                                padding: '0',
                                maxWidth: '650px',
                                
                                maxHeight: '900px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            }
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative'
                                        }}
                                        className="title">Locked JEWEL Management  
                                        <div
                                            className='cursor-btn'
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setIsOpen(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content manage" style={{height: '100%'}}>
                                    <div className="border_content">
                                        <div className="head">Manager Greg</div>
                                        <div className="body">
                                        Thank you for being a valued client! If you have locked JEWEL,
                                        I can assist you with transferring it to another wallet. I can
                                        only transfer the full balance, so make sure you want to move
                                        everything!
                                        </div>
                                    </div>
                                    <div className="introduce">
                                        <div>
                                        This function will transfer all of your wallet and locked
                                        JEWEL from one wallet to another. You can use this function if
                                        your wallet has been compromised or if you are moving to a
                                        hardware wallet.
                                        </div>
                                        <div>
                                        You can only transfer the full balance of your locked JEWEL.
                                        Only wallets with active DeFi Kingdoms accounts may receive
                                        locked JEWEL.
                                        </div>
                                        <div>
                                        All unclaimed rewards should be claimed prior to transfer.
                                        Additionally, all JEWEL in the transferring wallet will be
                                        moved to the new wallet when using this feature. If you do not
                                        wish to move your unlocked JEWEL, deposit it with the Jeweler
                                        before using this transfer option. xJEWEL will not be
                                        transferred and will need to be sent manually.
                                        </div>
                                        <div>
                                        The recipient wallet address must be different from the
                                        current wallet. If you try to transfer locked JEWEL to the
                                        same wallet that it is already in, it will be lost forever.
                                        </div>
                                    </div>
                                    <div className="total-locked">
                                        <p>Total Locked JEWEL</p>
                                        <p>
                                        <img
                                            src="/images/cute-jewel.png"
                                            alt=""
                                        />
                                        0.00
                                        </p>
                                    </div>
                                    <div className="total-wallet">
                                        <p>Total Locked JEWEL</p>
                                        <p>
                                        <img
                                            src="/images/cute-jewel.png"
                                            alt=""
                                        />
                                        0.00
                                        </p>
                                    </div>
                                    <div style={{padding: "10px 15px"}}>
                                        <label htmlFor="address" className="cursor-btn"
                                        >Recipient Address</label
                                        >
                                        <input type="text" id="address" />
                                    </div>
                                    <div style={{padding: "10px 15px"}}>
                                        <div className="warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12.984 14.016v-4.031h-1.969v4.031h1.969zM12.984 18v-2.016h-1.969v2.016h1.969zM0.984 21l11.016-18.984 11.016 18.984h-22.031z" fill="#fff"/>
                                        </svg>
                                        <p>
                                            Warning: This process is irreversible. There is no way to
                                            cancel or undo this transfer, so be sure that you entered
                                            the correct wallet address and that it is not the same
                                            wallet that contains the locked JEWEL that you are
                                            attempting to move.
                                        </p>
                                        <input type="text" placeholder="Type 'SEND'" />
                                        </div>
                                        <button
                                        disabled={true}
                                        className="btn-transfer-locked cursor-btn"
                                        >
                                        TRANSFER LOCKED JEWEL
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Modal> 
                        <Modal
                        isOpen={modalJeweler}
                        onRequestClose={closeModal}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}

                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10000',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10001',
                                border: '1px solid rgb(76, 62, 35)',
                                padding: '0',
                                maxWidth: '750px',
                                
                                maxHeight: '800px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            }
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                <div
                                    style={{
                                        position: 'relative'
                                    }}
                                    className="title">Jeweler
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setModalJeweler(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content modal-jeweler">
                                    <div className='popup-jeweler-head'>
                                        <div className="border_content">
                                            <h1>Jeweler Ian</h1>
                                            <p>
                                                You can stake your JEWEL tokens here.
                                                We provide rewards for those who do.
                                                You may withdraw at any time.
                                            </p>
                                        </div>
                                        <div className="border_content">
                                            <button onClick={() => {setModalDeposit(true)}} className='cursor-btn deposit'>Deposit</button>
                                            <button onClick={() => {setModalClaim(true)}} className='cursor-btn claim'>Claim</button>
                                            <button onClick={() => {setModalWithdraw(true)}} className='cursor-btn withdraw'>Withdraw</button>
                                        </div>
                                    </div>
                                    <div className='popup-jeweler-body'>
                                        <div className='TVL'><span>🏆</span>TVL:<span>$539,932,790</span></div>
                                        <div className='dex-fee'>
                                            <div className='dex-fee-head'>
                                                <div>Jeweler - DEX fee sharing</div>
                                                <div>Stake your JEWEL tokens and earn 1/3rd of generated trading fees.</div>
                                            </div>
                                            <div className='dex-fee-body bordered-box bordered-box-hero'>
                                                <div className='jeweler-balance'>
                                                    Your xJEWEL Balance
                                                    <div>(1 xJEWEL = 1.716 JEWEL)</div>
                                                </div>
                                                <div className='quantity'>
                                                    <img src="/images/mid-jewel.png" alt="" />
                                                    <div>0.0000</div>
                                                </div>
                                                <div className='your-token'>You have <span>0.00</span> JEWEL tokens available to deposit to the Jeweler.</div>
                                            </div>
                                        </div>
                                        <div className='popup-jeweler-body-msg'>
                                            <span>💡</span>
                                            Your JEWEL tokens grow as the xJEWEL multiplier goes up.
                                            Tokens are 100% unlocked when they are claimed.
                                            The Jeweler does not have any withdrawal fees.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalInfo}
                        onRequestClose={closeModal}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10000',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10001',
                                border: '1px solid rgb(76, 62, 35)',
                                padding: '0',
                                maxWidth: '650px',
                                
                                maxHeight: '500px',
                                height: '80vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            }
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative'
                                        }}
                                        className="title">Info 
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setModalInfo(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content" style={{height: '100%'}}>
                                <div className="border_content">
                                    <div className="head">Jeweler Micah</div>
                                    <div className="body">
                                    Welcome to Adelyn, the greatest city in Serendale! You can
                                    deposit your JEWEL here at the Jeweler, and visit the
                                    Marketplace to trade tokens. Lazarus the Druid is also there;
                                    he can help you acquire seeds which you can plant in the
                                    Gardens to participate in liquidity pools and earn rewards!
                                    </div>
                                    <div className="footer">
                                    You can find Heroes for sale in the Tavern, or visit the
                                    Portal to Summon new ones. Again, welcome, and enjoy your
                                    stay! If you need more information about anything you find
                                    here, visit docs.defikingdoms.com to learn more.
                                    </div>
                                </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalLila}
                        onRequestClose={closeModal}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10000',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10001',
                                border: '1px solid rgb(76, 62, 35)',
                                padding: '0',
                                maxWidth: '550px',
                                
                                maxHeight: '200px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            }
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative'
                                        }}
                                        className="title">Lila
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setModalLila(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content">
                                <i className="title">* mumble mumble *</i>
                                <div>So many bills... not enough JEWEL...</div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalDeposit}
                        onRequestClose={() =>{setModalDeposit(false)}}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10002',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10003',
                                border: 'unset',
                                padding: '0',
                                maxWidth: '550px',
                                
                                maxHeight: '450px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            },
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative',
                                            textAlign: 'left',
                                            fontSize: '1.5rem',
                                            padding: '10px 20px',
                                            background: 'unset'
                                        }}
                                        className="title">Deposit
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setModalDeposit(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content" style={{padding: '20px'}}>
                                    <div style={{
                                        background: 'rgb(33, 36, 41)',
                                        border: '1px solid rgb(44, 47, 54)',
                                        padding: '10px',
                                        }}>
                                        <div
                                        className='available-to-deposit'
                                        style={{
                                            textAlign: 'right',
                                            fontSize: '1.3rem',
                                            color: 'rgb(195, 197, 203)',
                                            margin: 0,
                                        }}>
                                            Available to deposit: 0
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <input 
                                            className='input-deposit'
                                            style={{
                                                background: 'transparent',
                                                color: 'white', outline: 'none',
                                                fontSize: '1.4rem',
                                                width: '100%'
                                            }} placeholder='0.0' type="number" />
                                            <div className='btn-deposit-container' style={{display: 'flex', flexDirection: 'column'}}>
                                                <button className='cursor-btn'
                                                style={{
                                                width: '50px',
                                                color: 'rgb(102, 153, 153)',
                                                backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                                border: '1px solid rgba(21, 61, 111, 0.44)',
                                                borderRadius: '0.5rem',
                                                }}
                                                >50%</button>
                                                <button className='cursor-btn' 
                                                style={{
                                                width: '50px',
                                                color: 'rgb(102, 153, 153)',
                                                backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                                border: '1px solid rgba(21, 61, 111, 0.44)',
                                                borderRadius: '0.5rem',
                                                marginTop: '5px',
                                                }}>MAX</button>
                                            </div>
                                            <button className='cursor-btn btn-deposit-jewel' style={{
                                                fontSize: '1.3rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                margin: '0 10px',
                                                padding: '5px 10px',
                                                borderRadius: '12px',
                                                }}>
                                                <img style={{width: '22px', marginRight: '10px'}} src='/images/JEWEL.png' />
                                                JEWEL
                                            </button>
                                        </div>
                                    </div>
                                    <div 
                                        className='quantity-jeweler'
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px 0',
                                            fontSize: '1.1rem',
                                            color: 'rgb(195, 197, 203)',
                                        }}>(~<span>000</span>xJEWEL)</div>
                                    <div 
                                        className='btn-deposit-container'
                                        style={{
                                        display: 'flex'
                                    }}>
                                        <button
                                        className='cursor-btn'
                                        style={{
                                            width: '100%',
                                            padding: '10px 0',
                                            letterSpacing: '1px',
                                            borderRadius: '5px',
                                            backgroundColor: '#009c44',
                                            opacity: '.4'
                                        }}
                                        >APPROVE</button>
                                        <button
                                        className='cursor-btn'
                                        style={{
                                            width: '100%',
                                            padding: '10px 0',
                                            letterSpacing: '1px',
                                            borderRadius: '5px',
                                            backgroundColor: '#009c44',
                                            opacity: '.4'
                                        }}
                                        >ENTER AN AMOUNT</button>
                                    </div>
                                    <div
                                        style={{
                                            width: 'fit-content',
                                            display: 'flex',
                                            margin: '0 auto',
                                            color: 'rgb(195, 197, 203)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: 'rgb(86, 90, 105)',
                                                width: '20px',
                                                height: '20px',
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >1</div>
                                        <div>
                                            <div
                                            style={{
                                                width: '100px',
                                                border: '1px solid rgb(195, 197, 203)'
                                            }}
                                            ></div>
                                        </div>
                                        <div
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: 'rgb(86, 90, 105)',
                                                width: '20px',
                                                height: '20px',
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >2</div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalClaim}
                        onRequestClose={() =>{setModalClaim(false)}}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10002',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10003',
                                border: 'unset',
                                padding: '0',
                                maxWidth: '650px',
                                
                                maxHeight: '500px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            },
                        }}
                        >
                            <div className="modal__body__container" style={{padding: '20px', margin: '2px'}}>
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative',
                                            textAlign: 'left',
                                            fontSize: '1.5rem',
                                            padding: '0',
                                            background: 'unset'
                                        }}
                                        className="title">Claim
                                        <div
                                            className='btn-turn-off-modal'
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {setModalClaim(false)}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content"
                                    style={{padding: '20px 0'}}
                                >
                                    <div 
                                    className='diamond-icon'
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '30px'
                                    }}>💎</div>
                                    <div>
                                    <p style={{
                                        textAlign: 'center',
                                        fontSize: '30px'
                                    }}>When you claim rewards, collected LP fees will be used to market buy JEWEL.</p>

                                    <p
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '30px',
                                        marginTop: '30px',
                                    }}>The purchased JEWEL tokens will then be distributed to the Jeweler stakers as a reward.</p>
                                    </div>
                                </div>
                                <button
                                className={'cursor-btn btn-claim-jeweler'}
                                onClick={() => {setModalWaitClaim(true),
                                    setModalClaim(false)
                                }}
                                style={{
                                    width: '100%',
                                    padding: '13px 0',
                                    letterSpacing: '1px',
                                    borderRadius: '5px',
                                    backgroundColor: '#009c44',
                                    marginTop: '40px',
                                    fontSize: '28px'
                                }}
                                >Claim</button>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalWaitClaim}
                        onRequestClose={() =>{setModalWaitClaim(false)}}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10002',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(https://game.defikingdoms.com/static/media/default-cursor-2x.946e7535.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10003',
                                border: 'unset',
                                padding: '0',
                                maxWidth: '650px',
                                
                                maxHeight: '500px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            },
                        }}
                        >
                            <div className="modal__body__container" style={{padding: '20px', margin: '2px'}}>
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {
                                                setModalWaitClaim(false),
                                                setModalClaim(true)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content"
                                    style={{padding: '20px 0'}}
                                >
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '30px 0'
                                    }}><ClipLoader color='#fff' loading={true} size={100} /></div>
                                    <div style={{
                                        textAlign: 'center',
                                        fontSize: '30px',
                                        marginTop: '30px'
                                    }}>Claiming Jeweler rewards</div>
                                    <div
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '30px',
                                        marginTop: '60px'
                                    }}
                                    >Confirm this transaction in your wallet</div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                        isOpen={modalWithdraw}
                        onRequestClose={() =>{setModalWithdraw(false)}}
                        contentLabel="Inline Styles Modal Example"
                        ariaHideApp={false}
                        style={{
                            overlay:{
                            backgroundColor: 'rgba(30, 30, 30, 0.5)',
                            zIndex: '10002',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'url(/images/default-cursor.png), auto',
                        },
                            content:{
                                background: 'rgba(0, 0, 0, 0.85)',
                                zIndex: '10003',
                                border: 'unset',
                                padding: '0',
                                maxWidth: '550px',
                                maxHeight: '450px',
                                height: '90vh',
                                margin: 'auto',
                                overflow: 'hidden auto',
                                color: '#fff',
                            },
                        }}
                        >
                            <div className="modal__body__container">
                                <div className="modal_body_head">
                                    <div
                                        style={{
                                            position: 'relative',
                                            textAlign: 'left',
                                            fontSize: '1.5rem',
                                            padding: '10px 20px',
                                            background: 'unset'
                                        }}
                                        className="title">Withdraw
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '26px',
                                                top: '20px'
                                            }}
                                            onClick={() => {
                                                setModalWithdraw(false)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_body_content" style={{padding: '20px'}}>
                                    <div style={{
                                        background: 'rgb(33, 36, 41)',
                                        border: '1px solid rgb(44, 47, 54)',
                                        padding: '10px',
                                        }}>
                                        <div style={{
                                            textAlign: 'right',
                                            fontSize: '1.3rem',
                                            color: 'rgb(195, 197, 203)',
                                            margin: 0,
                                        }}>
                                            Available to deposit: 0
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <input 
                                            className='input-withdraw'
                                            style={{
                                                background: 'transparent',
                                                color: 'white', outline: 'none',
                                                fontSize: '1.4rem',
                                                width: '100%'
                                            }} placeholder='0.0' type="number" />
                                            <div className='btn-deposit-container' style={{display: 'flex', flexDirection: 'column'}}>
                                                <button className='cursor-btn'
                                                style={{
                                                width: '50px',
                                                color: 'rgb(102, 153, 153)',
                                                backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                                border: '1px solid rgba(21, 61, 111, 0.44)',
                                                borderRadius: '0.5rem',
                                                }}
                                                >50%</button>
                                                <button className='cursor-btn' 
                                                style={{
                                                width: '50px',
                                                color: 'rgb(102, 153, 153)',
                                                backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                                border: '1px solid rgba(21, 61, 111, 0.44)',
                                                borderRadius: '0.5rem',
                                                marginTop: '5px',
                                                }}>MAX</button>
                                            </div>
                                            <button className='cursor-btn btn-deposit-jewel' style={{
                                                fontSize: '1.3rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                margin: '0 10px',
                                                padding: '5px 10px',
                                                borderRadius: '12px',
                                                }}>
                                                <img style={{width: '22px', marginRight: '10px'}} src='/images/JEWEL.png' />
                                                JEWEL
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '20px 0',
                                        fontSize: '1.1rem',
                                        color: 'rgb(195, 197, 203)',
                                    }}>(~<span>000</span>xJEWEL)</div>
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <button
                                        className='cursor-btn btn-enter-mount'
                                        style={{
                                            width: '100%',
                                            padding: '10px 0',
                                            letterSpacing: '1px',
                                            borderRadius: '5px',
                                            backgroundColor: '#009c44',
                                            opacity: '.4'
                                        }}
                                        >ENTER AN MOUNT</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                </div>
            </div>
        </JewelerPage>
        )
    }

    const JewelerPage = styled.div({
    '.container-jeweler': {
        backgroundColor: '#131313',
        height: '100vh',
        width: '100vw',
        padding: '0 !important',
        position: 'absolute',
        left: '0',
        display: 'flex',
        
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'url(/images/default-cursor.png), auto',
        overflow: 'hidden',
        '.jeweler':{
            position: 'absolute',
            backgroundImage: 'url(/images/bank-bg.png)',
            minWidth: '1318px',
            height: '992.97px',
            zIndex: '1',
            backgroundSize: '100%',
            imageRendering: 'pixelated',
            backgroundRepeat: 'no-repeat',
            margin: '0 auto',
            '.info-manage': {
                position: 'absolute',
                top: '185.868px',
                left: '671.216px',
                '.btn-info-manage': {
                    animation: '4.5s ease-in-out 0s infinite normal none running animate-btn',
                    'pointer-events': 'revert !important',
                    position: 'relative',
                    backgroundImage: 'url(/images/text-bubble-left.png), url(/images/text-bubble-right.png)',
                    backgroundPosition: 'left top, right top',
                    backgroundRepeat: 'repeat-y',
                    backgroundColor: 'rgb(255, 224, 183)',
                    backgroundSize: '11.6081px 8.70608px',
                    imageRendering: 'initial',
                    left: '-50%',
                    zIndex: '2000',
                    border: '0',
                    'img': {
                        position: 'absolute',
                        width: '14.2162px',
                        height: '20.3142px',
                        imageRendering: 'pixelated',
                        left: '55%',
                        transform: 'translateX(-50%)',
                        zIndex: '2002',
                    }
                },
                '@keyframes animate-btn': {
                    '0%':{
                      transform: 'translateY(0)'
                    },
                    '50%': {
                      transform: 'translateY(10px)'
                    },
                    '100%': {
                      transform: 'translateY(0)'
                    }
                },
                '.btn-info-manage::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: '-11.6081px',
                    left: '11.6081px',
                    width: '71px',
                    height: '45px',
                    backgroundImage:' url(/images/text-bubble-top.png), url(/images/text-bubble-btm.png)',
                    backgroundPosition: 'center top, center bottom',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '46.4324px 11.6081px',
                },
                '.btn-info-manage::after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: '-11.6081px',
                    left: '0',
                    width: '97px',
                    height: '45px',
                    backgroundImage: 'url(/images/text-bubble-topLeft.png),' +
                    'url(/images/text-bubble-topRight.png),' + 
                    'url(/images/text-bubble-btmLeft.png),' + 
                    'url(/images/text-bubble-btmRight.png)',
                    backgroundPosition: 'left top, right top, left bottom, right bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '26.1182px 27.1182px',
                },
                '.btn-content': {
                    position: 'relative',
                    textAlign: 'center',
                    color: 'rgb(0, 0, 0)',
                    padding: '0 8.9223px',
                    fontFamily: 'Lora, serif',
                    fontWeight: 'bold',
                    zIndex: '2003',
                    fontSize: 'calc(15.1182px)',
                    marginLeft: '11px',
                }
            },
            '.info-jeweler': {
                position: 'absolute',
                top: '514.868px',
                left: '656.216px',
                '.btn-info-manage': {
                    animation: '4.5s ease-in-out 0s infinite normal none running animate-btn',
                    'pointer-events': 'revert !important',
                    position: 'relative',
                    backgroundImage: 'url(/images/text-bubble-left.png), url(/images/text-bubble-right.png)',
                    backgroundPosition: 'left top, right top',
                    backgroundRepeat: 'repeat-y',
                    backgroundColor: 'rgb(255, 224, 183)',
                    backgroundSize: '11.6081px 8.70608px',
                    imageRendering: 'initial',
                    left: '-50%',
                    zIndex: '2000',
                    border: '0',
                    'img': {
                        position: 'absolute',
                        width: '14.2162px',
                        height: '20.3142px',
                        imageRendering: 'pixelated',
                        left: '60%',
                        transform: 'translateX(-50%)',
                        zIndex: '2002',
                    }
                },
                '@keyframes animate-btn': {
                    '0%':{
                      transform: 'translateY(0)'
                    },
                    '50%': {
                      transform: 'translateY(10px)'
                    },
                    '100%': {
                      transform: 'translateY(0)'
                    }
                },
                '.btn-info-manage::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: '-11.6081px',
                    left: '11.6081px',
                    width: '71px',
                    height: '45px',
                    backgroundImage:' url(/images/text-bubble-top.png), url(/images/text-bubble-btm.png)',
                    backgroundPosition: 'center top, center bottom',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '46.4324px 11.6081px',
                },
                '.btn-info-manage::after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: '-11.6081px',
                    left: '0',
                    width: '97px',
                    height: '45px',
                    backgroundImage: 'url(/images/text-bubble-topLeft.png),' +
                    'url(/images/text-bubble-topRight.png),' + 
                    'url(/images/text-bubble-btmLeft.png),' + 
                    'url(/images/text-bubble-btmRight.png)',
                    backgroundPosition: 'left top, right top, left bottom, right bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '26.1182px 27.1182px',
                },
                '.btn-content': {
                    position: 'relative',
                    textAlign: 'center',
                    color: 'rgb(0, 0, 0)',
                    padding: '0 8.9223px',
                    fontFamily: 'Lora, serif',
                    fontWeight: 'bold',
                    zIndex: '2003',
                    fontSize: 'calc(15.1182px)',
                    marginLeft: '15px',
                }
            },
            '.info-info': {
                position: 'absolute',
                top: '498.868px',
                left: '318px',
                '.btn-info-info': {
                    animation: '4.5s ease-in-out 0s infinite normal none running animate-btn',
                    'pointer-events': 'revert !important',
                    position: 'relative',
                    backgroundPosition: 'left top, right top',
                    backgroundRepeat: 'repeat-y',
                    backgroundColor: 'rgb(255, 224, 183)',
                    backgroundSize: '11.6081px 8.70608px',
                    imageRendering: 'initial',
                    left: '-50%',
                    zIndex: '2000',
                    border: '0',
                    'img': {
                        position: 'absolute',
                        minWidth: '80.2162px',
                        height: '40.3142px',
                        imageRendering: 'pixelated',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: '2002',
                    }
                },
            },
            '.btn-manage': {
                left: '629.176px',
                top: '180.672px',
            },
            '.btn-jeweler': {
                left: '614.176px',
                top: '514px',
            },
            '.btn-info': {
                left: '267.176px',
                top: '516px',
                width: '102.081px',
                height: '156.101px',
            },
            '.btn-lila': {
                left: '616.176px',
                top: '665px',
            },
            '.hero-manage': {
                'img': {
                    width: '74.081px',
                    height: '106.101px',
                    position: 'absolute',
                    left: '640.176px',
                    top: '226.672px',
                  }
            },
            '.hero-jeweler': {
                position: 'absolute',
                left: '636.176px',
                top: '576px',
                width: '65.081px',
                height: '116.101px',
                zIndex: '188',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '670.368px',
                    height: '101.571px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '11s steps(11, end) 0s infinite normal none running dKpWqB',
                },
                '@keyframes dKpWqB': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-670px',
                      top: 0,
                    }
                }
            },
            '.hero-info': {
                position: 'absolute',
                left: '284.176px',
                top: '571.672px',
                width: '65.081px',
                height: '116.101px',
                zIndex: '188',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '670.368px',
                    height: '101.571px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '11s steps(11, end) 0s infinite normal none running dKpWqB',
                },
                '@keyframes dKpWqB': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-670px',
                      top: 0,
                    }
                }
            },
            '.hero-lila': {
                position: 'absolute',
                left: '454.176px',
                top: '501.672px',
                width: '112.081px',
                height: '116.101px',
                zIndex: '188',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '6686.27px',
                    height: '101.571px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '14s steps(48, end) 0s infinite normal none running animate-hero-lila',
                },
                '@keyframes animate-hero-lila': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-6686.27px',
                      top: 0,
                    }
                  }
            },
            '.bank-eyes': {
                position: 'absolute',
                left: '1057.176px',
                top: '95.672px',
                width: '101.081px',
                height: '84.101px',
                zIndex: '188',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '2414.49px',
                    height: '92.8649px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '13s steps(26, end) 0s infinite normal none running animate-bank-eyes',
                },
                '@keyframes animate-bank-eyes': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-2414.49px',
                      top: 0,
                    }
                }
            },
            '.bank-lights': {
                position: 'absolute',
                left: '0',
                top: '0',
                
                width: '1312px',
                height: '992.97px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '5268px',
                    height: '1067.97px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '1.2s steps(4) 0s infinite normal none running animate-bank-lights',
                },
                '@keyframes animate-bank-lights': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-5268px',
                    }
                }
            },
            '.bankShine': {
                position: 'absolute',
                left: '141.73px',
                top: '113.297px',
                width: '132.162px',
                height: '159.162px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '20894.6px',
                    height: '232.162px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '9s steps(90, end) 0s infinite normal none running animate-bankShine',
                },
                '@keyframes animate-bankShine': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-20894.6px',
                      top: 0,
                    }
                }
            },
            '.bankShine-chestTL': {
                position: 'absolute',
                left: '279.459px',
                top: '207.595px',
                width: '139.297px',
                height: '139.297px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '10168.7px',
                    height: '139.297px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '7.3s steps(73, end) 0s infinite normal none running animate-bankShine-chestTL',
                },
                '@keyframes animate-bankShine-chestTL': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-10168.7px',
                      top: 0,
                    }
                }
            },
            '.bankShine-chestTC': {
                position: 'absolute',
                left: '525.486px',
                top: '205.162px',
                width: '97.297px',
                height: '87.297px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    width: '12815.4px',
                    height: '139.297px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '9.2s steps(92, end) 0s infinite normal none running animate-bankShine-chestTC',
                },
                '@keyframes animate-bankShine-chestTC': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-12815.4px',
                      top: 0,
                    }
                }
            },
            '.bankShine-pig': {
                position: 'absolute',
                left: '772.51px',
                top: '180.162px',
                width: '92.8649px',
                height: '46.4324px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '6686.27px',
                    height: '46.4324px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '7.2s steps(72, end) 0s infinite normal none running animate-bankShine-pig',
                },
                '@keyframes animate-bankShine-pig': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-6686.27px',
                      top: 0,
                    }
                }
            },
            '.bankShine-chestTR ': {
                position: 'absolute',
                left: '1003.54px',
                top: '165.162px',
                width: '139.297px',
                height: '92.8649px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '11979.6px',
                    height: '92.8649px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '8.6s steps(86, end) 0s infinite normal none running animate-bankShine-chestTR',
                },
                '@keyframes animate-bankShine-chestTR': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-11979.6px',
                      top: 0,
                    }
                }
            },
            '.bankShine-vaseL': {
                position: 'absolute',
                left: '451.622px',
                top: '494.054px',
                width: '92.8649px',
                height: '46.4324px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '7429.19px',
                    height: '46.4324px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '8s steps(80, end) 0s infinite normal none running animate-bankShine-vaseL',
                },
                '@keyframes animate-bankShine-vaseL': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-7429.19px',
                      top: 0,
                    }
                }
            },
            '.bankShine-vaseR': {
                position: 'absolute',
                left: '788.622px',
                top: '493.054px',
                width: '92.8649px',
                height: '46.4324px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '7429.19px',
                    height: '46.4324px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '8.1s steps(81, end) 0s infinite normal none running animate-bankShine-vaseR',
                },
                '@keyframes animate-bankShine-vaseL': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-7429.19px',
                      top: 0,
                    }
                }
            },
            '.bankShine-chestBL': {
                position: 'absolute',
                left: '70px',
                top: '717.081px',
                width: '92.8649px',
                height: '139.297px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '8079.24px',
                    height: '139.297px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '8.7s steps(87, end) 0s infinite normal none running animate-bankShine-chestBL',
                },
                '@keyframes animate-bankShine-chestBL': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-8079.24px',
                      top: 0,
                    }
                }
            },
            '.bankShine-chestBR': {
                position: 'absolute',
                left: '1162px',
                top: '770.081px',
                width: '92.8649px',
                height: '139.297px',
                zIndex: '400',
                overflow: 'hidden',
                'img': {
                    position: 'absolute',
                    minWidth: '8079.24px',
                    height: '139.297px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                    animation: '8.8s steps(88, end) 0s infinite normal none running animate-bankShine-chestBR',
                },
                '@keyframes animate-bankShine-chestBR': {
                    '0%': {
                      left: 0,
                      top: 0,
                    },
                    '100%': {
                      left: '-8079.24px',
                      top: 0,
                    }
                }
            },
            '.pumpkin': {
                position: 'absolute',
                left: '1206px',
                top: '612.081px',
                width: '33.8649px',
                height: '29.297px',
                zIndex: '400',
                overflow: 'hidden',
                'img:': {
                    position: 'absolute',
                    width: '63.8649px',
                    height: '79.8649px',
                    imageRendering: 'pixelated',
                    transform: 'scale(1, 1)',
                }
            },
            '.table-manager': {
                'img': {
                    position: 'absolute',
                    width: '216px',
                    height: '145px',
                    top: '246.027px',
                    left: '567.919px',
                    overflow: 'hidden',
                    display: 'flex',
                    padding: '0px',
                    border: '0px',
                    backgroundColor: 'transparent',
                    zIndex: '370',
                }
            },
            '.table-jeweler': {
                'img': {
                    position: 'absolute',
                    width: '178px',
                    height: '108px',
                    top: '604px',
                    left: '569.919px',
                    overflow: 'hidden',
                    display: 'flex',
                    padding: '0px',
                    border: '0px',
                    backgroundColor: 'transparent',
                    zIndex: '370',
                }
            },
            '.table-info': {
                position: 'absolute',
                width: '214px',
                height: '143px',
                top: '600px',
                left: '210.919px',
                overflow: 'hidden',
                display: 'flex',
                padding: '0px',
                border: '0px',
                backgroundColor: 'transparent',
                zIndex: '370',
            },
        },
    },
})