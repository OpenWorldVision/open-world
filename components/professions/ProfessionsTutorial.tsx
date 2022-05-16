import { useCallback } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

export default function ProfessionsTutorial({
    setIsOpenTutorial,
    isOpenTutorial
}) {
    const router = useRouter()

    const handleCloseModalProfessionsTutorial = useCallback(
        (e) => {
            if (e.target !== e.currentTarget) return
            setIsOpenTutorial(false)
        },[isOpenTutorial]
    )

    return (
    <ProfessionsTutorialCSS>
        <div className="modal-professions-tutorial">
        <div className="modal-content">
            <div className="main">
                <div
                    className="container"
                    onClick={(e) => {
                        handleCloseModalProfessionsTutorial(e)
                    }}
                >
                    <div className="header">THE VERY FIRST THING YOU NEED TO DO IN OPENWORLD IS CHOOSE A CAREER FOR YOUR AVATAR.</div>
                    <div className="body">LETS GO CHECK OUT PROFESSIONS BUILDING WHERE YOU CAN SEE ALL THE CAREERS THAT NOW AVAILABLE IN OPENWORLD. SEE ONE FITS YOUR STYLE, DONT BE HESITATE TO CHOOSE IT</div>
                    <button onClick={() => { router.push('/professions') }} className="btn-go-professions"></button>
                </div>
            </div>
        </div>
        </div>
    </ProfessionsTutorialCSS>
    )
}

const ProfessionsTutorialCSS = styled.div({
  '.modal-professions-tutorial': {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    '.modal-content': {
      display: 'flex',
      flexDirection: 'column',
      height: '90%',
      padding: '8px',
      width: '910px',
      '.main': {
        paddingBottom: '50px',
        width: '100%',
        height: '100%',
        '.container': {
            backgroundImage: 'url(./images/professions/tutorial-frame.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            '.header': {
                width: '40%',
                textAlign: 'center',
                fontSize: '15px',
                marginTop: '60px'
            },
            '.body': {
                width: '40%',
                textAlign: 'center',
                fontSize: '11px',
                marginTop: '30px'
            },
            '.btn-go-professions': {
                backgroundImage: 'url(./images/professions/go-tutorial.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '160px',
                height: '15%',
                marginTop: '10px'
            }
        }
      },
    },
  },
})
