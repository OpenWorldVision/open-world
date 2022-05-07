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
// import ModalAddWallet from './components/ModalAddWallet'

type Props = {
  nameOfChain: string
  openModalAddWalletProp: boolean
}

export default function Entry(props: Props) {
  const { nameOfChain, openModalAddWalletProp } = props

  const [playMusic, setPlayMusic] = useState(false)
  const [playSound, setPlaySound] = useState(false)
  const [openModalAddWallet, setOpenModalAddWallet] = useState(openModalAddWalletProp)
  
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
      <Link href={'/'} passHref>
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
  },
  buttonText: {
    color: '#fff',
    paddingRight: 24,
    paddingLeft: 24,
  },
}
