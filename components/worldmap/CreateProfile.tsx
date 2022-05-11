import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { crateProfile } from 'utils/profileContract'

const imagesIndex = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
]

export default function CreateProfile({
  isOpenCreateProfile,
  setIsOpenCreateProfile,
}) {
  const [heroSelector, setHeroSelector] = useState(null)
  const [nameValue, setNameValue] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)

  const handleCloseModalCreateProfile = useCallback(
    (e: any) => {
      if (e.target !== e.currentTarget) return
      setIsOpenCreateProfile(false)
    },
    [isOpenCreateProfile]
  )

  const handleCreateProfile = async () => {
    if (heroSelector && nameValue && heroSelector) {
      const isCreateProfile = await crateProfile(nameValue, heroSelector)
      if (!isCreateProfile){
        setIsNameValid(false)
      }
    }
  }

  return (
    <CreateProfileCSS>
      <div
        onClick={(e) => {
          handleCloseModalCreateProfile(e)
        }}
        className="modal-create-profile"
      >
        <div className="modal-content">
          <div className="body">
            <div className="body-top">
              {imagesIndex.map((value) => (
                <button
                  className={value === heroSelector && 'select'}
                  onClick={() => {
                    setHeroSelector(value)
                  }}
                  key={value}
                >
                  <img
                    src={`./images/profile/hero/hero-${value}.png`}
                    alt="img"
                  />
                </button>
              ))}
            </div>
            <div className="body-bottom">
              <div className="avatar-selected">
                <img
                  src={`./images/profile/hero/hero-${heroSelector || 1}.png`}
                  alt="img"
                />
              </div>
              <input
                onChange={(e) => {
                  setNameValue(e.target.value)
                }}
                value={nameValue}
                className="input-name"
                type="text"
                placeholder="Enter Name Here"
              />

              {!isNameValid && (
                <div
                  css={{
                    color: 'red',
                    marginTop: '5px',
                  }}
                >
                  Name invalid
                </div>
              )}
              {console.log(heroSelector && nameValue && 'invalid')}
              <button
                onClick={() => {
                  handleCreateProfile()
                }}
                className={`complete-profile ${heroSelector && nameValue && 'valid'}`}
              />
              <button className="doc"></button>
            </div>
          </div>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    '.modal-content': {
      '.body': {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
        paddingTop: '500px',
        '.body-top': {
          width: '900px',
          height: '730px',
          backgroundImage: 'url(./images/profile/frame1.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          position: 'relative',
          padding: '100px 80px',
          display: 'flex',
          flexWrap: 'wrap',
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-50px',
            left: '5px',
            width: '875px',
            height: '15px',
            backgroundImage: 'url(./images/profile/top-frame-1.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          },
          button: {
            width: '100px',
            height: '100px',
            margin: '8px',
            backgroundImage: 'url(./images/profile/frame-avatar.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            ':hover': {
              cursor: 'pointer'
            },
            img: {
              width: '100%',
              height: '100%',
              padding: '2px',
              borderRadius: '12px'
            }
          }
        },
        '.body-bottom': {
          width: '495px',
          height: '730px',
          backgroundImage: 'url(./images/profile/frame2.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-50px',
            left: '12px',
            width: '470px',
            height: '15px',
            backgroundImage: 'url(./images/profile/top-frame-2.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          },
          '.avatar-selected': {
            background: 'url(./images/profile/frame-avatar.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '150px',
            height: '150px',
            img: {
              width: '100%',
              height: '100%',
              borderRadius: '18px',
              padding: '4px'
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
            width: '80%',
            appearance: 'textfield',
            borderRadius: '5px',
            '::placeholder': {
              color: '#CB906C',
            },
            marginTop: '100px',
          },
          '.complete-profile': {
            background: 'url(./images/profile/btn-complete-invalid.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '160px',
            marginTop: '50px'
          },
          '.complete-profile.valid': {
            background: 'url(./images/profile/btn-complete.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          },
          '.doc': {
            background: 'url(./images/profile/doc-tutorial.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '200px',
            height: '16px',
          }
        }
      }
    },
  },
})
