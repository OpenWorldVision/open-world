import styled from '@emotion/styled';
import React from 'react'

export default function BankShineVaseL (props) {
    return (
        <BankShineVaseLStyle>
            <div>
                <div className="bankShine-vaseL">
                    <img
                        src="/images/bankShine-vaseL.png"
                        alt="bankShine-vaseL"
                    />
                </div>
            </div>
        </BankShineVaseLStyle>
    )
}

const BankShineVaseLStyle = styled.div({
    '.bankShine-vaseL': {
        position: 'absolute',
        left: '451.622px',
        top: '494.054px',
        width: '92.8649px',
        height: '46.4324px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '7429.19px',
            height: '46.4324px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '8s steps(80, end) 0s infinite normal none running animate-bankShine-vaseL',
        },
        '@keyframes animate-bankShine-vaseL': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-7429.19px',
              top: 0,
            }
        }
    },
})
