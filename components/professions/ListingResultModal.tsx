import style from './listingResultModal.module.css'
import { Button } from '@chakra-ui/react';

type Props = {
  isSuccess: boolean
  toggleModal: () => void
}

function ListingResultModal(props: Props) {
  const { isSuccess, toggleModal } = props
  return (
    <div className={`overlay ${style.modalOverlay}`}>
      <div className={style.modal}>
        <div className={style.modalLine}></div>
        <h3 className={style.board}>
          <img src="/images/professions/finishBoard.png" alt="Finish" />
        </h3>

        <div className={style.modalCotent}>

          <span>Listing items to Market
            {isSuccess ? ' successfully!' : ' failed!'}
          </span>
        </div>

        <Button
          className={`${style.confirmBtn} click-cursor`}
          onClick={() => toggleModal()}
        ></Button>
      </div>
    </div>
  )
}

export default ListingResultModal
