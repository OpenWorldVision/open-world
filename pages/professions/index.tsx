import style from '../../components/professions/professions.module.css'
import ProfessionsSelection from '@components/professions/ProfessionsSelection'
import Openian from '@components/professions/openian/Openian'
import { useSelector } from 'react-redux'


function Professions() {
  const profile = useSelector((state: any) => { return state.ProfileStore.profile })

  return (
    <div className={`${style.professionsOverlay} overlay game-scroll-bar`}>
      <div className={style.professionsContainer}>
        {profile?._profession === '0' &&
          <ProfessionsSelection />
        }
        {profile?._profession === '1' &&
          <Openian />
        }
      </div>
    </div>
  )
}

export default Professions
