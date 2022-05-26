import style from '../../components/professions/professions.module.css'
import ProfessionsSelection from '@components/professions/ProfessionsSelection'
import Openian from '@components/professions/openian/Openian'
import Blacksmith from '@components/professions/blacksmith/Blacksmith'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Supplier from './supplier'

function Professions() {
  const profile = useSelector((state: any) => {
    return state.ProfileStore.profile
  })

  return (
    <>
      <Head>
        <title>Professions</title>
      </Head>
      <div className={`${style.professionsOverlay} overlay game-scroll-bar`}>
        <div className={style.professionsContainer}>
          {profile?._profession === '0' && <ProfessionsSelection />}
          {profile?._profession === '1' && <Openian />}
          {profile?._profession === '2' && <Supplier />}
          {profile?._profession === '3' && <Blacksmith />}
        </div>
      </div>
    </>
  )
}

export default Professions
