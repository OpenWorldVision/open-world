import { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { fetchUserInventoryItemAmount } from 'utils/Item'
import { listMultiItems } from 'utils/Market'



export default function Inventory({
  isOpenInventory,
  setIsOpenInventory,
}) {
  const [valueItemSelect, setValueItemSelect] = useState(null)
  const [price, setPrice] = useState(null)
  const [amountItems, setAmountItems] = useState(null)
  const [isOpenNotify, setIsOpenNotify] = useState(null)
  const [items, setItems] = useState([])
  const [data, setData] = useState(null)
  
  useEffect(() => {
    getItemsIndex()
  }, [])

  async function getItemsIndex() {
    const itemsIndex = []
    const result = await fetchUserInventoryItemAmount()
    for (const i in result) {
      if(i === 'fishAmount' && result[i] > 0){
        itemsIndex.push({
          indexItem: 'fishAmount',
          amount: result[i]
        })
      } else if (i === 'oreAmount' && result[i] > 0) {
        itemsIndex.push({
          indexItem: 'oreAmount',
          amount: result[i]
        })
      } else if (i === 'hammerAmount' && result[i] > 0) {
        itemsIndex.push({
          indexItem: 'hammerAmount',
          amount: result[i]
        })
      } else if (i === 'sushiAmount' && result[i] > 0) {
        itemsIndex.push({
          indexItem: 'sushiAmount',
          amount: result[i]
        })
      }
    }
    setItems(itemsIndex)
    setData(result)
  }

  async function handleSelling() {
    setData(null)
    setValueItemSelect(null)
    let result = false
    if (valueItemSelect.indexItem === 'fishAmount') {
      result = await listMultiItems(data.fishItems.slice(0,Number(amountItems)), price)
    } else if (valueItemSelect.indexItem === 'oreAmount') {
      result = await listMultiItems(data.oreItems.slice(0,Number(amountItems)), price)
    } else if (valueItemSelect.indexItem === 'hammerAmount') {
      result = await listMultiItems(data.hammerItems.slice(0,Number(amountItems)), price)
    } else if (valueItemSelect.indexItem === 'sushiAmount') {
      result = await listMultiItems(data.sushiItems.slice(0,Number(amountItems)), price)
    }
    if (result) {
      getItemsIndex()
      setIsOpenNotify({ type: true })
    } else setIsOpenNotify({ type: false })
  }

  const handleCloseModalInventory = useCallback(
    (e: any) => {
      if (e.target !== e.currentTarget) return
      setIsOpenInventory(null)
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
              <div className='notify-header'>{isOpenNotify.type ? 'SUCCESS' : 'FAILED'}</div>
              <div className='notify-body'>{isOpenNotify.type ? 'Your Order has been Completed !' : 'Your Order has been Failed'}</div>
              <img
                onClick={() => {setIsOpenNotify(null)}}
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
                  {data ? [...items, ...Array(16 - items.length)].map((value) => {
                    if (value) {
                      return <div key={value.indexItem} className="container-item click-cursor">
                          <img onClick={() => {setValueItemSelect(value), setAmountItems('')}} src={`/images/inventory/items/${value.indexItem}.png`} alt="img" />
                        <div>{value.amount}</div>
                      </div>
                    } else {
                      return <div key={value} className="container-item" />
                    }
                  }): <div>Loading ...</div>}
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
                  <input type="number" value={price} onChange={(e) => {setPrice(e.target.value === '' ? '' : Number(e.target.value))}} />
                  <div>OPEN</div>
                </div>
                <div className='container-2-selling-amout'>
                  <div>Selling Amount</div>
                  <input type="number" value={amountItems} onChange={(e) => {setAmountItems(e.target.value === '' ? '' : (Number(e.target.value) < valueItemSelect?.amount ? Number(e.target.value) : valueItemSelect?.amount))}} />
                  <div className='container-2-selling-amout-caculation'>
                    <div onClick={() => {amountItems < valueItemSelect?.amount && setAmountItems(amountItemsPrev => Number(amountItemsPrev) + 1)}} className='click-cursor'>+</div>
                    <div onClick={() => {amountItems > 0 && setAmountItems(amountItemsPrev => Number(amountItemsPrev) - 1)}} className='click-cursor'>-</div>
                    <div onClick={() => {setAmountItems(valueItemSelect?.amount)}} className='click-cursor'>ALL</div>
                  </div>
                </div>
                <div className='container-2-total'>Total price: <span>{valueItemSelect ? amountItems*price : 0}</span> OPEN</div>
                {valueItemSelect && (price > 0) && (amountItems > 0) && 
                  <div className='container-2-btn-confirm click-cursor'>
                    <img onClick={() => {handleSelling()}} src="/images/inventory/confirm-seller-board.png" alt="img" />
                  </div>
                }
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
    zIndex: 10,
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
            fontSize: '25px'
          },
          '.notify-confirm': {
            marginTop: '80px'
          }
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
              right: '30px'
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
                left: '-60px'
              },
              '> input': {
                backgroundColor: '#261106',
                padding: '0 10px',
                borderRadius: '5px',
                borderLeft: '2px solid #B9AE7B',
                borderRight: '2px solid #B9AE7B',
                width: '170px',
                textAlign: 'center',
                outline: 'none'
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
                  top: '-30px'
                }
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
              '.container-2-selling-amout-caculation': {
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
                  }
                }
              }
            },
            '.container-2-total': {
              marginTop: '80px ',
              span: {
                fontSize: '30px',
                color: '#F1E994'
              }
            },
            '.container-2-btn-confirm': {
              marginTop: '20px'
            }
          }
        }
      },
    },
  },
})
