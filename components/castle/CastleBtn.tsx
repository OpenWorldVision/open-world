import style from './castleBtn.module.css'

type Props = {
  title: string
}

export default function CastleBtn(props: Props) {
  const { title } = props

  return (
    <button className={`${style.gameButton} click-cursor`}>
      <div className={style.title}>{title}</div>
      <img
        className={style.bubbleArrow}
        src="/images/castle/borders/bubble-arrow.png"
        alt=""
      />
    </button>
  )
}
