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

  return (
    <>
      <div className={style.CraftItemApprovalContainer}>
        {craftItemSelected['craftItemApproval']?.map((item, index) => {
          return (
            <div key={index} className={style.ItemApprovalContainer}>
              <div
                onClick={() => {
                  handleSetIsEnabled(true),
                    handleSetIsEnabledModal('block'),
                    setCheckItemCraftApproval(item.name)
                }}
                className={`${style.bgItem} ${style.sizeBackgroundItem} ${style.craftItem}`}
              >
                <div
                  className={`${style.craftItemBgContainer} ${style.BgOpacity}`}
                >
                  <img src={item.img} alt={item.name} />
                  <div className={style.CraftItemApprovalQuantity}>
                    {item.quantity}
                  </div>
                </div>
              </div>
              {checkItemCraftApproval === item.name && (
                <Popover trigger="hover" isOpen={isEnabled} placement="bottom">
                  <PopoverContent className={style.PopoverContent}>
                    <PopoverBody>
                      <div className={style.CraftName}>{item['name']}</div>
                      <div className={style.Description}>
                        {item['description']}
                      </div>
                      <div className={style.test}>
                        <button className={`${style.BtnAddToken} cursor-btn`}>
                          ADD TOKEN
                        </button>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
              <div
                onClick={() => {
                  handleSetIsEnabled(false), handleSetIsEnabledModal('none')
                }}
                style={{ display: isEnabledModal }}
                className={style.ModalPopoverContent}
              >
                {isEnabledModal}
              </div>
              <div className={style.ScraftApprovalMissing}>MISSING</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default React.memo(CraftItemApproval)
