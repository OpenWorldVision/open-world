import styled from '@emotion/styled';
import React from 'react'

export default function BankEyes () {
    return (
        <BankEyesStyle>
            <div>
                <div className="bank-eyes">
                    <img
                        src="/images/jeweler/bank-eyes.png"
                        alt="bank_eyes"
                    />
                </div>
            </div>
        </BankEyesStyle>
    )
}

const BankEyesStyle = styled.div({
    '.bank-eyes': {
        position: 'absolute',
        left: '1057.176px',
        top: '95.672px',
        width: '101.081px',
        height: '84.101px',
        zIndex: '188',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '2414.49px',
            height: '92.8649px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '13s steps(26, end) 0s infinite normal none running animate-bank-eyes',
        },
        '@keyframes animate-bank-eyes': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-2414.49px',
              top: 0,
            }
        }
    },
})
