import { Button, Grid, GridItem } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { updateIsLoading } from 'reduxActions/isLoadingAction'
import mainStyle from './professions.module.css'
import inheritStyle from './professionsSelection.module.css'
import style from './professionsModal.module.css'
import { useCallback, useEffect, useState } from 'react'
import { getProfile } from 'utils/profileContract'
import { setProfile } from 'reduxActions/profileAction'
import {
  fetchRequireBalanceProfession,
  mintProfessionNFT,
  fetchUserProfessionNFT,
  activateProfession,
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
    'Supplier has the skill to make Fish becomes Sushi then sell it at Food Court',
    'Supplier run their own business at OpenWorld and make a profit',
    'The number of Supplier is limited',
  ],
  [
    'BlackSmith is a Career of OpenWorld',
    'BlackSmith has the skill to make Ore into Hammer and then sell it at the WorkShop',
    'BlackSmith run their own business at OpenWorld and make a profit',
    'Number of BlackSmith is limited',
  ],
]

type Props = {
  npc: string
  closeModal: () => void
}

function ProfessionsModal(props: Props) {
  const { npc, closeModal } = props
  const [currentNpcText, setCurrentNpcText] = useState([])
  const [haveNFT, setHaveNFT] = useState(false)
  const [canActivate, setCanActivate] = useState(false)
  const [currentOPEN, setCurrentOPEN] = useState(0)
  const [requireBalance, setRequireBalance] = useState(0)
  const dispatch = useDispatch()


  const getContractProfile = async () => {
    const _profile = await getProfile()

    dispatch(setProfile({ profile: _profile }))
  }

  const getRequireBalanceProfession = async () => {
    const balance = await fetchRequireBalanceProfession()
    setRequireBalance(balance)
  }

  const getUserBalance = async () => {
    const balance = await getBalanceOfOpen()
    setCurrentOPEN(parseFloat(balance))
    return parseFloat(balance)
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

  const onActivateProfession = async () => {
    if (canActivate) {
      dispatch(updateIsLoading({ isLoading: true }))
      const professionNft = npcs.indexOf(npc) + 1
      const check = await activateProfession(professionNft)
      await getContractProfile();
      dispatch(updateIsLoading({ isLoading: false }))
      return check
    }
    return null
  }

  const checkIfHasNTF = async () => {
    const nftList = await fetchUserProfessionNFT()
    const check = nftList.includes(npcs.indexOf(npc) + 1)
    setHaveNFT(check)
    return check
  }

  const getCurrentNpcText = () => {
    setCurrentNpcText(npcText[npcs.indexOf(npc)])
  }

  const checkIfCanActive = useCallback(async () => {
    const checkNFT = await checkIfHasNTF()
    const checkBalance = await getUserBalance()
    if (npc === 'openian') {
      setCanActivate(checkNFT)
    } else {
      setCanActivate(checkNFT && checkBalance >= requireBalance)
    }
  }, [haveNFT, currentOPEN])

  const initialize = async () => {
    await mintHeroNFT()
    await getRequireBalanceProfession()
    await checkIfCanActive()
    dispatch(updateIsLoading({ isLoading: false }))
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
            <div className={`${style.npcCard} ${style[`${npc}NPC`]}`}></div>
          </GridItem>
          <GridItem rowSpan={3} colSpan={2}>
            <div className={`${inheritStyle.professionsText} ${style.npcText}`}>
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
                    Have a {npc.charAt(0).toUpperCase() + npc.slice(1)} NFT
                  </span>
                </Button>
                {npc !== 'openian' && (
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
              className={`btn-chaka ${style.activateBtn} ${
                canActivate && style.active
              } click-cursor`}
              onClick={onActivateProfession}
            ></Button>
          </GridItem>
        </Grid>
      </div>

      <div
        className={`${inheritStyle.backBtn} click-cursor`}
        onClick={closeModal}
      ></div>
    </div>
  )
}

export default ProfessionsModal
