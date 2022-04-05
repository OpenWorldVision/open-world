import styled from '@emotion/styled';
import React from 'react'

export default function TableLayout (props) {
    return (
        <TableLayoutStyle>
            <div>
                <div className="table-container">
                    <img
                        style={{
                            width: props.width,
                            height: props.height,
                            top: props.top,
                            left: props.left,
                        }}
                        src={props.src}
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
