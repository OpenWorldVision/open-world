import { useState, useEffect, useCallback } from 'react'
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
  const [career, setCaeer] = useState('None')
  const profile = useSelector((state: any) => { return state.ProfileStore.profile })
  const dispatch = useDispatch()

  const getDataProfile = useCallback(async () => {
    const _profile = await getProfile()
    dispatch(setProfile({ profile: _profile }))

    switch (_profile?._profession) {
      case '1':
        setCaeer('Openian')
        break
      case '2':
        setCaeer('Supplier')
        break
      case '3':
        setCaeer('Blacksmith')
        break
      default:
        setCaeer('None')
        break
    }
  }, [])

  useEffect(() => {
    getDataProfile()
  }, [])

  const handleOpenTutorial = useCallback(() => {
    setIsOpenTutorial(true)
  }, [])

  return (
    <UserCSS>
      <div className="user-avatar">
        <button
          className="click-cursor"
          css={
            isOpenAvatar && {
              margin: 'auto',
            }
          }
          onClick={() => {
            setIsOpenAvatar((isOpenAvatarPrev) => !isOpenAvatarPrev)
          }}
        >
          <img
            src={`/images/profile/hero/${
              profile?._picId && profile?._picId < 14 ? profile?._picId : 'none'
            }.webp`}
            alt="img"
          />
        </button>
        {isOpenAvatar && (
          <div className="user-info">
            <div>{profile?._name}</div>
            <ul>
              <li
                css={{
                  display: 'flex',
                }}
              >
                <div style={{ width: '30px' }}>
                  <img src="./favicon.ico" alt="img" width={25} height={25} />
                </div>
                0.00 OPEN
              </li>
              {/* Career : Openian or Supplier or BlackSmith */}
              <li>
                Career: {career}
              </li>
              <li css={{
                display: 'flex',
                marginTop: '10px'
              }}>
                <div style={{ width: '30px' }}>
                  <img
                    src="./images/icons/inventory.png"
                    alt="img"
                    width={25}
                    height={25}
                  />
                </div>
                Inventory
              </li>
            </ul>
            <ul>
              <li>
                <div
                  css={{
                    display: 'flex',
                  }}
                >
                  <div style={{ width: '30px' }}>
                    <img
                      src="./images/icons/stamina-point.png"
                      alt="img"
                      width={15}
                      height={15}
                    />
                  </div>
                  Stamina Point:
                </div>
                <div>100/100</div>
              </li>
              <li
                css={{
                  marginTop: '10px',
                }}
              >
                <div
                  css={{
                    display: 'flex',
                  }}
                >
                  <div style={{ width: '30px' }}>
                    <img
                      src="./images/icons/health-point.png"
                      alt="img"
                      width={25}
                      height={25}
                    />
                  </div>
                  Health Point:
                </div>
                <div>100/100</div>
              </li>
            </ul>
            <button
              style={{
                cursor:
                  'url(/images/worldmap/click-cursor.png), auto !important',
              }}
              onClick={() => {
                setIsOpenUserInfo(true)
              }}
              className="btn-profile click-cursor"
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
        {profile === false && (
          <CreateProfile
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            isOpenCreateProfile={isOpenCreateProfile}
            getDataProfile={getDataProfile}
            handleOpenTutorial={handleOpenTutorial}
          />
        )}
        {isOpenCreateProfile && (
          <CreateProfile
            profile={profile}
            isEdit={true}
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            isOpenCreateProfile={isOpenCreateProfile}
            getDataProfile={getDataProfile}
            handleOpenTutorial={handleOpenTutorial}
          />
        )}
        {isOpenTutorial && (
          <ProfessionsTutorial
            setIsOpenTutorial={setIsOpenTutorial}
            isOpenTutorial={isOpenTutorial}
          />
        )}
      </div>
    </UserCSS>
  )
}

const UserCSS = styled.div({
  '.user-avatar': {
    position: 'fixed',
    top: '30px',
    left: '50px',
    zIndex: '2000',
    width: '200px',
    '@media(max-width: 720px)': {
      top: '10px',
      left: '10px',
    },
    '> button': {
      width: '100px',
      height: '110px',
      display: 'block',
      backgroundImage: 'url(/images/worldmap/Frame.webp)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      padding: '10px',
      img: {
        width: '76px',
        height: '76px',
        borderRadius: '50%',
      },
    },
    '.user-info': {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '200px',
      backgroundImage: 'url(./images/profile/frame.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundColor: 'rgb(0,0,0,.6)',
      fontSize: '14px',
      color: 'white',
      padding: '35px 20px 10px 20px',
      zIndex: '-1',
      '> div': {
        fontSize: '20px',
        textAlign: 'center',
        backgroundImage: 'url(./images/profile/frame.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        marginTop: '10px',
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
      '.btn-profile': {
        width: '100%',
        backgroundImage: 'url(./images/profile/frame.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        border: '1px solid #fbeb74',
        height: '40px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '6px',
        ':hover': {
          backgroundColor: '#fbeb74',
          color: 'black',
        },
      },
    },
  },
})
