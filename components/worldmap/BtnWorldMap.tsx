import Link from 'next/link'
import { useState } from 'react'
import styled from '@emotion/styled'

export default function BtnWorldMap() {
  return (
    <BtnWorldMapStyle>
      <div>
        <div className="bordered-box-thin">
          <Link href="/">
            <a>World Map</a>
          </Link>
        </div>
      </div>
    </BtnWorldMapStyle>
  )
}

const BtnWorldMapStyle = styled.div({
  a: {
    background: ' url(/images/worldmap/hand-pointer.png) 0.4em 60% no-repeat',
    padding: '0em 0.6em 0em 2.1em',
    color: 'rgb(255, 255, 255)',
    textDecoration: 'none',
    // cursor: 'url(/images/worldmap/SelectCursor.png),auto',
  },
  '.bordered-box-thin': {
    position: 'fixed',
    bottom: '25px',
    left: '20px',
    border: '1px solid rgb(76, 62, 35)',
    padding: '1rem',
    backgroundImage:
      'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))',
    // cursor: 'url(/images/jeweler/default-cursor.png), auto',
  },
  '@media(max-width: 768px)': {
    '.bordered-box-thin': {
      padding: '0.25rem',
      left: '10px',
    },
  },
})
