import style from './CraftPositionStyle.module.css'
// import { craftData } from './base/ItemCraftData'
import { useState } from 'react'

export default function CraftPotionsContainer(props) {
  const [opacity, setOpacity] = useState('')

  return (
    <>
      <div className={style.craftPotionsContainer}>
        <div className={style.headCraftPosition}>
          <img src="/images/alchemist/bg-craft-positon.png" alt="bg-craft" />
          <h3>Craft potions</h3>
        </div>
        <div className={style.craftItemContainer}>
          {/* {craftData.map((item) => {
            return (
              <div
                onClick={() => {
                  setOpacity('none')
                }}
                className={`${style.bgItem} ${style.sizeBackgroundItem} ${style.craftItem} cursor-btn`}
              >
                <div className={`${style.craftItemBgOpacity}`}>
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
            )
          })} */}
        </div>
      </div>
    </>
  )
}
