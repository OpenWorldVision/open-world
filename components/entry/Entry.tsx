/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import styles from '@components/entry/entry.module.css'
import { chainName } from 'utils/chainName'
import { getOpenBalance } from '../../utils/checkBalanceOpen'
import { useDispatch, useSelector } from 'react-redux'
import { updateIsConnected } from 'reduxActions/isConnectedAction'
import Head from 'next/head'

export default function Entry() {
  const [playMusic, setPlayMusic] = useState(false)
  const [playSound, setPlaySound] = useState(false)
  const [nameOfChain, setNameOfChain] = useState('Binance Smart Chain')
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false)
  const [checkIsConnect, setCheckIsConnect] = useState(false)

  const dispatch = useDispatch()
  const isOpen = useSelector((state: any) => {
    return state.isOpenEntryPage.isOpen
  })

  useEffect(() => {
    try {
      const connectWallet = async () => {
        if (window.ethereum) {
          const chainId = window?.ethereum?.chainId
          setNameOfChain(chainName[chainId] || '')
          if (
            chainId === '0x63564c40' ||
            chainId === '0x6357d2e0' ||
            chainId === '0x61'
          ) {
            window.ethereum
              .request({ method: 'eth_requestAccounts' })
              .then(() => {
                setCheckIsConnect(true)
              })
              .catch(() => {
                setCheckIsConnect(false)
                dispatch(updateIsConnected({ isConnected: false }))
              })
          } else {
            window.ethereum
              .request({ method: 'eth_requestAccounts' })
              .then(() => {
                setCheckIsConnect(true)
                window.ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x63564c40' }],
                  })
                  .then(() => {
                    setCheckIsConnect(true)
                  })
                  .catch((error) => {
                    window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '0x63564c40',
                          chainName: 'Harmony Mainnet',
                          rpcUrls: ['https://api.harmony.one'],
                          nativeCurrency: {
                            name: 'ONE',
                            symbol: 'ONE',
                            decimals: 18,
                          },
                        },
                      ],
                    })
                  })
              })
              .catch(() => {
                dispatch(updateIsConnected({ isConnected: false }))
                setCheckIsConnect(false)
              })
          }
        }
      }

      connectWallet()
      checkTokenWasAdded()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const subscribeChainChanged = window.ethereum.on(
        'chainChanged',
        async () => {
          setTimeout(async () => {
            await connectWallet()
          }, 1000)
        }
      )
      const subscribeWalletChanged = window.ethereum.on(
        'accountsChanged',
        async () => {
          setTimeout(async () => {
            await checkTokenWasAdded()
          }, 1000)
        }
      )
      return () => {
        if (typeof subscribeChainChanged === 'function') {
          subscribeChainChanged()
        }
        if (typeof subscribeWalletChanged === 'function') {
          subscribeWalletChanged()
        }
      }
    } catch (error: unknown) {
      setOpenModalAddWallet(true)
    }
  }, [])
  const checkTokenWasAdded = async () => {
    const balance = await getOpenBalance(false)
    if (!balance) {
      const tokenAddress = '0x27a339d9B59b21390d7209b78a839868E319301B'
      const tokenSymbol = 'OPEN'
      const tokenDecimals = 18
      const tokenImage =
        'https://nomics.com/imgpr/https%3A%2F%2Fs3.us-east-2.amazonaws.com%2Fnomics-api%2Fstatic%2Fimages%2Fcurrencies%2FXBLADE.jpeg?width=96'
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: tokenImage,
              },
            },
          })
        } catch (error: unknown) {}
      }
    }
  }
  const onCloseModal = () => {
    setOpenModalAddWallet(false)
  }
  const onAddMetamask = () => {
    window.open(
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      '_blank'
    )
  }

  const setPlay = (type) => {
    if (type === 'sound') {
      setPlaySound(!playSound)
    } else {
      setPlayMusic(!playMusic)
    }
  }

  const handleClickPlay = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts) {
        dispatch(updateIsConnected({ isConnected: true}))
      }
    } catch {
      dispatch(updateIsConnected({ isConnected: false}))
    }
  }

  return (
    <>
      <Head>
        <title>Open World</title>
      </Head>
      <div className={styles.main}>
        <img
          src={'/images/common/gameLogo.webp'}
          alt={'logo'}
          className={styles.entryLogo}
        />

        <div className={styles.entryBackground} />
        <Button
          style={_styles.buttonStyle}
          className="click-cursor"
          onClick={handleClickPlay}
        >
          <Text style={_styles.buttonText}>PLAY</Text>
        </Button>
        <div className={styles.bottomContainer}>
          <div>
            <div className={styles.rowView}>
              <div
                className="click-cursor"
                style={{ marginRight: '1rem' }}
                onClick={() => setPlay('music')}
              >
                <img
                  src={
                    playMusic
                      ? '/images/common/play.svg'
                      : '/images/common/notplay.svg'
                  }
                  alt={'musicPlay'}
                  className={styles.iconStyle}
                />
              </div>
              <div className="click-cursor" onClick={() => setPlay('sound')}>
                <img
                  src={
                    playSound
                      ? '/images/common/sound.png'
                      : '/images/common/mute.png'
                  }
                  alt={'soundPlay'}
                  className={styles.iconStyle}
                />
              </div>
            </div>
            <Text color={'#019C44'} fontSize={12}>
              {nameOfChain}
            </Text>
          </div>
        </div>
        <Modal isOpen={openModalAddWallet} onClose={onCloseModal} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Please add your wallet</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button
                  backgroundColor={'#019C44'}
                  variant="ghost"
                  onClick={onAddMetamask}
                  textColor={'#fff'}
                >
                  Add Metamask
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </div>
    </>
  )
}

const _styles = {
  buttonStyle: {
    backgroundColor: '#019C44',
    maxWidth: 300,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    paddingRight: 24,
    paddingLeft: 24,
  },
}
