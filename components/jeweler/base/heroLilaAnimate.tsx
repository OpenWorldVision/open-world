import styled from '@emotion/styled';
import React from 'react'

export default function HeroLilaAnimate (props) {
    return (
        <HeroLilaAnimateStyle>
            <div>
                <div className="hero-lila">
                    <img
                        src="/images/lila-animation.png"
                        alt="hero_lila"
                    />
                </div>
            </div>
        </HeroLilaAnimateStyle>
    )
}

const HeroLilaAnimateStyle = styled.div({
    '.hero-lila': {
        position: 'absolute',
        left: '454.176px',
        top: '501.672px',
        width: '112.081px',
        height: '116.101px',
        zIndex: '188',
        overflow: 'hidden',
        'img': {
            position: 'absolute',
            minWidth: '6686.27px',
            height: '101.571px',
            imageRendering: 'pixelated',
            transform: 'scale(1, 1)',
            animation: '14s steps(48, end) 0s infinite normal none running animate-hero-lila',
        },
        '@keyframes animate-hero-lila': {
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
