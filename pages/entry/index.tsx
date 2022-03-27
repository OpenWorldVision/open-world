import React, { useEffect, useState } from 'react'
import { Button, Text } from '@chakra-ui/react'
import styles from '../../components/entry.module.css'
import Image from 'next/image'
import { commonImage } from 'assets/images/common'
import Link from 'next/link'
import { chainName } from 'utils/chainName'

const Entry = () => {
  const [playMusic, setPlayMusic] = useState(false)
  const [playSound, setPlaySound] = useState(false)
  const [nameOfChain, setNameOfChain] = useState('Binance Smart Chain')
  //deploy cloudfare
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const chainId = window.ethereum.chainId
        setNameOfChain(chainName[chainId])
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((result) => {
            if (chainId !== '0x38') {
              window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x38' }],
              })
            }
          })
          .catch((error) => {
            console.log('error', error)
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
  }, [])
  const checkTokenWasAdded = async () => {
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
      } catch (error) {
        console.log(error)
      }
    }
    // try {
    //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    //   const wasAdded = await window.ethereum.request({
    //     method: 'wallet_watchAsset',
    //     params: {
    //       type: 'ERC20', // Initially only supports ERC20, but eventually more!
    //       options: {
    //         address: tokenAddress, // The address that the token is at.
    //         symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //         decimals: tokenDecimals, // The number of decimals in the token
    //         image: tokenImage, // A string url of the token logo
    //       },
    //     },
    //   })
    //   if (wasAdded) {
    //     console.log('Thanks for your interest!')
    //   } else {
    //     console.log('Your loss!')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }
  // const goToHomePage = () => {}
  return (
    <div className={styles.main}>
      <Image src={commonImage.gameLogo} alt={'logo'} />
      <Button
        style={{
          backgroundColor: '#019C44',
          maxWidth: 300,
          width: '100%',
          marginTop: '24px',
        }}
        // onClick={connectWallet}
      >
        <Link href={'/home'} passHref>
          <Text style={{ color: '#fff', paddingRight: 24, paddingLeft: 24 }}>
            PLAY
          </Text>
        </Link>
      </Button>
      <div className={styles.bottomContainer}>
        <div>
          <div className={styles.rowView}>
            <div
              style={{ marginRight: '1rem' }}
              onClick={() => setPlayMusic(!playMusic)}
            >
              <Image
                src={playMusic ? commonImage.play : commonImage.notplay}
                width={20}
                height={20}
                alt={'musicPlay'}
              />
            </div>
            <div onClick={() => setPlaySound(!playSound)}>
              <Image
                src={playSound ? commonImage.sound : commonImage.mute}
                width={20}
                height={20}
                alt={'musicPlay'}
              />
            </div>
          </div>
          <Text color={'#019C44'} fontSize={12}>
            {nameOfChain}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Entry
