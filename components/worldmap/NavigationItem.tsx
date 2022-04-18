import style from '@components/worldmap/navigation.module.css'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  pageName: string
}

function NavigationItem(props: Props) {
  const { title, pageName } = props

  const linkBtnEl = useRef(null)

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        linkBtnEl.current &&
        !linkBtnEl.current.contains(e.target) &&
        isActive
      ) {
        setIsActive(false)
      }
    }

    document.addEventListener('click', handleClickOutSide)

    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  }, [isActive, linkBtnEl])

  const activeLink = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={`${style.linkWrap} ${style[`${pageName}Wrap`]}`}>
      <Button
        ref={linkBtnEl}
        className={`${style.showLinkBtn} click-cursor`}
        onClick={activeLink}
      >
        <div
          className={`${style.linkOverlay} ${isActive && style.active}`}
        ></div>
        <Link href={`/${pageName}`}>
          <a
            className={`${style.navigateLink} ${
              style[`${pageName}Link`]
            } click-cursor ${isActive && style.active}`}
          >
            <div className={style.mapBtn}>
              <span>{title}</span>
            </div>
          </a>
        </Link>
      </Button>
    </div>
  )
}

export default NavigationItem
