import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { fetchUserInventoryItemAmount } from 'utils/Item'
import { listMultiItems } from 'utils/NFTMarket'
import useTransactionState from 'hooks/useTransactionState'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import ItemGrid from './ItemGrid'

type Item = {
  type: 'sushi' | 'ore' | 'hammer' | 'fish'
  ids: number[]
}
export type InventoryRef = {
  open: () => void
  close: () => void
}

function Inventory(_, ref) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<Item>(null)
  const [price, setPrice] = useState(null)
  const [amountItems, setAmountItems] = useState(null)
  const [isOpenNotify, setIsOpenNotify] = useState(null)
  const [data, setData] = useState(null)
  const handleTxStateChange = useTransactionState()

  useImperativeHandle(
    ref,
    () => ({
      open: onOpen,
      close: onClose,
    }),
    [onClose, onOpen]
  )
  useEffect(() => {
    getItemsIndex()
  }, [])

  const getItemsIndex = useCallback(async () => {
    const result = await fetchUserInventoryItemAmount()

    setData(result)
  }, [])

  const handleSelling = useCallback(async () => {
    const title = 'Sell item(s)'

    const result = await listMultiItems(
      selectedItem?.ids?.slice(0, Number(amountItems)),
      price,
      (txHash) => {
        handleTxStateChange(title, txHash, 2)
      }
    )

    if (result) {
      handleTxStateChange(title, result.transactionHash, result.status)
    } else {
      handleTxStateChange(title, '', 3)
    }

    getItemsIndex()
    setIsOpenNotify({ type: !!result })
    setData(null)
    setSelectedItem(null)
  }, [amountItems, getItemsIndex, price, selectedItem?.ids])

  const handleChangeAmountSellingItem = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxAmount = selectedItem?.ids?.length
      setAmountItems(
        e.target.value === '' ? '' : Math.min(Number(e.target.value), maxAmount)
      )
    },
    [selectedItem?.ids?.length]
  )

  const handleSelectItem = useCallback((value) => {
    setSelectedItem(value)
    setAmountItems('')
  }, [])

  const handleChangeSellingPrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(e.target.value === '' ? '' : Number(e.target.value))
    },
    []
  )

  const handleDecreaseSellingItemAmount = useCallback(() => {
    setAmountItems((amountItemsPrev) => {
      if (amountItemsPrev > 0) {
        return Number(amountItemsPrev) - 1
      }
      return amountItemsPrev
    })
  }, [])

  const handleIncreaseSellingItemAmount = useCallback(() => {
    const maxAmount = selectedItem?.ids?.length
    setAmountItems((amountItemsPrev) => {
      return Math.min(Number(amountItemsPrev) + 1, maxAmount)
    })
  }, [selectedItem?.ids?.length])

  const handleSelectAllItem = useCallback(() => {
    setAmountItems(selectedItem?.ids?.length)
  }, [selectedItem?.ids?.length])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalBody paddingStart={0}>
          <InventoryCSS>
            <div className="modal-inventory">
              <div className="modal-content">
                {isOpenNotify ? (
                  <div className="main">
                    <div className="container-notify">
                      <div className="notify-header">
                        {isOpenNotify.type ? 'SUCCESS' : 'FAILED'}
                      </div>
                      <div className="notify-body">
                        {isOpenNotify.type
                          ? 'Your Order has been Completed !'
                          : 'Your Order has been Failed'}
                      </div>
                      <img
                        onClick={() => {
                          setIsOpenNotify(null)
                        }}
                        className="notify-confirm click-cursor"
                        src="/images/inventory/confirm-notify.png"
                        alt="img"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="main">
                    <ItemGrid
                      loading={!data}
                      data={data}
                      onClickItem={handleSelectItem}
                      onClose={onClose}
                    />
                    <div className="container-2">
                      <div className="container-2-body">
                        <div className="container-2-header">Selected Item</div>
                        <div className="container-2-selected-item">
                          {selectedItem?.type && (
                            <div>
                              <img
                                src={`/images/inventory/items/${selectedItem.type}Amount.png`}
                                alt="img"
                              />
                            </div>
                          )}
                        </div>
                        <div className="container-2-price-input">
                          <Text>Price</Text>
                          <input
                            type="number"
                            value={price}
                            onChange={handleChangeSellingPrice}
                          />
                          <Text>OPEN</Text>
                        </div>
                        <div className="container-2-selling-amount">
                          <div>
                            <Text>Selling Amount</Text>
                          </div>
                          <input
                            type="number"
                            value={amountItems}
                            onChange={handleChangeAmountSellingItem}
                          />
                          <div className="container-2-selling-amount-caculation">
                            <div
                              onClick={handleIncreaseSellingItemAmount}
                              className="click-cursor"
                            >
                              +
                            </div>
                            <div
                              onClick={handleDecreaseSellingItemAmount}
                              className="click-cursor"
                            >
                              -
                            </div>
                            <div
                              onClick={handleSelectAllItem}
                              className="click-cursor"
                            >
                              ALL
                            </div>
                          </div>
                        </div>
                        <div className="container-2-total">
                          Total price:{' '}
                          <span>{selectedItem ? amountItems * price : 0}</span>{' '}
                          OPEN
                        </div>

                        <Button
                          className="container-2-btn-confirm click-cursor"
                          disabled={
                            !selectedItem || price === 0 || amountItems === 0
                          }
                          bgImg="/images/inventory/confirm-seller-board.png"
                          onClick={handleSelling}
                          bgSize="100% 100%"
                          size="lg"
                          width="18vw"
                          _hover={{
                            bgImg: '/images/inventory/confirm-seller-board.png',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </InventoryCSS>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default forwardRef<InventoryRef, any>(Inventory)

const InventoryCSS = styled.div({
  '.modal-inventory': {
    position: 'fixed',
    left: 0,
    top: 0,
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundImage: 'url(/images/inventory/background.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    '.modal-content': {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 0',
      '.main': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: '50px',
        height: '90vh',
        overflow: 'auto',
        width: '100vw',
        '.container-notify': {
          flex: 1,
          maxWidth: '750px',
          maxHeight: '550px',
          backgroundImage: 'url(/images/inventory/notify.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          '.notify-header': {
            marginTop: '80px',
            fontSize: '40px',
          },
          '.notify-body': {
            marginTop: '50px',
            fontSize: '25px',
          },
          '.notify-confirm': {
            marginTop: '80px',
          },
        },
        '.container': {
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
          maxWidth: '450px',
          '@media(min-width: 500px)': {
            minWidth: '450px',
          },
          '.container-body': {
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: 'url(/images/inventory/frame.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            width: '100%',
            height: '700px',
            padding: '165px 30px 65px 35px',
            position: 'relative',
            '.container-close': {
              position: 'absolute',
              top: '45px',
              right: '30px',
            },
            '.container-items': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              overflow: 'auto',
              height: '100%',
              fontSize: '28px',
              '.container-item': {
                backgroundColor: '#1E0F00',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                margin: '6px',
                position: 'relative',
                img: {
                  width: '50px',
                  height: '50px',
                },
                div: {
                  position: 'absolute',
                  right: '-5px',
                  bottom: '-5px',
                  backgroundColor: '#6E4E1A',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
            },
          },
        },
        '.container-2': {
          '@media(min-width: 950px)': {
            marginLeft: '50px',
          },
          '@media(max-width: 950px)': {
            marginTop: '50px',
          },
          flex: 1,
          maxWidth: '750px',
          '@media(min-width: 320px)': {
            minWidth: '350px',
          },
          display: 'flex',
          justifyContent: 'center',
          '.container-2-body': {
            backgroundImage: 'url(/images/inventory/seller-board.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 0',
            alignItems: 'center',
            width: '100%',
            height: 'fit-content',
            '.container-2-header': {
              marginTop: '50px',
              fontSize: '30px',
            },
            '.container-2-selected-item': {
              backgroundImage: 'url(/images/inventory/selected-item.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              width: '90px',
              height: '90px',
              marginTop: '20px',
              padding: '3px',
              div: {
                backgroundColor: '#261106',
                width: '100%',
                height: '100%',
                borderRadius: '15px',
                padding: '12px',
                img: {
                  width: '100%',
                  height: '100%',
                  borderRadius: '15px',
                },
              },
            },
            '.container-2-price-input': {
              display: 'flex',
              alignItems: 'center',
              marginTop: '40px',
              position: 'relative',
              '> div:first-child': {
                fontSize: '22px',
                position: 'absolute',
                left: '-60px',
              },
              '> input': {
                backgroundColor: '#261106',
                padding: '0 10px',
                borderRadius: '5px',
                borderLeft: '2px solid #B9AE7B',
                borderRight: '2px solid #B9AE7B',
                width: '170px',
                textAlign: 'center',
                outline: 'none',
                margin: '0 10px',
              },
              '> div:last-child': {
                position: 'absolute',
                right: '-70px',
                fontSize: '22px',
              },
            },
            '.container-2-selling-amount': {
              display: 'flex',
              alignItems: 'center',
              marginTop: '30px',
              position: 'relative',
              '@media(max-width: 500px)': {
                marginTop: '50px',
              },
              '> div:first-child': {
                position: 'absolute',
                left: '-130px',
                fontSize: '18px',
                '@media(max-width: 500px)': {
                  left: '20px',
                  top: '-30px',
                },
              },
              '> input': {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#261106',
                padding: '0 10px',
                borderRadius: '5px',
                borderLeft: '2px solid #B9AE7B',
                borderRight: '2px solid #B9AE7B',
                width: '170px',
                outline: 'none',
                textAlign: 'center',
              },
              '.container-2-selling-amount-caculation': {
                position: 'absolute',
                right: 0,
                left: '-5px',
                bottom: '-65px',
                margin: 'auto',
                fontSize: '22px',
                display: 'flex',
                alignItems: 'center',
                '> div': {
                  display: 'flex',
                  fontSize: '40px',
                  lineHeight: '25px',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '2px solid #F1E994',
                  margin: '0 10px',
                  borderRadius: '10px',
                  ':last-child': {
                    fontSize: '18px',
                    lineHeight: '35px',
                  },
                },
              },
            },
            '.container-2-total': {
              marginTop: '80px ',
              span: {
                fontSize: '30px',
                color: '#F1E994',
              },
            },
            '.container-2-btn-confirm': {
              marginTop: '20px',
            },
          },
        },
      },
    },
  },
})
