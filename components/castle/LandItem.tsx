import style from './landItem.module.css'
import CastleModal from './CastleModal'
import { useState } from 'react'

const regions = [
  'Adelyn',
  'Adelyn Highlands',
  'Amber Town',
  "Amoriath's Domain",
  'Breakwater Island',
  'Dornielle Abbey',
  'Esterfork',
  'Fairling Forest',
  "Gaeron's Wood",
  'Haywoord',
  "Illyria's Rest",
  'Lake of Knives',
  "Old King's Barrow",
  'Riverhold',
  "Stefan's Lake",
  'Stillwood Meadow',
]

type Owner = {
  name: string
  walletAddress: string
}

type Land = {
  id: number
  name: string
  region: number
  status: number
  level: number
  price: number
  owner: Owner
}

type Props = {
  land: Land
  action: number
}

export default function LandItem(props: Props) {
  const { land, action } = props

  const [isLandDetailOpen, setIsLandDetailOpen] = useState(false)

  return (
    <>
      <div className={style.landItem}>
        {/* land image */}
        <div className={style.landImageWrap}>
          <div
            className={style.landImage}
            style={{
              backgroundImage: `url('/images/castle/lands/land-${land.id}.png')`,
            }}
          >
            {land.status === 0 && (
              <div className={`green-button ${style.landSaleTag}`}>
                For sale
              </div>
            )}
          </div>
        </div>

        <div className={style.landItemDetails}>
          {/* header */}
          <div className={style.landItemHeader}>
            <p>{land.name}</p>
            <p>#{land.id}</p>
          </div>

          {/* info */}
          <div className={style.landInfo}>
            <div className={style.landInfoRow}>
              <p>{regions[land.region]}</p>
              <p>Region {land.region}</p>
            </div>
            <div className={style.landInfoRow}>
              <p>Level</p>
              <p>{land.level}</p>
            </div>

            {land.status === 0 && action === 0 && (
              <div className={style.landInfoRow} style={{ fontWeight: 'bold' }}>
                <p>For sale</p>
                <p>{land.price}</p>
              </div>
            )}
            {land.status !== 0 && action === 0 && (
              <div className={style.landInfoRow}>
                <p>Not for sale</p>
              </div>
            )}
          </div>
        </div>

        {action === 1 && (
          <div className={style.landItemPrice}>
            <img src="/images/castle/jewel.png" alt="" />
            <p>{land.price}</p>
          </div>
        )}
        <div className={style.landItemButtonWrap}>
          {action === 0 ? (
            <button
              className="green-button click-cursor"
              onClick={() => setIsLandDetailOpen(true)}
            >
              View Details
            </button>
          ) : (
            <button
              className="green-button click-cursor"
              onClick={() => setIsLandDetailOpen(true)}
            >
              Buy Land
            </button>
          )}
        </div>
      </div>

      {/* land detail modal */}
      <CastleModal
        isOpen={isLandDetailOpen}
        toggleModal={() => setIsLandDetailOpen(false)}
        title={land.name}
        width={420}
        zIndex={999999}
      >
        <div className="modal">
          <h3 className="land-id">Land #{land.id}</h3>
          <h4 className="land-region">{regions[land.region]}</h4>

          <div className="land-level">
            <p>Level</p>
            <p>{land.level}</p>
          </div>

          {action === 1 && (
            <>
              <div className="land-item__price land-price">
                <img src="/images/castle/jewel.png" alt="" />
                <p>{land.price}</p>
              </div>

              <div className="land-purchase">
                <button className="green-button click-cursor">
                  Approve Contract
                </button>
              </div>
            </>
          )}

          <div className="land-owner">
            <p>Ruled by: {land.owner.name}</p>
            <p>{land.owner.walletAddress}</p>
          </div>
        </div>
      </CastleModal>

      <style jsx>{`
        .modal .land-id {
          margin: 0;
          font-weight: 400;
          color: #3e1f05;
          font-family: Poppins;
          text-align: center;
        }

        .modal .land-region {
          margin: 5px auto;
          font-weight: 400;
          font-size: 14px;
          color: #3e1f05;
          font-family: Poppins;
          text-align: center;
        }

        .modal p {
          color: #3e1f05;
          margin: 0;
        }

        .modal .land-level {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          margin: 32px auto 12px;
          width: 80%;
          max-width: 300px;
          border-radius: 8px;
          background-color: #efcba2;
        }

        .modal .land-level p:first-child {
          font-family: 'Lora', Georgia, serif;
          font-weight: 400;
        }

        .modal .land-owner {
          text-align: center;
          margin: 32px 0 16px;
        }

        .modal .land-owner p:first-child {
          font-weight: 600;
        }

        .modal .land-owner p:nth-child(2) {
          font-size: 12px;
        }

        .modal .land-price {
          margin: 16px 0 0;
          text-align: center;
        }

        .modal .land-purchase {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
