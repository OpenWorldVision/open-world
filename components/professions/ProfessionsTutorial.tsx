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
        <div
            className="modal-professions-tutorial"
            onClick={(e) => {
                handleCloseModalProfessionsTutorial(e)
            }}
        >
        <div className="modal-content">
            <div className="main">
                <div className="container">   
                    <button 
                        className='close'
                        onClick={() => {setIsOpenTutorial(false)}}
                    >
                        <img src="./images/icons/close.png" alt="img" />
                    </button>
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
    backgroundColor: 'rgba(0,0,0,0.8)',
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
        width: '700px',
        '.main': {
            '.container': {
                backgroundImage: 'url(./images/professions/tutorial-frame.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                padding: '50px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                '@media(max-width: 720px)': {
                    padding: '10px',
                    paddingTop: '50px'
                },
                '.close': {
                    position: 'absolute',
                    '@media(max-width: 720px)': {
                        top: '85px',
                        right: '25px',
                    },
                    top: '80px',
                    right: '40px',
                    width: '30px',
                    height: '30px',
                },
                '.header': {
                    textAlign: 'center',
                    fontSize: '25px',
                    marginTop: '80px',
                },
                '.body': {
                    marginTop: '50px',
                    textAlign: 'center',
                    fontSize: '16px',
                },
                '.btn-go-professions': {
                    backgroundImage: 'url(./images/professions/go-tutorial.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    width: '300px',
                    height: '120px',
                    '@media(max-width: 720px)': {
                        width: '280px',
                        height: '100px',
                        marginBottom: '20px'
                    },
                }
            }
        }
    },
  },
})
