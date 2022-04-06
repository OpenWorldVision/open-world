import styled from '@emotion/styled';
import React from 'react'

export default function BankShineChestTR () {
    return (
        <BankShineChestTRStyle>
            <div>
                <div className="bankShine-chestTR">
                    <img
                        src="/images/jeweler/bankShine-chestTR.png"
                        alt="bankShine-chestTR"
                    />
                </div>
            </div>
        </BankShineChestTRStyle>
    )
}

const BankShineChestTRStyle = styled.div({
    '.bankShine-chestTR ': {
        position: 'absolute',
        left: '1003.54px',
        top: '165.162px',
        width: '139.297px',
        height: '92.8649px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '11979.6px',
            height: '92.8649px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '8.6s steps(86, end) 0s infinite normal none running animate-bankShine-chestTR',
        },
        '@keyframes animate-bankShine-chestTR': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-11979.6px',
              top: 0,
            }
        }
    },
})
