import style from './CraftPositionStyle.module.css'
import { craftData } from './base/ItemCraftData'
import { useState } from 'react'
import CraftItemSelected from './CraftItemSelected'
import CraftItemApproval from './CraftItemApproval'

export default function CraftPotionsContainer() {
  const [checkItemCraftSelect, setCheckItemCraftSelect] = useState(
    craftData[0].codeName
  )
  const [itemCraftSelect, setItemCraftSelect] = useState(craftData[0])
  const [valueInputSelectCraft, setValueInputSelectCraft] = useState(0)

  const handlePrevInput = () => {
    if (valueInputSelectCraft > 0) {
      setValueInputSelectCraft(valueInputSelectCraft - 1)
    }
  }

  const handleDecInput = () => {
    setValueInputSelectCraft(valueInputSelectCraft + 1)
  }

  return (
    <>
      <div className={style.craftPotionsContainer}>
        <div className={style.headCraftPosition}>
          <img src="/images/alchemist/bg-craft-positon.png" alt="bg-craft" />
          <h3>Craft potions</h3>
        </div>
        <div className={style.craftItemContainer}>
          {craftData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCheckItemCraftSelect(item.codeName)
                  setItemCraftSelect(item)
                }}
                className={`${style.bgItem} ${style.sizeBackgroundItem} ${
                  style.craftItem
                } ${
                  checkItemCraftSelect === item.codeName &&
                  style.ItemCraftSelect
                } cursor-btn`}
              >
                <div className={`${style.craftItemBgContainer}`}>
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
            )
          })}
        </div>
        <CraftItemSelected craftItemSelected={itemCraftSelect} />
        <div>
          <div className={style.CraftItemQuantitySelected}>
            <button
              onClick={handlePrevInput}
              className={`${style.BtnQuantityCraft}`}
            >
              -
            </button>
            <input
              className={`${style.InputQuantitySelectCraft}`}
              type="text"
              pattern="[0-9.]+"
              placeholder="0"
              value={valueInputSelectCraft}
            />
            <button
              onClick={handleDecInput}
              className={`${style.BtnQuantityCraft}`}
            >
              +
            </button>
          </div>
          <button className={`${style.BtnMaxQuantitySelect} cursor-btn`}>
            max
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <div className={style.Ingredients}>Ingredients</div>
          {itemCraftSelect && (
            <CraftItemApproval craftItemSelected={itemCraftSelect} />
          )}
        </div>
        <div className={`${style.FancyButton}`}>
          <button disabled className={`${style.DisabledButton} cursor-btn`}>
            CRAFT
          </button>
        </div>
      </div>
    </>
  )
}
