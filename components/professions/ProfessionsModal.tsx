import { Button, Grid, GridItem } from '@chakra-ui/react'
import mainStyle from './professions.module.css'
import inheritStyle from './professionsSelection.module.css'
import style from './professionsModal.module.css'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchRequireBalanceProfession,
  fetchUserProfessionNFT,
  activateProfession,
} from '../../utils/professions'
import { getOpenBalance } from '../../utils/checkBalanceOpen'
import LoadingModal from '@components/LoadingModal'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'
import { ethers } from 'ethers'

const NPCList = ['openian', 'supplier', 'blacksmith']

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
  getResult: (any) => void
  toggleLoadingModal: (boolean) => void
  closeModal: () => void
}
async function getUserBalance() {
  const balance = await getOpenBalance(false)
  return Number(balance)
}

function ProfessionsModal(props: Props) {
  const { npc, getResult, toggleLoadingModal, closeModal } = props
  const [currentNpcText, setCurrentNpcText] = useState([])
  const [haveNFT, setHaveNFT] = useState(false)
  const [canActivate, setCanActivate] = useState(false)
  const [haveRequireBalance, setHaveRequireBalance] = useState(false)
  const [requireBalance, setRequireBalance] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleTxStateChange = useTransactionState()

  const onActivateProfession = useCallback(async () => {
    const title = 'Activate career'
    if (!canActivate) {
      return
    }
    setIsLoading(true)
    const professionNft = NPCList.indexOf(npc) + 1
    const heroes = await fetchUserProfessionNFT()
    const hero = heroes.find((hero) => professionNft === hero.trait)

    if (hero) {
      const data = await activateProfession(
        professionNft,
        hero.heroId,
        (txHash) => {
          handleTxStateChange(title, txHash, TRANSACTION_STATE.WAITING)
        }
      )

      if (data) {
        getResult(data.status)
        handleTxStateChange(title, data.transactionHash, data.status)
      } else {
        handleTxStateChange(title, '', TRANSACTION_STATE.NOT_EXECUTED)
      }
    }
    setIsLoading(false)
  }, [canActivate, getResult, handleTxStateChange, npc])

  const checkIfHasNTF = useCallback(async () => {
    const nftList = await fetchUserProfessionNFT()
    const check = nftList.some(
      (hero) => NPCList.indexOf(npc) + 1 === hero.trait
    )
    setHaveNFT(check)
    return check
  }, [npc])

  const getCurrentNpcText = () => {
    setCurrentNpcText(npcText[NPCList.indexOf(npc)])
  }

  useEffect(() => {
    ;(async () => {
      const requireBalance = await fetchRequireBalanceProfession()
      setRequireBalance(requireBalance)
      getCurrentNpcText()
      if (requireBalance.length === 0) {
        return
      }
      const hasHeroNFT = await checkIfHasNTF()
      const userBalance = await getUserBalance()
      const _requireBalance =
        npc === 'openian'
          ? requireBalance[2]
          : npc === 'supplier'
          ? requireBalance[1]
          : requireBalance[0]
      setCanActivate(
        hasHeroNFT &&
          userBalance >= parseFloat(ethers.utils.formatEther(_requireBalance))
      )
      setHaveRequireBalance(
        userBalance >= parseFloat(ethers.utils.formatEther(_requireBalance))
      )
      toggleLoadingModal(false)
    })()
  }, [])

  return (
    <>
      {isLoading && <LoadingModal />}

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
              key="npc"
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
            <GridItem rowSpan={3} colSpan={2} key="npc-info">
              <div
                className={`${inheritStyle.professionsText} ${style.npcText}`}
              >
                <span>
                  {currentNpcText.map((line) => (
                    <>
                      {line} <br />
                    </>
                  ))}
                </span>

                <span>
                  You can buy NFT {npc.charAt(0).toUpperCase() + npc.slice(1)}{' '}
                  at Castle / Shop
                </span>

                <div className={style.btnGroup}>
                  <Button
                    className={`${style.btn} ${style.acceptBtn} ${
                      haveNFT && style.active
                    } click-cursor`}
                  >
                    <span>
                      Have {npc !== 'openian' ? 'a' : 'an'}{' '}
                      {npc.charAt(0).toUpperCase() + npc.slice(1)} NFT
                    </span>
                  </Button>
                </div>
              </div>
            </GridItem>
            <GridItem colSpan={2} className={style.activateWrap} key="npc-cta">
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
        />
      </div>
    </>
  )
}

export default ProfessionsModal
