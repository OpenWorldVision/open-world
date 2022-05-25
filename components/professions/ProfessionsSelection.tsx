import { Grid, GridItem } from '@chakra-ui/react'
import style from './professionsSelection.module.css'
import { useCallback, useState } from 'react'
import ProfessionsModal from './ProfessionsModal'
import Link from 'next/link'
import ProfessionsResult from './ProfessionsResult'
import LoadingModal from '@components/LoadingModal'

function ProfessionsSelection() {
  const [selectedNPC, setSelectedNPC] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const selectNPC = useCallback((npcIndex: number) => {
    switch (npcIndex) {
      case 0:
        setSelectedNPC(null)
        break
      case 1:
        setSelectedNPC('openian')
        break
      case 2:
        setSelectedNPC('supplier')
        break
      case 3:
        setSelectedNPC('blacksmith')
        break
    }
    setIsLoading(true)
  }, [])

  const activateResult = (state) => {
    setResult(state)
  }

  const onCloseModal = useCallback(() => {
    selectNPC(0)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  const toggleLoadingModal = useCallback((state) => {
    setIsLoading(state)
  }, [])

  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        className={`${style.professionsSelection} ${
          selectedNPC === null && style.active
        }`}
      >
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            '2xl': 'repeat(3, 1fr)',
          }}
          gap={12}
        >
          <GridItem
            w={{
              '2xl': 347,
            }}
            h={595}
          >
            <div
              className={`${style.npcCard} ${style.openianNPC} click-cursor`}
              onClick={() => selectNPC(1)}
            ></div>
          </GridItem>
          <GridItem
            w={{
              '2xl': 347,
            }}
            h={595}
          >
            <div
              className={`${style.npcCard} ${style.supplierNPC} click-cursor`}
              onClick={() => selectNPC(2)}
            ></div>
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: 2,
              '2xl': 1,
            }}
            w={{
              '2xl': 347,
            }}
            h={595}
          >
            <div
              className={`${style.npcCard} ${style.smithNPC} click-cursor`}
              onClick={() => selectNPC(3)}
            ></div>
          </GridItem>
        </Grid>

        <div className={style.professionsText}>
          <span>Choose a career and start your journey with the OpenWorld</span>
        </div>

        <Link href="/">
          <a className={`${style.backBtn} click-cursor`}></a>
        </Link>
      </div>

      {selectedNPC && !result && (
        <ProfessionsModal
          npc={selectedNPC}
          toggleLoadingModal={(state) => toggleLoadingModal(state)}
          closeModal={() => onCloseModal()}
          getResult={(result) => activateResult(result)}
        />
      )}

      {selectedNPC && result && <ProfessionsResult npc={selectedNPC} />}
    </>
  )
}

export default ProfessionsSelection
