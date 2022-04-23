import style from './professionsBtn.module.css'

type Props = {
  title: string
}

export default function ProfessionsBtn(props: Props) {
  const { title } = props

  return (
    <button className={`${style.gameButton} click-cursor`}>
      <div className={style.title}>{title}</div>
      <img
        className={style.bubbleArrow}
        src="/images/borders/bubble-arrow.png"
        alt=""
      />
    </button>
  )
}
