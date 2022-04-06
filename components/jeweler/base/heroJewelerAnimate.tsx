import styled from '@emotion/styled';
import React from 'react'

export default function HeroJewelerAnimate () {
    return (
        <HeroJewelerAnimateStyle>
            <div>
                <div className="hero-jeweler">
                    <img
                        src="/images/jeweler/teller-idle.png"
                        alt="hero_jeweler"
                    />
                </div>
            </div>
        </HeroJewelerAnimateStyle>
    )
}

const HeroJewelerAnimateStyle = styled.div({
    '.hero-jeweler': {
        position: 'absolute',
        left: '636.176px',
        top: '576px',
        width: '65.081px',
        height: '116.101px',
        zIndex: '188',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '670.368px',
            height: '101.571px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '11s steps(11, end) 0s infinite normal none running dKpWqB',
        },
        '@keyframes dKpWqB': {
            '0%': {
              left: 0,
              top: 0,
            },
            '100%': {
              left: '-670px',
              top: 0,
            }
        }
    }, 
})
