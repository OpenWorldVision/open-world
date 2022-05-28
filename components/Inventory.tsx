import { useCallback, useState } from 'react'
import styled from '@emotion/styled'

const itemsIndex = [
  {
    name: 'fish',
    indexItem: 1,
    amount: 12
  },
  {
    name: 'ore',
    indexItem: 2,
    amount: 8
  },
  {
    name: 'hammer',
    indexItem: 3,
    amount: 5
  },
  {
    name: 'susi',
    indexItem: 4,
    amount: 29
  }
]

export default function Inventory({
  isOpenInventory,
  setIsOpenInventory,
}) {
  const [valueItemSelect, setValueItemSelect] = useState({})
  const [price, setPrice] = useState(0)
  const [amountItems, setAmountItems] = useState(0)
  const [isOpenNotify, setIsOpenNotify] = useState(false)
  

  const handleCloseModalInventory = useCallback(
    (e: any) => {
      if (e.target !== e.currentTarget) return
      setIsOpenInventory(false)
    },
    [isOpenInventory]
  )

  return (
    <InventoryCSS>
      <div
        onClick={(e) => {
            handleCloseModalInventory(e)
        }}
        className="modal-inventory"
      >
        <div className="modal-content">
          {isOpenNotify ? <div className='main'>
            <div className='container-notify'>
              <div className='notify-header'>SUCCESS</div>
              <div className='notify-body-1'>Your Order has been Completed !</div>
              <div className='notify-body-2'>Check Your Inventory For Bought Items !</div>
              <img
                onClick={() => {setIsOpenNotify(false)}}
                className='notify-confirm click-cursor' 
                src="/images/inventory/confirm-notify.png" 
                alt="img" 
              />
            </div>
          </div> : <div className="main">
            <div className="container">
              <div className="container-body">
                <img 
                  className='container-close click-cursor' 
                  src="/images/inventory/close.png" 
                  alt="img"
                  onClick={() => {setIsOpenInventory(false)}}
                />
                <div className="container-items">
                  {[...itemsIndex, ...Array(16 - itemsIndex.length)].map((value) => {
                    if (value) {
                      return <div key={value.indexItem} className="container-item click-cursor">
                          <img onClick={() => {setValueItemSelect(value), setAmountItems(0)}} src={`/images/inventory/items/${value.indexItem}.png`} alt="img" />
                        <div>{value.amount}</div>
                      </div>
                    } else {
                      return <div key={value} className="container-item">
                      </div>
                    }
                  })}
                </div>
              </div>
            </div>
            <div className='container-2'>
              <div className='container-2-body'>
                <div className='container-2-header'>Selected Item</div>
                <div className='container-2-selected-item'>
                  {valueItemSelect?.indexItem ? <div><img src={`/images/inventory/items/${valueItemSelect.indexItem}.png`} alt="img" /></div> : <></>}
                </div>
                <div className='container-2-price-input'>
                  <div>Price:</div>
                  <input type="number" value={price} onChange={(e) => {setPrice(Number(e.target.value))}} />
                  <div>OPEN</div>
                </div>
                <div className='container-2-selling-amout'>
                  <div>Selling Amount</div>
                  <input type="number" value={amountItems} onChange={(e) => {setAmountItems(Number(e.target.value))}} />
                  <div>
                    <div>
                      <div onClick={() => {amountItems < valueItemSelect?.amount && setAmountItems(amountItemsPrev => amountItemsPrev + 1)}} className='click-cursor'>+</div>
                      <div onClick={() => {amountItems > 0 && setAmountItems(amountItemsPrev => amountItemsPrev - 1)}} className='click-cursor'>-</div>
                    </div>
                    <div onClick={() => {setAmountItems(valueItemSelect.amount)}} className='click-cursor'>ALL</div>
                  </div>
                </div>
                <div className='container-2-btn-confirm click-cursor'>
                  <img onClick={() => {setIsOpenNotify(true)}} src="/images/inventory/confirm-seller-board.png" alt="img" />
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </InventoryCSS>
  )
}

const InventoryCSS = styled.div({
  '.modal-inventory': {
    position: 'fixed',
    zIndex: 1,
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
          maxHeight: '600px',
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
          '.notify-body-1, .notify-body-2': {
            marginTop: '50px',
            fontSize: '25px'
          },
          '.notify-confirm': {
            marginTop: '80px'
          }
        },
        '.container': {
          display: 'flex',
          justifyContent: 'center',
          '.container-body': {
            backgroundImage: 'url(/images/inventory/frame.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            maxWidth: '450px',
            height: '700px',
            padding: '165px 30px 65px 35px',
            position: 'relative',
            '.container-close': {
              position: 'absolute',
              top: '45px',
              right: '30px'
            },
            '.container-items': {
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              overflow: 'auto',
              height: '100%',
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
                  height: '50px'
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
                  alignItems: 'center'
                }
              }
            }
          },
        },
        '.container-2': {
          '@media(min-width: 950px)': {
            marginLeft: '50px',
          },
          flex: 1,
          maxWidth: '750px',
          minWidth: '450px',
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
              fontSize: '30px'
            },
            '.container-2-selected-item': {
              backgroundImage: 'url(/images/inventory/selected-item.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              width: '120px',
              height: '120px',
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
                }
              }
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
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#261106',
                padding: '0 10px',
                borderRadius: '5px',
                borderLeft: '2px solid #B9AE7B',
                borderRight: '2px solid #B9AE7B',
                width: '170px',
                outline: 'none',
                textAlign: 'center'
              },
              '> div:last-child': {
                position: 'absolute',
                right: '-70px',
                fontSize: '22px'
              }
            },
            '.container-2-selling-amout': {
              display: 'flex',
              alignItems: 'center',
              marginTop: '80px',
              position: 'relative',
              '> div:first-child': {
                position: 'absolute',
                left: '-130px',
                fontSize: '18px'
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
                textAlign: 'center'
              },
              '> div:last-child': {
                position: 'absolute',
                right: '-115px',
                fontSize: '22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '> div:first-child': {
                  display: 'flex',
                  fontSize: '50px',
                  lineHeight: '24px',
                  div: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '2px solid #B9AE7B',
                    marginLeft: '20px',
                  }
                },
                '> div:last-child': {
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '2px solid #B9AE7B',
                  marginLeft: '20px',
                  fontSize: '18px',
                  lineHeight: '35px'
                }
              }
            },
            '.container-2-btn-confirm': {
              marginTop: '50px'
            }
          }
        }
      },
    },
  },
})
