import styled from '@emotion/styled';
import React from 'react'

export default function BankShineChestTC (props) {
    return (
        <BankShineChestTCStyle>
            <div>
                <div className="bankShine-chestTC">
                    <img
                        src="/images/bankShine-chestTC.png"
                        alt="bankShine-chestTC"
                    />
                </div>
            </div>
        </BankShineChestTCStyle>
    )
}

const BankShineChestTCStyle = styled.div({
    '.bankShine-chestTC': {
        position: 'absolute',
        left: '525.486px',
        top: '205.162px',
        width: '97.297px',
        height: '87.297px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            width: '12815.4px',
            height: '139.297px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '9.2s steps(92, end) 0s infinite normal none running animate-bankShine-chestTC',
        },
        '@keyframes animate-bankShine-chestTC': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-12815.4px',
              top: 0,
            }
        }
    },
})
