import { Popover, PopoverBody, PopoverContent } from '@chakra-ui/react'
import { useState } from 'react'
import style from './CraftItemSelectedStyle.module.css'

type Props = {
  craftItemSelected: object
}

export default function CraftItemSelected(props: Props) {
  const { craftItemSelected } = props

  const [isEnabled, setIsEnabled] = useState(false)
  const [isEnabledModal, setIsEnabledModal] = useState('none')

  const handleSetIsEnabled = (value) => {
    setIsEnabled(value)
  }

  const handleSetIsEnabledModal = (value) => {
    setIsEnabledModal(value)
  }

  return (
    <div className={style.craftItemSelectedContainer}>
      <div className={style.craftItemSelectedName}>
        {craftItemSelected['name']}
      </div>
      <div
        onClick={() => {
          handleSetIsEnabled(true), handleSetIsEnabledModal('block')
        }}
        className={`${style.bgItem} ${style.sizeBackgroundItem} ${style.craftItem} cursor-btn`}
      >
        <div className={`${style.craftItemBgOpacity}`}>
          <img src={craftItemSelected['img']} alt={craftItemSelected['name']} />
        </div>
      </div>
      <Popover trigger="hover" isOpen={isEnabled} placement="bottom">
        <div
          onClick={() => {
            handleSetIsEnabled(false), handleSetIsEnabledModal('none')
          }}
          style={{ display: isEnabledModal }}
          className={style.modalPopoverContent}
        ></div>
        <PopoverContent className={style.popoverContent}>
          <PopoverBody>
            <div className={style.craftName}>{craftItemSelected['name']}</div>
            <div className={style.description}>
              {craftItemSelected['description']}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}
