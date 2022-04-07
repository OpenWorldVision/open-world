import styled from '@emotion/styled';
import React from 'react'

export default function BankShinePig () {
    return (
        <BankShinePigStyle>
            <div>
                <div className="bankShine-pig">
                    <img
                        src="/images/jeweler/bankShine-pig.png"
                        alt="bankShine-pig"
                    />
                </div>
            </div>
        </BankShinePigStyle>
    )
}

const BankShinePigStyle = styled.div({
    '.bankShine-pig': {
        position: 'absolute',
        left: '772.51px',
        top: '180.162px',
        width: '92.8649px',
        height: '46.4324px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '6686.27px',
            height: '46.4324px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '7.2s steps(72, end) 0s infinite normal none running animate-bankShine-pig',
        },
        '@keyframes animate-bankShine-pig': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-6686.27px',
              top: 0,
            }
        }
    },
})
