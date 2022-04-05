import styled from '@emotion/styled';
import React from 'react'

export default function BankShineChestTL (props) {
    return (
        <BankShineChestTLStyle>
            <div>
                <div className="bankShine-chestTL">
                    <img
                        src="/images/bankShine-chestTL.png"
                        alt="bankShine-chestTL"
                    />
                </div>
            </div>
        </BankShineChestTLStyle>
    )
}

const BankShineChestTLStyle = styled.div({
    '.bankShine-chestTL': {
        position: 'absolute',
        left: '279.459px',
        top: '207.595px',
        width: '139.297px',
        height: '139.297px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '10168.7px',
            height: '139.297px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '7.3s steps(73, end) 0s infinite normal none running animate-bankShine-chestTL',
        },
        '@keyframes animate-bankShine-chestTL': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-10168.7px',
              top: 0,
            }
        }
    },
})
