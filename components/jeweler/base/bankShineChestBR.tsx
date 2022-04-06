import styled from '@emotion/styled';
import React from 'react'

export default function BankShineChestBR () {
    return (
        <BankShineChestBRStyle>
            <div>
                <div className="bankShine-chestBR">
                    <img
                        src="/images/jeweler/bankShine-chestBR.png"
                        alt="bankShine-chestBR"
                    />
                </div>
            </div>
        </BankShineChestBRStyle>
    )
}

const BankShineChestBRStyle = styled.div({
    '.bankShine-chestBR': {
        position: 'absolute',
        left: '1162px',
        top: '770.081px',
        width: '92.8649px',
        height: '139.297px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '8079.24px',
            height: '139.297px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '8.8s steps(88, end) 0s infinite normal none running animate-bankShine-chestBR',
        },
        '@keyframes animate-bankShine-chestBR': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-8079.24px',
              top: 0,
            }
        }
    },
})
