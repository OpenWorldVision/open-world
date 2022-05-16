import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import UserInfo from '@components/worldmap/UserInfo'
import CreateProfile from '@components/worldmap/CreateProfile'
import { isProfessionExist, getProfile } from 'utils/profileContract'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from 'reduxActions/profileAction'
import ProfessionsTutorial from '@components/professions/ProfessionsTutorial'

export default function User() {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false)
  const [isOpenCreateProfile, setIsOpenCreateProfile] = useState(false)
  const [isOpenTutorial, setIsOpenTutorial] = useState(false)
  const profile = useSelector((state: any) => { return state.ProfileStore.profile })
  const dispatch = useDispatch()


  const getContractProfile = async () => {
    const _profile = await getProfile()

    dispatch(setProfile({ profile: _profile }))
  }

  const checkProfessionExist = async () => {
    setIsOpenTutorial(await isProfessionExist())
  }

  useEffect(() => {
    getContractProfile()
    checkProfessionExist()
  }, [])

  return (
    <UserCSS>
      <div className="user-avatar">
        <button
          css={{
            left: '55px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '@media(max-width: 720px)': {
              left: 0,
            },
          }}
          onClick={() => {
            setIsOpenAvatar((isOpenAvatarPrev) => !isOpenAvatarPrev)
          }}
        >
          <img src="/images/worldmap/Frame.png" alt="img" />
          <img
            src={`./images/profile/hero/hero-${profile?._picId || 'none'}.png`}
            alt="img"
          />
        </button>
        {isOpenAvatar && (
          <div className="user-info">
            <div>{profile?._name}</div>
            <ul>
              <li>0.00 OPEN</li>
              {/* Career : Openian or Supplier or BlackSmith */}
              <li>Career: Openian</li>
              <li>Inventory</li>
            </ul>
            <ul>
              <li>
                <div>Stamina Point:</div>
                <div>100/100</div>
              </li>
              <li>
                <div>Health Point:</div>
                <div>100/100</div>
              </li>
            </ul>
            <button
              css={{
                width: '100%',
                backgroundColor: '#009C44',
                borderRadius: '5px',
                height: '40px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '6px',
                ':hover': {
                  backgroundColor: '#fbeb74',
                  color: 'black',
                },
              }}
              onClick={() => {
                setIsOpenUserInfo(true)
              }}
            >
              Profile
            </button>
          </div>
        )}
        {isOpenUserInfo && (
          <UserInfo
            setIsOpenUserInfo={setIsOpenUserInfo}
            isOpenUserInfo={isOpenUserInfo}
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            profile={profile}
          />
        )}
        {isOpenCreateProfile && (
          <CreateProfile
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            isOpenCreateProfile={isOpenCreateProfile}
          />
        )}
        {profile !== false && !isOpenCreateProfile && isOpenTutorial &&
          <ProfessionsTutorial
            setIsOpenTutorial={setIsOpenTutorial}
            isOpenTutorial={isOpenTutorial}
          />
        }
      </div>
    </UserCSS>
  )
}

const UserCSS = styled.div({
  '.user-avatar': {
    position: 'fixed',
    top: '30px',
    left: '30px',
    zIndex: '2000',
    '@media(max-width: 720px)': {
      top: '10px',
      left: '10px',
    },
    '> button': {
      width: '90px',
      height: '90px',
      position: 'relative',
      'img:first-child': {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
      },
      'img:nth-child(2)': {
        position: 'absolute',
        width: '80%',
        top: '14px',
        left: '8px',
        color: 'rgb(247,183,95)',
        fontSize: '15px',
        zIndex: 1,
        borderRadius: '50%',
      },
    },
    '.user-info': {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '200px',
      backgroundImage:
        'linear-gradient(to right, rgb(1,1,1), rgba(1,1,1, 0.6))',
      fontSize: '14px',
      color: 'white',
      padding: '35px 20px 10px 20px',
      zIndex: '-1',
      '> div': {
        fontSize: '20px',
        textAlign: 'center',
        '@media(max-width: 720px)': {
          fontSize: '14px',
        },
      },
      ul: {
        padding: '14px 0',
        '@media(max-width: 720px)': {
          padding: '2px',
        },
        li: {
          listStyle: 'none',
          'div:last-child': {
            fontSize: '20px',
          },
        },
        ':last-child': {
          borderTop: '2px solid rgba(255, 255, 255, 0.3)',
          '@media(max-width: 720px)': {
            fontSize: '14px',
          },
        },
      },
    },
  },
})
