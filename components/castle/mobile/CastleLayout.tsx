import React, { useCallback, useEffect, useState } from 'react'
import styles from './CastleLayout.module.css'
import {} from 'utils/professions'

const CastleLayout = ({ onPressBuyNFT, listNFTs }) => {
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
          <div className={styles.headerBox}>
            <p>Selling Items</p>
          </div>
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
