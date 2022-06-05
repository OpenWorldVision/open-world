import style from '../../components/professions/professions.module.css'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import LoadingModal from '@components/LoadingModal'

const ProfessionsSelection = dynamic(
  () => import('@components/professions/ProfessionsSelection'),
  { loading: () => <LoadingModal fullBlack /> }
)
const Openian = dynamic(
  () => import('@components/professions/openian/Openian'),
  { loading: () => <LoadingModal fullBlack /> }
)
const Blacksmith = dynamic(
  () => import('@components/professions/blacksmith/Blacksmith'),
  { loading: () => <LoadingModal fullBlack /> }
)

const Supplier = dynamic(() => import('./supplier'), {
  loading: () => <LoadingModal fullBlack />,
})

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
