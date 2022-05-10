import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { profilesContract } from 'utils/profileContract'
import { getWeb3Client } from '@lib/web3'

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
      const web3Client = await getWeb3Client()
      const accounts = await web3Client?.web3Client.eth.getAccounts()
      const contract = await profilesContract(web3Client.web3Client)
      try {
        await contract.methods
          .createProfile(nameValue, heroSelector)
          .send({ from: accounts[0] })
        window.location.href = '/'
      } catch {
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
              <div className="body-top-header">
                <div>Select Profile Image</div>
              </div>
              <div className="body-top-main">
                {imagesIndex.map((value) => (
                  <div
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
                  </div>
                ))}
              </div>
            </div>
            <div className="body-bottom">
              <button
                onClick={() => {
                  setIsOpenCreateProfile(false)
                }}
                className="close-btn"
              >
                <img src="./images/profile/close.png" alt="img" />
              </button>
              <div className="body-top-header">
                <div>Profile Details</div>
              </div>
              <div className="body-top-main">
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
                <button
                  onClick={() => {
                    handleCreateProfile()
                  }}
                  className={`complete-profile ${heroSelector && nameValue && 'invalid'
                    }`}
                >
                  Complete Profile
                </button>
                <button className="doc">READ THE DFK TUTORIAL</button>
              </div>
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
      display: 'flex',
      flexDirection: 'column',
      height: '90%',
      padding: '8px',
      width: '910px',
      '.body': {
        paddingBottom: '50px',
        '.body-top': {
          height: '610px',
          position: 'relative',
          backgroundColor: '#ffe3bd',
          backgroundImage:
            'url(./images/profile/left-boder-1.png),url(./images/profile/right-boder-1.png),url(./images/profile/top-boder-1.png),url(./images/profile/bottom-boder-1.png)',
          backgroundPosition: '0 0,100% 0,0 0,0 100%',
          backgroundRepeat: 'repeat-y,repeat-y,repeat-x,repeat-x',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px 60px 80px 60px',
          marginBottom: '50px',
          '::before': {
            content: '""',
            position: 'absolute',
            height: '100%',
            top: 0,
            left: 0,
            width: '100%',
            backgroundImage:
              'url(./images/profile/corner-top-left.png),url(./images/profile/corner-top-right.png),url(./images/profile/corner-bottom-left.png),url(./images/profile/corner-bottom-right.png)',
            backgroundPosition: '0 0,100% 0,0 100%,100% 100%',
            backgroundRepeat: 'no-repeat',
          },
          '.body-top-header': {
            background: 'url(./images/profile/header-body-1.png) repeat-x',
            height: '80px',
            display: 'flex',
            position: 'relative',
            padding: '0px 20px',
            color: 'rgb(73, 19, 6)',
            fontWeight: 'bold',
            fontSize: '30px',
            alignItems: 'center',
            '::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: '0px',
              left: '-30px',
              width: 'calc(100% + 60px)',
              height: '100%',
              background:
                'url(./images/profile/header-left-1.png) left top no-repeat, url(./images/profile/header-right-1.png) right top',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top, right top',
            },
          },
          '.body-top-main': {
            position: 'relative',
            display: 'flex',
            flexFlow: 'row wrap',
            overflowY: 'auto',
            height: 'calc(100% - 20px)',
            placeContent: 'flex-start center',
            textAlign: 'center',
            '::-webkit-scrollbar': {
              width: '8px',
            },
            '::-webkit-scrollbar-track ': {
              background: '#DAAD82',
              borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#744E45',
              borderRadius: '10px',
            },
            div: {
              background: 'url(./images/profile/hero/frame-none-select.png)',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              width: '100px',
              height: '100px',
              margin: '4px',
              img: {
                width: '82%',
                marginTop: '11px',
                marginLeft: '9px',
              },
              ':hover': {
                background: 'url(./images/profile/hero/frame-hover.png)',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
              },
            },
            '.select': {
              background: 'url(./images/profile/hero/frame-select.png)',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
            },
            marginTop: '20px',
          },
        },
        '.body-bottom': {
          '.close-btn': {
            position: 'absolute',
            top: '16px',
            right: '22px',
            width: '52px',
            height: '52px',
            overflow: 'hidden',
            padding: 0,
            lineHeight: 0,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            border: '2px solid transparent',
            outline: 'none',
            img: {
              position: 'absolute',
              top: 0,
              left: 0,
            },
            ':hover': {
              img: {
                position: 'absolute',
                top: 'auto',
                bottom: 0,
              },
            },
          },
          height: '550px',
          position: 'relative',
          backgroundColor: '#ffe3bd',
          backgroundImage:
            'url(./images/profile/left-boder-1.png),url(./images/profile/right-boder-1.png),url(./images/profile/top-boder-1.png),url(./images/profile/bottom-boder-1.png)',
          backgroundPosition: '0 0,100% 0,0 0,0 100%',
          backgroundRepeat: 'repeat-y,repeat-y,repeat-x,repeat-x',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px 60px 80px 60px',
          '::before': {
            content: '""',
            position: 'absolute',
            height: '100%',
            top: 0,
            left: 0,
            width: '100%',
            backgroundImage:
              'url(./images/profile/corner-top-left-body-2.png),url(./images/profile/corner-top-right-body-2.png),url(./images/profile/corner-bottom-left.png),url(./images/profile/corner-bottom-right.png)',
            backgroundPosition: '0 0,100% 0,0 100%,100% 100%',
            backgroundRepeat: 'no-repeat',
          },
          '.body-top-header': {
            background: 'url(./images/profile/header-body-1.png) repeat-x',
            height: '70px',
            display: 'flex',
            position: 'relative',
            padding: '0px 20px',
            color: 'rgb(73, 19, 6)',
            fontWeight: 'bold',
            fontSize: '30px',
            alignItems: 'center',
            '::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: '0px',
              left: '-30px',
              width: 'calc(100% + 60px)',
              height: '100%',
              background:
                'url(./images/profile/header-left-1.png) left top no-repeat, url(./images/profile/header-right-1.png) right top',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top, right top',
            },
          },
          '.body-top-main': {
            marginTop: '20px',
            width: '320px',
            textAlign: 'center',
            '.avatar-selected': {
              background: 'url(./images/profile/hero/frame-select.png)',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              width: '100px',
              height: '100px',
              margin: 'auto',
              img: {
                width: '82%',
                paddingTop: '11px',
                marginLeft: '9px',
              },
            },
            '.input-name': {
              color: 'rgb(44, 47, 54)',
              position: 'relative',
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
              marginTop: '20px',
            },
            '.complete-profile': {
              background: 'url(./images/profile/main-body.png)',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'top',
              height: '68px',
              padding: '0 40px',
              transition: 'none',
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '24px',
              color: '#f9f3ea',
              letterSpacing: '1.1666666667px',
              whiteSpace: 'nowrap',
              width: '100%',
              position: 'relative',
              marginTop: '20px',
              '::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                width: 'calc(100% + 40px)',
                top: 0,
                left: '-20px',
                backgroundImage:
                  'url(./images/profile/main-left.png),url(./images/profile/main-right.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0,100% 0',
                height: '68px',
              },
            },
            '.complete-profile.invalid': {
              background: 'url(./images/profile/main-body-invalid.png)',
              '::before': {
                backgroundImage:
                  'url(./images/profile/main-left-invalid.png),url(./images/profile/main-right-invalid.png)',
              },
            },
            '.doc': {
              position: 'relative',
              border: '1px solid #daad82',
              color: '#744e45',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              padding: '5px 20px',
              fontSize: '12px',
              letterSpacing: '1.2px',
              opacity: 1,
              width: '80%',
              margin: 'auto',
              marginTop: '20px',
              textAlign: 'center',
              textTransform: 'none',
              ':hover': {
                backgroundColor: '#efcba2',
              },
            },
          },
        },
      },
    },
  },
})
