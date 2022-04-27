import style from './CraftItemApprovalStyle.module.css'
import React, { useState } from 'react'
import { Popover, PopoverBody, PopoverContent } from '@chakra-ui/react'

type Props = {
  craftItemSelected: object
}

function CraftItemApproval(props: Props) {
  const { craftItemSelected } = props

  const [isEnabled, setIsEnabled] = useState(false)
  const [isEnabledModal, setIsEnabledModal] = useState('none')

  const [checkItemCraftApproval, setCheckItemCraftApproval] = useState('')

  const handleSetIsEnabled = (value) => {
    setIsEnabled(value)
  }

  const handleSetIsEnabledModal = (value) => {
    setIsEnabledModal(value)
  }

  const handleTurnOffModal = () => {
    handleSetIsEnabled(false)
    handleSetIsEnabledModal('none')
  }

  const handleTurnOnModal = (name) => {
    handleSetIsEnabled(true)
    handleSetIsEnabledModal('block')
    setCheckItemCraftApproval(name)
  }

  return (
    <>
      <div className={style.craftItemApprovalContainer}>
        {craftItemSelected['craftItemApproval']?.map((item, index) => {
          return (
            <div key={index} className={style.itemApprovalContainer}>
              <div
                onClick={() => {
                  handleTurnOnModal(item.name)
                }}
                className={`${style.bgItem} ${style.sizeBackgroundItem} ${style.craftItem}`}
              >
                <div
                  className={`${style.craftItemBgContainer} ${style.bgOpacity}`}
                >
                  <img src={item.img} alt={item.name} />
                  <div className={style.craftItemApprovalQuantity}>
                    {item.quantity}
                  </div>
                </div>
              </div>
              {checkItemCraftApproval === item.name && (
                <Popover trigger="hover" isOpen={isEnabled} placement="bottom">
                  <PopoverContent className={style.popoverContent}>
                    <PopoverBody>
                      <div className={style.craftName}>{item['name']}</div>
                      <div className={style.description}>
                        {item['description']}
                      </div>
                      <div className={style.btnAddTokenContainer}>
                        <button className={`${style.btnAddToken} cursor-btn`}>
                          ADD TOKEN
                        </button>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
              <div
                onClick={handleTurnOffModal}
                style={{ display: isEnabledModal }}
                className={style.modalPopoverContent}
              ></div>
              <div className={style.scraftApprovalMissing}>MISSING</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default React.memo(CraftItemApproval)
