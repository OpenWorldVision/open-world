/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
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
import styles from '../../components/entry.module.css'
import Link from 'next/link'
import { chainName } from 'utils/chainName'
import { getBalanceOfOpen } from '../../utils/checkBalanceOpen'
import { getWeb3Client } from '@lib/web3'
// import ModalAddWallet from './components/ModalAddWallet'

const Entry = () => {
  const [playMusic, setPlayMusic] = useState(false)
  const [playSound, setPlaySound] = useState(false)
  const [nameOfChain, setNameOfChain] = useState('Binance Smart Chain')
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false)
  //deploy cloudfare 2
  useEffect(() => {
    try {
      const connectWallet = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const chainId = window?.ethereum?.chainId
          setNameOfChain(chainName[chainId] || '')
          window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(() => {
              if (
                chainId !== '0x38' &&
                process.env.environment === 'production'
              ) {
                window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x38' }],
                })
              }
            })
            .catch(() => {
              // setErrorMessage(error.message);
            })
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
    const web3Client = await getWeb3Client()
    const balance = await getBalanceOfOpen(web3Client)
    if (balance === 0) {
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
  return (
    <div className={styles.main}>
      <img src={'/images/common/gameLogo.png'} alt={'logo'} />
      <Link href={'/home'} passHref>
        <Button
          style={_styles.buttonStyle}
          // onClick={connectWallet}
        >
          <Text style={_styles.buttonText}>PLAY</Text>
        </Button>
      </Link>
      <div className={styles.bottomContainer}>
        <div>
          <div className={styles.rowView}>
            <div
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
            <div onClick={() => setPlay('sound')}>
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
  )
}

const _styles = {
  buttonStyle: {
    backgroundColor: '#019C44',
    maxWidth: 300,
    width: '100%',
    marginTop: '24px',
  },
  buttonText: {
    color: '#fff',
    paddingRight: 24,
    paddingLeft: 24,
  },
}

export default Entry
