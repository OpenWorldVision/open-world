import styled from '@emotion/styled';
import React from 'react'

type Props = {
    width: number
    height: number
    top: number
    left: number
    src: string
}

export default function TableLayout (props:Props) {
    const {width, height, top, left, src} = props

    return (
        <TableLayoutStyle>
            <div>
                <div className="table-container">
                    <img
                        style={{
                            width,
                            height,
                            top,
                            left,
                        }}
                        src={src}
                        alt=""
                    />
                </div>
            </div>
        </TableLayoutStyle>
    )
}

const TableLayoutStyle = styled.div({
    '.table-container': {
        'img': {
            position: 'absolute',
            width: '216px',
            height: '145px',
            top: '246.027px',
            left: '567.919px',
            overflow: 'hidden',
            display: 'flex',
            padding: '0px',
            border: '0px',
            backgroundColor: 'transparent',
            zIndex: '370',
        }
    },
})
