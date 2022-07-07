import { useCallback } from 'react'
import styles from './market.module.css'

type Props = {
  index: number
  onClick: (index: number) => void
  label: string
  selected: boolean
}
function NavItem({ index, onClick, label, selected }: Props) {
  const handleClick = useCallback(() => {
    onClick(index)
  }, [index, onClick])

  return (
    <div onClick={handleClick}>
      <div
        className={selected ? styles.select + ' click-cursor' : 'click-cursor'}
      >
        {label}
      </div>
    </div>
  )
}

export default NavItem
