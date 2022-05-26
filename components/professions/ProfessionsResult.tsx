import style from './professionsResult.module.css'
import professionsStyle from './professions.module.css'
type Props = {
  npc: string
}

function ProfessionsResult(props: Props) {
  const { npc } = props
  return (
    <div
      className={`overlay ${professionsStyle.professionsOverlay} ${style.modalOverlay}`}
    >
      <div className={style.modal}>
        <div className={style.modalLine}></div>
        <h3 className={style.board}>
          <img src="/images/professions/finishBoard.png" alt="Sell board" />
        </h3>

        <div className={style.modalCotent}>
          <h4>CONGRATULATION !</h4>
          <p>
            YOUR AVATAR IS AN {npc} LET&apos;S GO CHECK OUT AMAZING THINGS YOU CAN DO
            IN OPENWORLD !
          </p>
        </div>

        <a href="./professions" className={style.fisnishBtn}></a>
      </div>
    </div>
  )
}

export default ProfessionsResult
