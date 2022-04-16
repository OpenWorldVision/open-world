import styled from '@emotion/styled'
import { VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'

import {
  ButtonAnimate,
  HeroJewelerAnimate,
  HeroManageAnimate,
  HeroLilaAnimate,
  HeroInfoAnimate,
  TableLayout,
  BankEyesStyle,
  BankLights,
  BankShine,
  BankShineChestTL,
  BankShineChestTC,
  BankShinePig,
  BankShineChestTR,
  BankShineVaseL,
  BankShineVaseR,
  BankShineChestBL,
  BankShineChestBR,
  PumpKin,
} from '../../components/jeweler/index'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

export default function Jeweler(props) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalInfo, setModalInfo] = useState(false)
  const [modalLila, setModalLila] = useState(false)
  const [modalJeweler, setModalJeweler] = useState(false)
  const [modalDeposit, setModalDeposit] = useState(false)
  const [modalClaim, setModalClaim] = useState(false)
  const [modalWaitClaim, setModalWaitClaim] = useState(false)
  const [modalWithdraw, setModalWithdraw] = useState(false)

  const [checkButtonTransferLock, setCheckButtonTransferLock] = useState(true)
  const [addClassOpacityButton, setAddClassOpacityButton] = useState('')

  const handleChangeInput = (e) => {
    if (e.target.value === '') {
      setCheckButtonTransferLock(true)
      setAddClassOpacityButton('')
    } else {
      setCheckButtonTransferLock(false)
      setAddClassOpacityButton('check-button-transfer-lock')
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <VStack>
        <JewelerPage>
          <div>
            <div className="container-jeweler">
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
                  <div className="jeweler container transform-component">
                    <ButtonAnimate
                      top={185.868}
                      left={671.216}
                      contentButton="Manager"
                    />
                    <ButtonAnimate
                      top={514.868}
                      left={656.216}
                      contentButton="Jeweler"
                    />
                    <div className="info-info">
                      <button className="btn-info-info cursor-btn">
                        <img
                          src="/images/jeweler/text_bubble_excl_mark.png"
                          alt=""
                        />
                      </button>
                    </div>
                    <HeroManageAnimate />
                    <HeroJewelerAnimate />
                    <HeroInfoAnimate />
                    <HeroLilaAnimate />
                    <TableLayout
                      width={216}
                      height={145}
                      top={246.027}
                      left={567.919}
                      src="/images/jeweler/bank-desk3.png"
                    />
                    <TableLayout
                      width={178}
                      height={108}
                      top={604}
                      left={569.919}
                      src="/images/jeweler/bank-desk2.png"
                    />
                    <TableLayout
                      width={214}
                      height={143}
                      top={600}
                      left={210.919}
                      src="/images/jeweler/bank-desk3.png"
                    />
                    <button
                      onClick={() => {
                        setIsOpen(true)
                      }}
                      className="layout-btn btn-manage cursor-btn"
                    ></button>
                    <button
                      onClick={() => {
                        setModalJeweler(true)
                      }}
                      className="layout-btn cursor-btn btn-jeweler"
                    ></button>
                    <button
                      onClick={() => {
                        setModalInfo(true)
                      }}
                      className="layout-btn cursor-btn btn-info"
                    ></button>
                    <button
                      onClick={() => {
                        setModalLila(true)
                      }}
                      className="layout-btn cursor-btn btn-lila"
                    ></button>
                    <BankEyesStyle />
                    <BankLights />
                    <BankShine />
                    <BankShineChestTL />
                    <BankShineChestTC />
                    <BankShinePig />
                    <BankShineChestTR />
                    <BankShineVaseL />
                    <BankShineVaseR />
                    <BankShineChestBL />
                    <BankShineChestBR />
                    <PumpKin />
                  </div>
                </TransformComponent>
              </TransformWrapper>
              <Modal
                isOpen={modalIsOpen}
                onClose={() => {
                  setIsOpen(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
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
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Locked JEWEL Management
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div
                        className="modal_body_content manage"
                        style={{ height: '100%' }}
                      >
                        <div className="border_content">
                          <div className="head">Manager Greg</div>
                          <div className="body">
                            Thank you for being a valued client! If you have
                            locked JEWEL, I can assist you with transferring it
                            to another wallet. I can only transfer the full
                            balance, so make sure you want to move everything!
                          </div>
                        </div>
                        <div className="introduce">
                          <div>
                            This function will transfer all of your wallet and
                            locked JEWEL from one wallet to another. You can use
                            this function if your wallet has been compromised or
                            if you are moving to a hardware wallet.
                          </div>
                          <div>
                            You can only transfer the full balance of your
                            locked JEWEL. Only wallets with active DeFi Kingdoms
                            accounts may receive locked JEWEL.
                          </div>
                          <div>
                            All unclaimed rewards should be claimed prior to
                            transfer. Additionally, all JEWEL in the
                            transferring wallet will be moved to the new wallet
                            when using this feature. If you do not wish to move
                            your unlocked JEWEL, deposit it with the Jeweler
                            before using this transfer option. xJEWEL will not
                            be transferred and will need to be sent manually.
                          </div>
                          <div>
                            The recipient wallet address must be different from
                            the current wallet. If you try to transfer locked
                            JEWEL to the same wallet that it is already in, it
                            will be lost forever.
                          </div>
                        </div>
                        <div className="total-locked">
                          <p>Total Locked JEWEL</p>
                          <p>
                            <img src="/images/jeweler/cute-jewel.png" alt="" />
                            0.00
                          </p>
                        </div>
                        <div className="total-wallet">
                          <p>Total Locked JEWEL</p>
                          <p>
                            <img src="/images/jeweler/cute-jewel.png" alt="" />
                            0.00
                          </p>
                        </div>
                        <div style={{ padding: '10px 15px' }}>
                          <label htmlFor="address" className="cursor-btn">
                            Recipient Address
                          </label>
                          <input type="text" id="address" />
                        </div>
                        <div style={{ padding: '10px 15px' }}>
                          <div className="warning">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12.984 14.016v-4.031h-1.969v4.031h1.969zM12.984 18v-2.016h-1.969v2.016h1.969zM0.984 21l11.016-18.984 11.016 18.984h-22.031z"
                                fill="#fff"
                              />
                            </svg>
                            <p>
                              Warning: This process is irreversible. There is no
                              way to cancel or undo this transfer, so be sure
                              that you entered the correct wallet address and
                              that it is not the same wallet that contains the
                              locked JEWEL that you are attempting to move.
                            </p>
                            <input
                              onChange={handleChangeInput}
                              type="text"
                              placeholder="Type 'SEND'"
                            />
                          </div>
                          <button
                            disabled={checkButtonTransferLock}
                            className={`btn-transfer-locked cursor-btn ${addClassOpacityButton}`}
                          >
                            TRANSFER LOCKED JEWEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalInfo}
                onClose={() => {
                  setModalInfo(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
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
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Info
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div
                        className="modal_body_content"
                        style={{ height: '100%' }}
                      >
                        <div className="border_content">
                          <div className="head">Jeweler Micah</div>
                          <div className="body">
                            Welcome to Adelyn, the greatest city in Serendale!
                            You can deposit your JEWEL here at the Jeweler, and
                            visit the Marketplace to trade tokens. Lazarus the
                            Druid is also there; he can help you acquire seeds
                            which you can plant in the Gardens to participate in
                            liquidity pools and earn rewards!
                          </div>
                          <div className="footer">
                            You can find Heroes for sale in the Tavern, or visit
                            the Portal to Summon new ones. Again, welcome, and
                            enjoy your stay! If you need more information about
                            anything you find here, visit docs.defikingdoms.com
                            to learn more.
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalLila}
                onClose={() => {
                  setModalLila(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
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
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Lila
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div className="modal_body_content">
                        <i className="title">* mumble mumble *</i>
                        <div>So many bills... not enough JEWEL...</div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalJeweler}
                onClose={() => {
                  setModalJeweler(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
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
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Jeweler
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div className="modal_body_content modal-jeweler">
                        <div className="popup-jeweler-head">
                          <div className="border_content">
                            <h1>Jeweler Ian</h1>
                            <p>
                              You can stake your JEWEL tokens here. We provide
                              rewards for those who do. You may withdraw at any
                              time.
                            </p>
                          </div>
                          <div className="border_content">
                            <button
                              onClick={() => {
                                setModalDeposit(true)
                              }}
                              className="cursor-btn deposit"
                            >
                              Deposit
                            </button>
                            <button
                              onClick={() => {
                                setModalClaim(true)
                              }}
                              className="cursor-btn claim"
                            >
                              Claim
                            </button>
                            <button
                              onClick={() => {
                                setModalWithdraw(true)
                              }}
                              className="cursor-btn withdraw"
                            >
                              Withdraw
                            </button>
                          </div>
                        </div>
                        <div className="popup-jeweler-body">
                          <div className="TVL">
                            <span>🏆</span>TVL:<span>$539,932,790</span>
                          </div>
                          <div className="dex-fee">
                            <div className="dex-fee-head">
                              <div>Jeweler - DEX fee sharing</div>
                              <div>
                                Stake your JEWEL tokens and earn 1/3rd of
                                generated trading fees.
                              </div>
                            </div>
                            <div className="dex-fee-body bordered-box bordered-box-hero">
                              <div className="jeweler-balance">
                                Your xJEWEL Balance
                                <div>(1 xJEWEL = 1.716 JEWEL)</div>
                              </div>
                              <div className="quantity">
                                <img
                                  src="/images/jeweler/mid-jewel.png"
                                  alt=""
                                />
                                <div>0.0000</div>
                              </div>
                              <div className="your-token">
                                You have <span>0.00</span> JEWEL tokens
                                available to deposit to the Jeweler.
                              </div>
                            </div>
                          </div>
                          <div className="popup-jeweler-body-msg">
                            <span>💡</span>
                            Your JEWEL tokens grow as the xJEWEL multiplier goes
                            up. Tokens are 100% unlocked when they are claimed.
                            The Jeweler does not have any withdrawal fees.
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalDeposit}
                onClose={() => {
                  setModalDeposit(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    zIndex: '10001',
                    border: '1px solid rgb(76, 62, 35)',
                    padding: '0',
                    maxWidth: '550px',
                    maxHeight: '450px',
                    height: '90vh',
                    margin: 'auto',
                    overflow: 'hidden auto',
                    color: '#fff',
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Jeweler
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div
                        className="modal_body_content"
                        style={{ padding: '20px' }}
                      >
                        <div
                          style={{
                            background: 'rgb(33, 36, 41)',
                            border: '1px solid rgb(44, 47, 54)',
                            padding: '10px',
                          }}
                        >
                          <div
                            className="available-to-deposit"
                            style={{
                              textAlign: 'right',
                              fontSize: '1.3rem',
                              color: 'rgb(195, 197, 203)',
                              margin: 0,
                            }}
                          >
                            Available to deposit: 0
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <input
                              className="input-deposit"
                              style={{
                                background: 'transparent',
                                color: 'white',
                                outline: 'none',
                                fontSize: '1.4rem',
                                width: '100%',
                              }}
                              placeholder="0.0"
                              type="number"
                            />
                            <div
                              className="btn-deposit-container"
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <button
                                className="cursor-btn"
                                style={{
                                  width: '50px',
                                  color: 'rgb(102, 153, 153)',
                                  backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                  border: '1px solid rgba(21, 61, 111, 0.44)',
                                  borderRadius: '0.5rem',
                                }}
                              >
                                50%
                              </button>
                              <button
                                className="cursor-btn"
                                style={{
                                  width: '50px',
                                  color: 'rgb(102, 153, 153)',
                                  backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                  border: '1px solid rgba(21, 61, 111, 0.44)',
                                  borderRadius: '0.5rem',
                                  marginTop: '5px',
                                }}
                              >
                                MAX
                              </button>
                            </div>
                            <button
                              className="cursor-btn btn-deposit-jewel"
                              style={{
                                fontSize: '1.3rem',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 10px',
                                padding: '5px 10px',
                                borderRadius: '12px',
                              }}
                            >
                              <img
                                style={{ width: '22px', marginRight: '10px' }}
                                src="/images/jeweler/JEWEL.png"
                              />
                              JEWEL
                            </button>
                          </div>
                        </div>
                        <div
                          className="quantity-jeweler"
                          style={{
                            textAlign: 'center',
                            padding: '20px 0',
                            fontSize: '1.1rem',
                            color: 'rgb(195, 197, 203)',
                          }}
                        >
                          (~<span>000</span>xJEWEL)
                        </div>
                        <div
                          className="btn-deposit-container"
                          style={{
                            display: 'flex',
                          }}
                        >
                          <button
                            className="cursor-btn"
                            style={{
                              width: '100%',
                              padding: '10px 0',
                              letterSpacing: '1px',
                              borderRadius: '5px',
                              backgroundColor: '#009c44',
                              opacity: '.4',
                            }}
                          >
                            APPROVE
                          </button>
                          <button
                            className="cursor-btn"
                            style={{
                              width: '100%',
                              padding: '10px 0',
                              letterSpacing: '1px',
                              borderRadius: '5px',
                              backgroundColor: '#009c44',
                              opacity: '.4',
                            }}
                          >
                            ENTER AN AMOUNT
                          </button>
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
                              alignItems: 'center',
                            }}
                          >
                            1
                          </div>
                          <div>
                            <div
                              style={{
                                width: '100px',
                                border: '1px solid rgb(195, 197, 203)',
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
                              alignItems: 'center',
                            }}
                          >
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalClaim}
                onClose={() => {
                  setModalClaim(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    zIndex: '10001',
                    border: '1px solid rgb(76, 62, 35)',
                    padding: '0',
                    maxWidth: '650px',
                    maxHeight: '600px',
                    height: '90vh',
                    margin: 'auto',
                    overflow: 'hidden auto',
                    color: '#fff',
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Jeweler
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div
                      className="modal__body__container"
                      style={{ padding: '20px', margin: '2px' }}
                    >
                      <div
                        className="modal_body_content"
                        style={{ padding: '20px 0' }}
                      >
                        <div
                          className="diamond-icon"
                          style={{
                            textAlign: 'center',
                            fontSize: '30px',
                          }}
                        >
                          💎
                        </div>
                        <div>
                          <p
                            style={{
                              textAlign: 'center',
                              fontSize: '30px',
                            }}
                          >
                            When you claim rewards, collected LP fees will be
                            used to market buy JEWEL.
                          </p>

                          <p
                            style={{
                              textAlign: 'center',
                              fontSize: '30px',
                              marginTop: '30px',
                            }}
                          >
                            The purchased JEWEL tokens will then be distributed
                            to the Jeweler stakers as a reward.
                          </p>
                        </div>
                      </div>
                      <button
                        className={'cursor-btn btn-claim-jeweler'}
                        onClick={() => {
                          setModalWaitClaim(true), setModalClaim(false)
                        }}
                        style={{
                          width: '100%',
                          padding: '13px 0',
                          letterSpacing: '1px',
                          borderRadius: '5px',
                          backgroundColor: '#009c44',
                          marginTop: '40px',
                          fontSize: '28px',
                        }}
                      >
                        Claim
                      </button>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalWaitClaim}
                onClose={() => {
                  setModalWaitClaim(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    zIndex: '10001',
                    border: '1px solid rgb(76, 62, 35)',
                    padding: '0',
                    maxWidth: '650px',
                    maxHeight: '400px',
                    height: '90vh',
                    margin: 'auto',
                    overflow: 'hidden auto',
                    color: '#fff',
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Jeweler
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div
                      className="modal__body__container"
                      style={{ padding: '20px', margin: '2px' }}
                    >
                      <div
                        className="modal_body_content"
                        style={{ padding: '20px 0' }}
                      >
                        <div
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            fontSize: '30px',
                            marginTop: '30px',
                          }}
                        >
                          Claiming Jeweler rewards
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            fontSize: '30px',
                            marginTop: '30px',
                          }}
                        >
                          Confirm this transaction in your wallet
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={modalWithdraw}
                onClose={() => {
                  setModalWithdraw(false)
                }}
              >
                <ModalOverlay
                  style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    cursor: 'url(/images/jeweler/default-cursor.png), auto',
                  }}
                />
                <ModalContent
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    zIndex: '10001',
                    border: '1px solid rgb(76, 62, 35)',
                    padding: '0',
                    maxWidth: '550px',
                    maxHeight: '450px',
                    height: '90vh',
                    margin: 'auto',
                    overflow: 'hidden auto',
                    color: '#fff',
                  }}
                >
                  <ModalHeader style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
                    Jeweler
                  </ModalHeader>
                  <ModalCloseButton
                    style={{ boxShadow: 'none' }}
                    className="cursor-btn"
                  />
                  <ModalBody>
                    <div className="modal__body__container">
                      <div
                        className="modal_body_content"
                        style={{ padding: '20px' }}
                      >
                        <div
                          style={{
                            background: 'rgb(33, 36, 41)',
                            border: '1px solid rgb(44, 47, 54)',
                            padding: '10px',
                          }}
                        >
                          <div
                            style={{
                              textAlign: 'right',
                              fontSize: '1.3rem',
                              color: 'rgb(195, 197, 203)',
                              margin: 0,
                            }}
                          >
                            Available to deposit: 0
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <input
                              className="input-withdraw"
                              style={{
                                background: 'transparent',
                                color: 'white',
                                outline: 'none',
                                fontSize: '1.4rem',
                                width: '100%',
                              }}
                              placeholder="0.0"
                              type="number"
                            />
                            <div
                              className="btn-deposit-container"
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <button
                                className="cursor-btn"
                                style={{
                                  width: '50px',
                                  color: 'rgb(102, 153, 153)',
                                  backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                  border: '1px solid rgba(21, 61, 111, 0.44)',
                                  borderRadius: '0.5rem',
                                }}
                              >
                                50%
                              </button>
                              <button
                                className="cursor-btn"
                                style={{
                                  width: '50px',
                                  color: 'rgb(102, 153, 153)',
                                  backgroundColor: 'rgba(21, 61, 111, 0.44)',
                                  border: '1px solid rgba(21, 61, 111, 0.44)',
                                  borderRadius: '0.5rem',
                                  marginTop: '5px',
                                }}
                              >
                                MAX
                              </button>
                            </div>
                            <button
                              className="cursor-btn btn-deposit-jewel"
                              style={{
                                fontSize: '1.3rem',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 10px',
                                padding: '5px 10px',
                                borderRadius: '12px',
                              }}
                            >
                              <img
                                style={{ width: '22px', marginRight: '10px' }}
                                src="/images/jeweler/JEWEL.png"
                              />
                              JEWEL
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '20px 0',
                            fontSize: '1.1rem',
                            color: 'rgb(195, 197, 203)',
                          }}
                        >
                          (~<span>000</span>xJEWEL)
                        </div>
                        <div
                          style={{
                            display: 'flex',
                          }}
                        >
                          <button
                            className="cursor-btn btn-enter-mount"
                            style={{
                              width: '100%',
                              padding: '10px 0',
                              letterSpacing: '1px',
                              borderRadius: '5px',
                              backgroundColor: '#009c44',
                              opacity: '.4',
                            }}
                          >
                            ENTER AN MOUNT
                          </button>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </div>

          <style jsx>{`
            .react-transform-wrapper.transform-component-module_wrapper__1_Fgj,
            .react-transform-component.transform-component-module_content__2jYgh {
              width: 100%;
              height: 100%;
            }
            .react-transform-component.transform-component-module_content__2jYgh {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .react-transform-wrapper.transform-component-module_wrapper__1_Fgj,
            .react-transform-component.transform-component-module_content__2jYgh {
              width: 350%;
              height: 150%;
            }
          `}</style>
        </JewelerPage>
      </VStack>
    </Layout>
  )
}

const JewelerPage = styled.div({
  '.container-jeweler': {
    backgroundColor: '#131313',
    height: '100vh',
    width: '100vw',
    padding: '0 !important',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'url(/images/jeweler/default-cursor.png), auto',
    overflow: 'hidden',
    '.jeweler': {
      position: 'absolute',
      backgroundImage: 'url(/images/jeweler/bank-bg.png)',
      minWidth: '1318px',
      height: '992.97px',
      zIndex: '1',
      backgroundSize: '100%',
      imageRendering: 'pixelated',
      backgroundRepeat: 'no-repeat',
      margin: '0 auto',
      '.info-info': {
        position: 'absolute',
        top: '498.868px',
        left: '318px',
        '.btn-info-info': {
          animation:
            '4.5s ease-in-out 0s infinite normal none running animate-btn',
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
          img: {
            position: 'absolute',
            minWidth: '80.2162px',
            height: '40.3142px',
            imageRendering: 'pixelated',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '2002',
          },
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
        left: '481.176px',
        top: '500px',
      },
    },
    '.react-transform-wrapper.transform-component-module_wrapper__1_Fgj': {
      width: '100%',
      height: '100%',
    },
    '.react-transform-component.transform-component-module_content__2jYgh': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '@media (max-width: 768px)': {
      '.react-transform-wrapper.transform-component-module_wrapper__1_Fgj': {
        width: '350%',
        height: '150%',
      },
      '.react-transform-component.transform-component-module_content__2jYgh': {
        width: '350%',
        height: '150%',
      },
    },
  },
})
