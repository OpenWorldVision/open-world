import Link from 'next/link'
import { useState } from 'react'
import styled from '@emotion/styled'

export default function Menu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <MenuCSS>
      <div className="menu">
        <button
          onClick={() => {
            setIsOpenMenu(!isOpenMenu)
          }}
        >
          <img src="/images/worldmap/Menu.png" alt="img" />
        </button>
        {isOpenMenu && (
          <ul>
            <li>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z" />
                </svg>
              </div>
              <Link href="/">Map</Link>
            </li>
            <li>
              <Link href="/battleArena">
                <a>Battle Arena</a>
              </Link>
            </li>
            <li>
              <Link href="/castle">
                <a>Castle</a>
              </Link>
            </li>
            <li>
              <Link href="/foodCourt">
                <a>Food Court</a>
              </Link>
            </li>
            <li>
              <Link href="/market">
                <a>Marketplace</a>
              </Link>
            </li>
            <li>
              <Link href="/professions">
                <a>Professions</a>
              </Link>
            </li>
            <li>
              <Link href="/workshop">
                <a>Workshop</a>
              </Link>
            </li>
            <li>
              <a
                href="https://openworld.vision/"
                target="_blank"
                rel="noreferrer"
              >
                OPEN
              </a>
            </li>
            <li>
              <Link href="/about">
                <a>About +</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </MenuCSS>
  )
}

const MenuCSS = styled.div({
  '.menu': {
    position: 'fixed',
    top: '30px',
    right: '30px',
    zIndex: '2000',
    '@media(max-width: 720px)': {
      right: '10px',
    },
    button: {
      width: '70px',
      height: '70px',
      '@media(max-width: 720px)': {
        width: '60px',
        height: '60px',
      },
      img: {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        'min-width': '100%',
        'min-height': '100%',
      },
      div: {
        position: 'absolute',
        width: '100%',
        top: '64px',
        color: 'rgb(247,183,95)',
        fontSize: '15px',
        '@media(max-width: 720px)': {
          fontSize: '12px',
          top: '34px',
        },
      },
    },
    ul: {
      position: 'absolute',
      top: '72px',
      right: 0,
      width: '160px',
      listStyle: 'none',
      backgroundImage:
        'linear-gradient(to right, rgba(1,1,1, 0.6) , rgb(1,1,1))',
      color: 'white',
      '@media(max-width: 720px)': {
        top: '56px',
      },
      li: {
        padding: '4px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        fontSize: '15px',
        a: {
          width: '80%',
          textDecoration: 'none',
        },
        ':nth-child(2)': {
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        },
        ':last-child': {
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        },
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        div: {
          width: '20%',
          svg: {
            width: '18px',
            height: '18px',
            fill: 'white',
            margin: 'auto',
          },
        },
      },
    },
  },
})
