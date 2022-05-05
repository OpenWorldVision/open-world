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
import Link from 'next/link'
import { chainName } from 'utils/chainName'
import { getBalanceOfOpen } from '../../utils/checkBalanceOpen'
import { getWeb3Client } from '@lib/web3'
// import ModalAddWallet from './components/ModalAddWallet'

type Props = {
  checkIsConnected: (boolean) => void
}

export default function Entry(props: Props) {
  const { checkIsConnected } = props

  const [playMusic, setPlayMusic] = useState(false)
  const [playSound, setPlaySound] = useState(false)
  const [nameOfChain, setNameOfChain] = useState('Harmony Mainnet')
  const [openModalAddWallet, setOpenModalAddWallet] = useState(false)
  //deploy cloudfare 2
  useEffect(() => {
    try {
      connectWallet()
      checkTokenWasAdded()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            checkIsConnected(true)
          })
          .catch(() => {
            checkIsConnected(false)
          })
      } else {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(() => {
            // checkIsConnected(true)
            window.ethereum
              .request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x63564c40' }],
              })
              .then(() => {
                checkIsConnected(true)
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
            checkIsConnected(false)
          })
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

  const switchWallet = () => {
    connectWallet()
  }
  return (
    <div className={styles.main}>
      <img src={'/images/common/gameLogo.png'} alt={'logo'} />
      <Link href={'/'} passHref>
        <Button style={_styles.buttonStyle} onClick={switchWallet}>
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
  },
  buttonText: {
    color: '#fff',
    paddingRight: 24,
    paddingLeft: 24,
  },
}
