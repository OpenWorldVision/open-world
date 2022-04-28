import { Button, Grid, GridItem } from '@chakra-ui/react'
import mainStyle from '@components/professions/professions.module.css'
import style from '@components/professions/npc.module.css'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchRequireBalanceProfession,
  mintProfessionNFT,
  fetchUserProfessionNFT,
} from '../../utils/professions'
import { getBalanceOfOpen } from '../../utils/checkBalanceOpen'

const npcs = ['openian', 'supplier', 'blacksmith']

const npcText = [
  [
    'Openian is a Career of OpenWorld',
    'An Openian has two skills: Fishing and Mining',
    'Fishing: Can catch some fishes and sell them to Supplier',
    'Mining: Can find some ores at the mine and sell them to BlackSmith',
  ],
  [
    'Supplier is a Career of OpenWorld',
    'Supplier has skill to make Fish becomes Sushi then sell it at Food Court',
    'Supplier run their own business at OpenWorld and make profit',
    'Number or Supplier is limited',
  ],
  [
    'BlackSmith is a Career of OpenWorld',
    'BlackSmith has skill to make Ore becomes Hammer then sell it at WorkShop',
    'BlackSmith run their own business at OpenWorld and make profit',
    'Number or BlackSmith is limited',
  ],
]

function ProfessionsModal(props) {
  const { params } = props
  const [currentNpcText, setCurrentNpcText] = useState([])
  const [haveNFT, setHaveNFT] = useState(false)
  const [canActivate, setCanActivate] = useState(false)
  const [currentOPEN, setCurrentOPEN] = useState(0)
  const [requireBalance, setRequireBalance] = useState(0)

  const getRequireBalanceProfession = async () => {
    const balance = await fetchRequireBalanceProfession()
    setRequireBalance(balance)
  }

  const getUserBalance = async () => {
    const balance = await getBalanceOfOpen()
    setCurrentOPEN(parseFloat(balance))
    return parseFloat(balance);
  }

  // @test mint heroCore
  const mintHeroNFT = async () => {
    const trait = prompt('Enter trait (1-3) to mint NFT, enter 0 for cancel')
    if (trait !== '0') {
      await mintProfessionNFT(trait)
      await checkIfHasNTF()
      await checkIfCanActive()
    }
  }

  const checkIfHasNTF = async () => {
    const nftList = await fetchUserProfessionNFT()
    const check = nftList.includes(npcs.indexOf(params.npc) + 1)
    setHaveNFT(check)
    return check;
  }

  const getCurrentNpcText = () => {
    setCurrentNpcText(npcText[npcs.indexOf(params.npc)])
  }

  const checkIfCanActive = useCallback(async () => {
    const checkNFT = await checkIfHasNTF()
    const checkBalance = await getUserBalance()
    if (params.npc === 'openian') {
      setCanActivate(checkNFT)
    }
    else {
      setCanActivate(checkNFT && checkBalance >= requireBalance)
    }
  }, [haveNFT, currentOPEN])

  const initialize = async () => {
    await mintHeroNFT()
    await getRequireBalanceProfession()
    checkIfCanActive()
  }

  useEffect(() => {
    getCurrentNpcText()
    initialize()
  }, [])

  return (
    <div
      className={`${mainStyle.professionsOverlay} ${style.npcOverlay} overlay game-scroll-bar`}
    >
      <div className={style.npcContainer}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap={10}
        >
          <GridItem
            className={style.npcCardWrap}
            rowSpan={4}
            colSpan={{
              base: 2,
              xl: 1,
            }}
            h={{
              base: 590,
              md: 720,
            }}
            w={{
              xl: 430,
            }}
          >
            <div
              className={`${style.npcCard} ${style[`${params.npc}NPC`]}`}
            ></div>
          </GridItem>
          <GridItem rowSpan={3} colSpan={2}>
            <div className={`${mainStyle.professionsText} ${style.npcText}`}>
              <span>
                {currentNpcText.map((line) => (
                  <>
                    {line} <br />
                  </>
                ))}
              </span>

              <div className={style.btnGroup}>
                <Button
                  className={`${style.btn} ${style.acceptBtn} ${
                    haveNFT && style.active
                  } click-cursor`}
                >
                  <span>
                    Have an{' '}
                    {params.npc.charAt(0).toUpperCase() + params.npc.slice(1)}{' '}
                    NFT
                  </span>
                </Button>
                {params.npc !== 'openian' && (
                  <Button
                    className={`${style.btn} ${style.acceptBtn} ${
                      currentOPEN >= requireBalance && style.active
                    } click-cursor`}
                  >
                    <span>Have {requireBalance} $OPEN</span>
                  </Button>
                )}
              </div>
            </div>
          </GridItem>
          <GridItem colSpan={2} className={style.activateWrap}>
            <Button
              className={`${style.btn} ${style.activateBtn} ${
                canActivate && style.active
              } click-cursor`}
            ></Button>
          </GridItem>
        </Grid>
      </div>

      <Link href="/professions">
        <a className={`${mainStyle.backBtn} click-cursor`}></a>
      </Link>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = npcs.map((npc) => ({
    params: { npc: npc },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return { props: { params } }
}

export default ProfessionsModal
