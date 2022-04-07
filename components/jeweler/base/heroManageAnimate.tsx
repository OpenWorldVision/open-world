import styled from '@emotion/styled';
import React from 'react'

export default function HeroManageAnimate () {
    return (
        <HeroManageAnimateStyle>
            <div>
                <div className="hero-manage">
                    <img
                        src="/images/jeweler/bank-npc.png"
                        alt="hero_manager"
                    />
                </div>
            </div>
        </HeroManageAnimateStyle>
    )
}

const HeroManageAnimateStyle = styled.div({
    '.hero-manage': {
        'img': {
            width: '74.081px',
            height: '106.101px',
            position: 'absolute',
            left: '640.176px',
            top: '226.672px',
          }
    },  
})
