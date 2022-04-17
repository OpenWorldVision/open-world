import style from './BunkerCraftStyle.module.css'

export default function BunkerCraft() {
  const Arraytest = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]
  return (
    <>
      <div className={style.bunkerCraftGold}>
        <div className={`${style.currentGold}`}>
          <div>
            <img src="/images/alchemist/gold-bag.png" alt="pocket-gold" />
            <img src="/images/alchemist/gold-pile.png" alt="gold" />
          </div>
          <div className={style.gold}>0 Gold</div>
        </div>
      </div>
      <div className={style.bunkerItemContainer}>
        {Arraytest.map((item, index) => {
          return (
            <div key={index} className={style.bunkerItem}>
              <div
                className={`${style.currentGold} ${style.sizeBackgroundItem}`}
              ></div>
            </div>
          )
        })}
      </div>
    </>
  )
}
