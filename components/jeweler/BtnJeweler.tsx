import { styled } from "@chakra-ui/react"


const ButtonAnimate = styled.div`
    
`

export default function Jeweler({ allPostsData }) {
    return (
        <ButtonAnimate>
            <div>
                <div className="info-manage">
                    <button className="btn-info-manage cursor-btn">
                        <div className="btn-content">Manager</div>
                        <img
                            src="https://game.defikingdoms.com/static/media/bubble-arrow.905173b2.png"
                            alt=""
                        />
                    </button>
                </div>
            </div>
        </ButtonAnimate>
    )

}