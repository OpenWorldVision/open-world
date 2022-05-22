import { Grid, GridItem } from '@chakra-ui/react'
import style from './professionsSelection.module.css'
import { useCallback, useState } from 'react'
import ProfessionsModal from './ProfessionsModal'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { updateIsLoading } from 'reduxActions/isLoadingAction'

function ProfessionsSelection() {
  const [selectedNPC, setSelectedNPC] = useState(null)
  const dispatch = useDispatch()

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
    dispatch(updateIsLoading({ isLoading: true }))
  }, [])

  return (
    <>
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

      {selectedNPC && (
        <ProfessionsModal npc={selectedNPC} closeModal={() => selectNPC(0)} />
      )}
    </>
  )
}

export default ProfessionsSelection
