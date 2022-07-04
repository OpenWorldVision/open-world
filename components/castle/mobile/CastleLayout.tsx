import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './CastleLayout.module.css'
import {
  fetchProfessionsNFTAmount,
  fetchProfessionsNFTPrices,
} from 'utils/professions'

const CastleLayout = ({ onPressBuyNFT }) => {
  const [nftsAmount, setNftsAmount] = useState({
    openianAmount: 0,
    supplierAmount: 0,
    blacksmithAmount: 0,
  })
  const [nftsPrices, setNftsPrices] = useState({
    openianPrice: '0',
    supplierPrice: '0',
    blacksmithPrice: '0',
  })

  const fetchNFTAmount = useCallback(async () => {
    const amount = await fetchProfessionsNFTAmount()
    setNftsAmount(amount)
  }, [])

  const fetchNFTPrices = useCallback(async () => {
    const prices = await fetchProfessionsNFTPrices()
    setNftsPrices(prices)
  }, [])
  const initialize = async () => {
    await fetchNFTAmount()
    await fetchNFTPrices()
  }

  useEffect(() => {
    initialize()
  }, [])

  const _onPressBuyNFT = useCallback(
    (nft) => {
      onPressBuyNFT(nft)
    },
    [onPressBuyNFT]
  )

  const renderFooter = useCallback(
    (nft) => {
      return (
        <div className={styles.layoutFooter}>
          <div className={styles.containerFooter}>
            <div className={styles.priceBar}>
              <p>{nft?.price}</p>
              <img src="/images/castle/mobile/coin2.webp" alt="coin" />
            </div>
            <div className={styles.rightSide}>
              <p>Available: {nft.available}</p>
            </div>
          </div>
          <div className={styles.buttonBuy} onClick={() => _onPressBuyNFT(nft)}>
            <p>Buy NFT</p>
          </div>
        </div>
      )
    },
    [_onPressBuyNFT]
  )

  const listNFTs = [
    {
      id: 'openian',
      name: 'openian',
      image: '/images/professions/npc/openianNPC.webp',
      price: nftsPrices.openianPrice,
      available: nftsAmount.openianAmount,
    },
    {
      id: 'supplier',
      name: 'supplier',
      image: '/images/professions/npc/supplierNPC.webp',
      price: nftsPrices.supplierPrice,
      available: nftsAmount.supplierAmount,
    },
    {
      id: 'blacksmith',
      name: 'blacksmith',
      image: '/images/professions/npc/smithNPC.webp',
      price: nftsPrices.blacksmithPrice,
      available: nftsAmount.blacksmithAmount,
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundText}>
          Castle is the place to manage residents, you can buy NTF to activate
          the profession
        </div>
      </div>
      <div className={styles.containerList}>
        <div className={styles.containerListInside}>
          {listNFTs.map((nft) => {
            return (
              <div key={nft.id} className={styles.containerClassImage}>
                <img
                  src={nft.image}
                  className={styles.classImage}
                  alt={'classImage'}
                />
                {renderFooter(nft)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

CastleLayout.propTypes = {}

export default CastleLayout
