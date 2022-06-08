import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import {
  changePictureProfile,
  crateProfile,
  checkNameTaken,
} from 'utils/profileContract'
import useTransactionState from 'hooks/useTransactionState'

const imagesIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export default function CreateProfile({
  isOpenCreateProfile,
  setIsOpenCreateProfile,
  isEdit = false,
  profile = null,
  getDataProfile,
  handleOpenTutorial,
}) {
  const [heroSelector, setHeroSelector] = useState(profile?._picId || 1)
  const [nameValue, setNameValue] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleTxStateChange = useTransactionState()

  const handleCloseModalCreateProfile = useCallback(
    (e: any) => {
      if (e.target !== e.currentTarget) return
      setIsOpenCreateProfile(false)
    },
    [isOpenCreateProfile]
  )

  const onTransactionComplete = (data) => {
    let title
    if (isEdit && profile._picId != heroSelector) {
      title = "Update profile"
    } else {
      title = "Create profile"
    }
    const status = data.status ? 1 : 0;
    handleTxStateChange(title, data.transactionHash, status)
  }

  const onTransactionExecute = (txHash) => {
    let title
    if (isEdit && profile._picId != heroSelector) {
      title = "Update profile"
    } else {
      title = "Create profile"
    }
    handleTxStateChange(title, txHash, 2)
  }

  const handleCreateProfile = useCallback(async () => {
    let title
    setIsLoading(true)
    if (isEdit && profile._picId != heroSelector) {
      if (heroSelector) {
        title = "Update profile"
        const isChangePictureProfile = await changePictureProfile(
          Number(profile._id),
          heroSelector,
          onTransactionExecute,
          onTransactionComplete
        )
        if (isChangePictureProfile) {
          router.push('/')
          getDataProfile()
          setIsOpenCreateProfile(false)
          setIsLoading(false)
        } else {
          handleTxStateChange(title, '', 3)
          setIsOpenCreateProfile(false)
          setIsLoading(false)
        }
      }
    } else {
      if (heroSelector && nameValue && isNameValid) {
        title = "Create profile"
        const isNameTaken = await checkNameTaken(nameValue)
        if (nameValue.length <= 3 || nameValue.length >= 16) {
          setIsNameValid(false)
        } else if (isNameTaken) {
          setIsNameValid(false)
        } else {
          const isCreateProfile = await crateProfile(
            nameValue,
            heroSelector,
            onTransactionExecute,
            onTransactionComplete
          )

          if (isCreateProfile) {
            router.push('/')
            getDataProfile()
            setIsOpenCreateProfile(false)
            setIsLoading(false)
            handleOpenTutorial(true)
          } else {
            handleTxStateChange(title, '', 3)
            setIsOpenCreateProfile(false)
            setIsLoading(false)
          }
        }
      }
    }
  }, [isEdit, heroSelector, nameValue, isNameValid, ])

  return (
    <CreateProfileCSS>
      <div className="modal-create-profile">
        <div className="modal-content">
          {isLoading ? (
            <div className="loading">
              <div className="loading-content">Loading ...</div>
            </div>
          ) : (
            <div
              className="body"
              onClick={(e) => {
                handleCloseModalCreateProfile(e)
              }}
            >
              <div className="body-top">
                <div className="container-items">
                  {imagesIndex.map((value) => (
                    <button
                      className={`${
                        value === heroSelector && 'select'
                      } click-cursor`}
                      onClick={() => {
                        setHeroSelector(value)
                      }}
                      key={value}
                    >
                      <img
                        src={`/images/profile/hero/${value}.webp`}
                        alt="img"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="body-bottom">
                <div className="avatar-selected">
                  <img
                    src={`/images/profile/hero/${heroSelector || 1}.webp`}
                    alt="img"
                  />
                </div>
                {!isEdit && (
                  <input
                    onChange={(e) => {
                      setNameValue(e.target.value)
                    }}
                    onClick={(e) => {
                      setIsNameValid(true)
                    }}
                    value={nameValue}
                    className="input-name"
                    type="text"
                    placeholder="Enter Name Here"
                  />
                )}
                {!isNameValid && (
                  <div
                    css={{
                      width: '100%',
                      textAlign: 'center',
                      color: 'white',
                      marginTop: '20px',
                      fontSize: '25px',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px #FF0000',
                    }}
                  >
                    {nameValue.length <= 3 || nameValue.length >= 16
                      ? 'Name must be between 4 and 15'
                      : 'User name has been used. Try other name'}
                  </div>
                )}
                <div className="complete-profile">
                  <button
                    onClick={() => {
                      handleCreateProfile()
                    }}
                    className={`${
                      ((heroSelector && nameValue) ||
                        (isEdit && profile._picId != heroSelector)) &&
                      'valid'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CreateProfileCSS>
  )
}

const CreateProfileCSS = styled.div({
  '.modal-create-profile': {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
    padding: '0 15px',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      // display: 'none',
    },
    '.modal-content': {
      '.loading': {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '40px',
      },
      '.body': {
        display: 'flex',
        '@media(max-width: 1395px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
        paddingBottom: '100px',
        justifyContent: 'center',
        '.body-top': {
          flex: 1,
          maxWidth: '900px',
          backgroundImage: 'url(./images/profile/frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '100px',
          padding: '100px 40px',
          '@media(max-width: 720px)': {
            padding: '40px 20px',
          },
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-50px',
            left: 0,
            width: '100%',
            height: '15px',
            backgroundImage:
              'url(./images/profile/top-frame-profile-image.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          },
          '::after': {
            content: '""',
            position: 'absolute',
            top: '-68px',
            left: 0,
            right: 0,
            margin: 'auto',
            width: '300px',
            height: '135px',
            backgroundImage:
              'url(./images/profile/title-frame-profile-image.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          },
          '.container-items': {
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            button: {
              width: '100px',
              height: '100px',
              margin: '8px',
              backgroundImage: 'url(./images/profile/frame-avatar.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              img: {
                width: '100%',
                height: '100%',
                padding: '2px',
                borderRadius: '12px',
              },
            },
            'button.select': {
              outline: '4px solid yellow',
              borderRadius: '12px',
            },
          },
        },
        '.body-bottom': {
          flex: 1,
          maxWidth: '495px',
          backgroundImage: 'url(./images/profile/frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '100px',
          padding: '80px 20px',
          '@media(min-width: 1396px)': {
            marginLeft: '50px',
          },
          '@media(max-width: 1395px)': {
            maxWidth: '900px',
          },
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-50px',
            left: '0',
            width: '100%',
            height: '15px',
            backgroundImage:
              'url(./images/profile/top-frame-profile-detail.png)',
            '@media(max-width: 1395px)': {
              backgroundImage: 'url(./images/profile/top-frame-1.png)',
            },
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          },
          '::after': {
            content: '""',
            position: 'absolute',
            top: '-68px',
            left: 0,
            right: 0,
            margin: 'auto',
            width: '300px',
            height: '135px',
            backgroundImage:
              'url(./images/profile/title-frame-profile-detail.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          },
          '.avatar-selected': {
            background: 'url(./images/profile/frame-avatar.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '150px',
            img: {
              width: '150px',
              height: '150px',
              borderRadius: '18px',
              padding: '4px',
              display: 'block',
              margin: 'auto',
            },
          },
          '.input-name': {
            color: 'rgb(44, 47, 54)',
            fontWeight: '500',
            outline: 'none',
            border: '0px',
            backgroundColor: '#E2B990',
            fontSize: '20px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '0px 30px',
            height: '58px',
            width: '100%',
            appearance: 'textfield',
            borderRadius: '5px',
            '::placeholder': {
              color: '#CB906C',
            },
            marginTop: '100px',
          },
          '.complete-profile': {
            width: '100%',
            textAlign: 'center',
            button: {
              background: 'url(./images/profile/btn-complete-invalid.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '300px',
              height: '160px',
              cursor:
                'url(/images/worldmap/SelectCursor.webp), auto !important',
            },
            'button.valid': {
              background: 'url(./images/profile/btn-complete.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            },
          },
        },
      },
    },
  },
})
