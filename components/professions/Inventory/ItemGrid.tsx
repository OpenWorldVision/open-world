import { Spinner } from '@chakra-ui/react'
import React, { useMemo } from 'react'
type Props = {
  loading: boolean
  onClose: () => void
  onClickItem: (value: { type: string; ids: number[] }) => void
  data: { type: 'sushi' | 'ore' | 'hammer' | 'fish'; ids: number[] }[]
}
function ItemGrid({ onClose, onClickItem, loading, data }: Props) {
  const renderData = useMemo(
    () => [...data, ...Array(16 - data?.length)],
    [data]
  )
  return (
    <div className="container">
      <div className="container-body">
        <img
          className="container-close click-cursor"
          src="/images/inventory/close.png"
          alt="img"
          onClick={onClose}
        />
        <div className="container-items">
          {loading && <Spinner />}
          {renderData.map((value, index) => {
            if (!value) {
              return <div key={`${value}${index}`} className="container-item" />
            }

            return (
              <div
                key={`${value.indexItem}${index}`}
                className="container-item click-cursor"
              >
                <img
                  onClick={() => onClickItem(value)}
                  src={`/images/inventory/items/${value.type}Amount.png`}
                  alt="img"
                />
                <div>{value?.ids?.length}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ItemGrid
