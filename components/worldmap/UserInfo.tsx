import { useCallback } from 'react'
import styled from '@emotion/styled'
import { Spinner } from '@chakra-ui/react'

export default function Menu({
  setIsOpenUserInfo,
  isOpenUserInfo,
  setIsOpenCreateProfile,
  profile,
  balance,
}) {
  const handleCloseModalUserInfo = useCallback(
    (e: any) => {
      if (e.target !== e.currentTarget) return
      setIsOpenUserInfo(false)
    },
    [setIsOpenUserInfo]
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(profile?._owner)
  }
  if (!isOpenUserInfo) {
    return null
  }
  return (
    <UserInfoCSS>
      <div onClick={handleCloseModalUserInfo} className="modal-user-info">
        <div className="modal-content-user-info">
          <div className="modal-content-user-info-header">
            <button
              className="click-cursor"
              onClick={() => {
                setIsOpenUserInfo(false)
              }}
            >
              <img src="./images/icons/close.png" alt="img" />
            </button>
            <div>
              Your Open & Hero Breakdown
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
              </svg>
            </div>
          </div>
          <div className="modal-content-user-info-body">
            <div>
              <button
                className="click-cursor"
                css={{
                  marginBottom: '10px',
                }}
                onClick={(e) => {
                  setIsOpenCreateProfile(true)
                  setIsOpenUserInfo(false)
                }}
              >
                EDIT PROFILE
              </button>
            </div>
            <div>
              <img src="/favicon.ico" alt="img" />
              {!balance && (
                <Spinner
                  sx={{ marginTop: '30px' }}
                  thickness="7px"
                  speed="0.65s"
                  emptyColor="#745FFB"
                  color="#E14C90"
                  size="xl"
                />
              )}
              {balance && (
                <span
                  style={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                >
                  {balance}
                </span>
              )}
            </div>

            <div>
              <div>Account Details</div>
              <button
                onClick={handleCopy}
                className="click-cursor"
              >{`${profile?._owner.slice(0, 6)} ... ${profile?._owner.slice(
                -4
              )}`}</button>
            </div>
          </div>
        </div>
      </div>
    </UserInfoCSS>
  )
}

const UserInfoCSS = styled.div({
  '.modal-user-info': {
    position: 'fixed',
    zIndex: 15,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: 'white',
    overflowX: 'hidden',
    overflowY: 'hidden',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '.modal-content-user-info': {
      backgroundImage: 'url(/images/profile/frame.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundColor: 'rgb(0,0,0,.6)',
      display: 'flex',
      flexDirection: 'column',
      // height: '90%',
      padding: '8px',
      maxWidth: '430px',
      '.modal-content-user-info-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 80px',
        position: 'relative',
        borderBottom: '1px solid rgb(63,63,63)',
        '> button': {
          position: 'absolute',
          top: '20px',
          right: '15px',
          width: 'fit-content',
          height: 'fit-content',
          img: {
            width: '25px',
            height: '25px',
          },
        },
        div: {
          position: 'relative',
          svg: {
            width: '25px',
            height: '25px',
            position: 'absolute',
            top: '0',
            left: '-50px',
            fill: 'white',
          },
        },
      },
      '.modal-content-user-info-body': {
        height: '100%',
        '@media(max-width: 720px)': {
          height: '100%',
        },
        overflowY: 'auto',
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'rgb(16,15,33)',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgb(40,39,56)',
          borderRadius: '5px',
        },
        '> div:first-child': {
          padding: '20px',
          button: {
            backgroundImage: 'url(./images/profile/frame.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            border: '1px solid #fbeb74',
            borderRadius: '5px',
            width: '100%',
            height: '40px',
            fontSize: '14px',
            ':hover': {
              backgroundColor: 'rgb(251, 235, 116)',
              color: 'black',
            },
          },
        },
        '> div:nth-child(2)': {
          textAlign: 'center',
          fontSize: '50px',
          fontWeight: '600',
          img: {
            margin: 'auto',
            width: '60px',
            height: '60px',
            fontSize: '14px',
          },
        },
        '> div:nth-child(3), > div:nth-child(4), > div:nth-child(5), > div:nth-child(6)':
          {
            padding: '8px 20px',
            borderBottom: '1px solid rgb(55,55,55)',
            '> div': {
              display: 'flex',
              justifyContent: 'space-between',
              margin: '10px 0',
            },
          },
        '> div:nth-child(7)': {
          padding: '8px 20px',
          paddingBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          div: {
            margin: '10px 0',
          },
          button: {
            width: '100%',
            backgroundImage: 'url(./images/profile/frame.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            border: '1px solid #fbeb74',
            height: '50px',
            borderRadius: '10px',
            marginTop: '20px',
            ':hover': {
              backgroundColor: 'rgb(251, 235, 116)',
              color: 'black',
            },
          },
        },
        button: {
          backgroundImage: 'url(./images/profile/frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          border: '1px solid #fbeb74',
          borderRadius: '5px',
          width: '100%',
          height: '40px',
          fontSize: '18px',
          ':hover': {
            backgroundColor: 'rgb(251, 235, 116)',
            color: 'black',
          },
        },
      },
    },
  },
})
