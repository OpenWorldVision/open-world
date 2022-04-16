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
    <div className={style.CraftItemSelectedContainer}>
      <div className={style.CraftItemSelectedName}>
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
          className={style.ModalPopoverContent}
        ></div>
        <PopoverContent className={style.PopoverContent}>
          <PopoverBody>
            <div className={style.CraftName}>{craftItemSelected['name']}</div>
            <div className={style.Description}>
              {craftItemSelected['description']}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}
