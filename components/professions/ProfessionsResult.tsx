import style from './professionsResult.module.css'
import professionsStyle from './professions.module.css'
import { Button } from '@chakra-ui/button';
type Props = {
  activateResult: boolean
  npc: string
  closeModal: (any) => void
}

function ProfessionsResult(props: Props) {
  const { npc, activateResult, closeModal } = props
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
          {activateResult ?
            <>
              <h4>CONGRATULATIONS !!</h4>
              <p>
                YOUR AVATAR IS {npc !== 'openian' ? 'A' : 'AN'} {npc} LET&apos;S GO CHECK OUT THE AMAZING THINGS YOU CAN DO
                IN OPENWORLD !
              </p>
            </>
            :
            <h4>FAILED!</h4>
          }
        </div>

        {activateResult ?
          <a href="./professions" className={`${style.fisnishBtn} click-cursor`}></a>
          :
          <Button className={`${style.confirmBtn} click-cursor`} onClick={() => closeModal(undefined)}></Button>
        }
      </div>
    </div>
  )
}

export default ProfessionsResult
