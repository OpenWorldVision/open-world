import styled from '@emotion/styled';
import React from 'react'

export default function BankLights () {
    return (
        <BankEyesStyle>
            <div>
                <div className="bank-lights">
                    <img
                        src="/images/jeweler/bank-lights.png"
                        alt="bank_lights"
                    />
                </div>
            </div>
        </BankEyesStyle>
    )
}

const BankEyesStyle = styled.div({
    '.bank-lights': {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '1312px',
        height: '992.97px',
        zIndex: '400',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '5268px',
            height: '1067.97px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '1.2s steps(4) 0s infinite normal none running animate-bank-lights',
        },
        '@keyframes animate-bank-lights': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-5268px',
            }
        }
    },
})
