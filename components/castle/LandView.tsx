import style from './landView.module.css'
import { useRef, useEffect, useState, useCallback } from 'react'
import LandList from './LandList'

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
  action: number
  lands: Array<Land>
  closeLandAuction: () => void
}

export default function LandView(props: Props) {
  const { action, lands, closeLandAuction } = props

  const landPropertySort = useRef<HTMLSelectElement>()
  const landTypeSort = useRef<HTMLSelectElement>()
  const [sortedLands, setSortedLands] = useState([...lands])

  const getTitle = () => {
    return action === 0 ? 'View All Land' : 'Buy Land'
  }

  const sortLand = useCallback(() => {
    const tempSortLand = [...lands]
    switch (landPropertySort.current?.value) {
      case '0':
        tempSortLand.sort((a, b) => {
          return a.id - b.id
        })
        break
      case '1':
        tempSortLand.sort((a, b) => {
          return a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        })
        break
      case '2':
        tempSortLand.sort((a, b) => {
          return a.region - b.region
        })
        break
      case '3':
        tempSortLand.sort((a, b) => {
          return a.level - b.level
        })
        break
      default:
        tempSortLand.sort((a, b) => {
          return a.price - b.price
        })
    }

    if (landTypeSort.current?.value === '1') {
      tempSortLand.reverse()
    }
    setSortedLands(tempSortLand)
  }, [lands])

  useEffect(() => {
    setSortedLands(lands)
    sortLand()
  }, [lands])

  return (
    <div className={`${style.landViewContainer} game-border fancy`}>
      <div className="close-btn click-cursor" onClick={closeLandAuction}></div>

      {/* Heading */}
      <h2 className={style.landViewHeading}>{getTitle()}</h2>

      {/* Summary & Sort */}
      <div className={style.summrySortLand}>
        <div className={style.landSummary}>
          <span>Showing {lands.length} lands</span>
        </div>

        <div className={style.landSort}>
          <span className={style.landSortLabel}>Sort by: </span>

          <div className={style.landSelectList} id={style.landPropertyLabel}>
            <select
              ref={landPropertySort}
              title="landPropertySort"
              className="click-cursor"
              name="landProperty"
              id="landProperty"
              defaultValue="4"
              onClick={sortLand}
            >
              <option value="0">ID</option>
              <option value="1">Name</option>
              <option value="2">Region</option>
              <option value="3">Level</option>
              <option value="4">Sale Price</option>
            </select>
          </div>

          <div className={style.landSelectList}>
            <select
              ref={landTypeSort}
              title="sortType"
              className="click-cursor"
              name="sortType"
              id="sortType"
              defaultValue="0"
              onChange={sortLand}
            >
              <option value="0">Ascending</option>
              <option value="1">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <hr></hr>

      {/* Land List */}
      <LandList lands={sortedLands} action={action} />
    </div>
  )
}
