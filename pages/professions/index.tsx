import style from '../../components/professions/professions.module.css'
import { Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'

function Professions() {
  return (
    <div className={`${style.professionsOverlay} overlay game-scroll-bar`}>
      <div className={style.professionsContainer}>
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
            <Link href="/professions/openian">
              <a
                className={`${style.npcCard} ${style.openianNPC} click-cursor`}
              ></a>
            </Link>
          </GridItem>
          <GridItem
            w={{
              '2xl': 347,
            }}
            h={595}
          >
            <Link href="/professions/supplier">
              <a
                className={`${style.npcCard} ${style.supplierNPC} click-cursor`}
              ></a>
            </Link>
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
            <Link href="/professions/blacksmith">
              <a
                className={`${style.npcCard} ${style.smithNPC} click-cursor`}
              ></a>
            </Link>
          </GridItem>
        </Grid>

        <div className={style.professionsText}>
          <span>Choose a career and start your journey with the OpenWorld</span>
        </div>
      </div>

      <Link href="/">
        <a className={`${style.backBtn} click-cursor`}></a>
      </Link>
    </div>
  )
}

export default Professions
