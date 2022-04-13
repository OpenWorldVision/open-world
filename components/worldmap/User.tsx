import { useState } from 'react'
import styled from '@emotion/styled'
import UserInfo from '@components/worldmap/UserInfo'

export default function User() {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false)

  return (
    <UserCSS>
      <div className="user-avatar">
        <button
          css={
            isOpenAvatar && {
              left: '55px',
              '@media(max-width: 720px)': {
                left: 0,
              },
            }
          }
        >
          <img src="/images/worldmap/Frame.png" alt="img" />
          <img
            onClick={() => {
              setIsOpenUserInfo(true)
            }}
            src="/images/worldmap/Avatar.png"
            alt="img"
          />
          <button
            onClick={() => {
              setIsOpenAvatar((isOpenAvatarPrev) => !isOpenAvatarPrev)
            }}
          >
            {isOpenAvatar ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                </svg>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                </svg>
              </>
            )}
          </button>
        </button>
        {isOpenAvatar && (
          <div className="user-info">
            <div>Ngo Thanh Nam</div>
            <ul>
              <li>0.00 JEWEL</li>
              <li>0 Gold</li>
              <li>Inventory</li>
            </ul>
            <ul>
              <li>
                <div>Locked Balance:</div>
                <div>0.00</div>
              </li>
              <li>
                <div>Total Balance:</div>
                <div>0.00</div>
              </li>
            </ul>
          </div>
        )}
        {isOpenUserInfo && (
          <UserInfo
            setIsOpenUserInfo={setIsOpenUserInfo}
            isOpenUserInfo={isOpenUserInfo}
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
    left: '30px',
    '> button': {
      width: '90px',
      height: '90px',
      position: 'relative',
      'img:first-child': {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        'min-width': '106%',
        'min-height': '106%',
      },
      'img:nth-child(2)': {
        position: 'absolute',
        width: '88%',
        top: '8px',
        left: '6px',
        color: 'rgb(247,183,95)',
        fontSize: '15px',
      },
      button: {
        position: 'absolute',
        top: '97px',
        left: '20px',
        width: '52px',
        height: '15px',
        backgroundColor: 'rgba(78,70,38,0.8)',
        borderRadius: '0 0 5px 5px',
        border: '1px solid rgb(189,152,72)',
        borderTop: 'none',
        '@media(max-width: 720px)': {
          top: '20px',
          left: '93px',
          width: '15px',
          height: '52px',
          borderRadius: '0 5px 5px 0',
          border: '1px solid rgb(189,152,72)',
          borderLeft: 'none',
        },
        svg: {
          width: '10px',
          height: '10px',
          fill: 'rgb(189,152,72)',
          margin: 'auto',
          ':first-child': {
            '@media(max-width: 720px)': {
              display: 'none',
            },
          },
          ':last-child': {
            display: 'none',
            '@media(max-width: 720px)': {
              display: 'block',
            },
          },
        },
        ':hover': {
          backgroundColor: 'rgb(78,70,38)',
        },
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
      padding: '60px 20px 10px 20px',
      zIndex: '-1',
      '@media(max-width: 720px)': {
        width: '150px',
        padding: '4px 5px 4px 25px',
        top: 0,
        left: '93px',
        backgroundImage:
          'linear-gradient(to right, rgba(1,1,1, 0.7), rgba(1,1,1, 0.7))',
        fontSize: '12px',
      },
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
            display: 'none',
          },
        },
      },
    },
  },
})
