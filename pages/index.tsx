import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'
import { VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { MapInteractionCSS } from 'react-map-interaction'
import { keyframes } from '@emotion/react'
import Link from 'next/link'
import { useState } from 'react'
import { truncateSync } from 'fs'

const valueDefaultInitial = {
  scale: 1.2,
  translation: {
    x: -510,
    y: -2650
  },
}

export default function Home({ allPostsData }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false)
  const [isOpenUserDetail, setIsOpenUserDetail] = useState(false)
  const [isOpenSearchOption, setIsOpenSearchOption] = useState(true)
  const handleCloseModalUserInfo = (e: any) => {
    if(e.target !== e.currentTarget) return
    setIsOpenUserInfo(false)
  }
  const handleCloseModalUserDetail = (e: any) => {
    if(e.target !== e.currentTarget) return
    setIsOpenUserDetail(false)
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <VStack>
        <WorldMap>
          <MapInteractionCSS
            defaultValue={valueDefaultInitial}
            minScale={0.6} maxScale={1.3}
          >
            <div className='containerWorldMap'>
              <img className='world_map' src='/images/WorldMapXmasPro.png' alt='img' />
              <div className='castle' onClick={() => { console.log('nam') }}>
                <img src='/images/Castle.png' alt='img' />
                <button></button>
              </div>
              <div className='portal' onClick={() => { console.log('nam') }}>
                <img src='/images/Portal.png' alt='img' />
                <button></button>
              </div>
              <div className='marketplace' onClick={() => { console.log('nam') }}>
                <img src='/images/Marketplace.png' alt='img' />
                <button></button>
              </div>
              <div className='docks' onClick={() => { console.log('nam') }}>
                <img src='/images/Docks.png' alt='img' />
                <button></button>
              </div>
              <div className='professions' onClick={() => { console.log('nam') }}>
                <img src='/images/Professions.png' alt='img' />
                <button></button>
              </div>
              <div className='gardens' onClick={() => { console.log('nam') }}>
                <img src='/images/Gardens.png' alt='img' />
                <button></button>
              </div>
              <div className='tavern' onClick={() => { console.log('nam') }}>
                <img src='/images/Tavern.png' alt='img' />
                <button></button>
              </div>
              <div className='jeweler' onClick={() => { console.log('nam') }}>
                <img src='/images/Jeweler.png' alt='img' />
                <button></button>
              </div>
              <div className='alchemist' onClick={() => { console.log('nam') }}>
                <img src='/images/Alchemist.png' alt='img' />
                <button></button>
              </div>
              <div className='meditation_circle' onClick={() => { console.log('nam') }}>
                <img src='/images/MeditationCircle.png' alt='img' />
                <button></button>
              </div>
            </div>
          </MapInteractionCSS>
          <div className='menu'>
            <button onClick={() => { setIsOpenMenu(!isOpenMenu) }}>
              <img src='/images/Menu.png' alt='img' />
              <div>Menu</div>
            </button>
            {isOpenMenu && (
              <ul>
                <li>
                  <div>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                      <path d='M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z' />
                    </svg>
                  </div>
                  <Link href='/'>Map</Link>
                </li>
                <li>
                  <Link href='/alchemist'>Alchemist</Link>
                </li>
                <li>
                  <Link href='/castle'>Castle</Link>
                </li>
                <li>
                  <Link href='/docks'>Docks</Link>
                </li>
                <li>
                  <Link href='/gardens'>Gardens</Link>
                </li>
                <li>
                  <Link href='/jeweler'>Jeweler</Link>
                </li>
                <li>
                  <Link href='/marketplace'>Marketplace</Link>
                </li>
                <li>
                  <Link href='/meditation-circle'>Meditation Circle</Link>
                </li>
                <li>
                  <Link href='/portal'>Portal</Link>
                </li>
                <li>
                  <Link href='/professions'>Professions</Link>
                </li>
                <li>
                  <Link href='/tavern'>Tavern</Link>
                </li>
                <li>
                  <Link href='/about'>About +</Link>
                </li>
              </ul>
            )}
          </div>
          <div className='user-avatar'>
            <button css={isOpenAvatar && {
              left: '55px',
              '@media(max-width: 720px)': {
                left: 0
              }
            }}>
              <img src='/images/Frame.png' alt='img' />
              <img onClick={() => { setIsOpenUserInfo(true) }} src='/images/Avatar.png' alt='img' />
              <button onClick={() => { setIsOpenAvatar(!isOpenAvatar) }}>
                {isOpenAvatar ?
                  <>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                      <path d='M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z' />
                    </svg>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                      <path d='M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z' />
                    </svg>
                  </> :
                  <>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                      <path d='M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z' />
                    </svg>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                      <path d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z' />
                    </svg>
                  </>
                }
              </button>
            </button>
            {isOpenAvatar && (
              <div className='user-info'>
                <div>Ngo Thanh Nam</div>
                <ul>
                  <li>0.00 JEWEL</li>
                  <li>0 Gold</li>
                  <li>Inventory</li>
                </ul>
                <ul>
                  <li>
                    <div>Locked Balance:</div>
                    <div>0.00</div>
                  </li>
                  <li>
                    <div>Total Balance:</div>
                    <div>0.00</div>
                  </li>
                </ul>
              </div>
            )}
            {isOpenUserInfo && 
              <div onClick={(e) => {handleCloseModalUserInfo(e)}} className='modal-user-info'>
                <div className='modal-content-user-info'>
                  <div className='modal-content-user-info-header'>
                    <button onClick={() => {setIsOpenUserInfo(false)}}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                        <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'/>
                      </svg>
                    </button>
                    <div>
                      Your JEWEL & Hero Breakdown
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                        <path d='M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z' />
                      </svg>
                    </div>
                  </div>
                  <div className='modal-content-user-info-body'>
                    <div>
                      <button onClick={(e) => {setIsOpenUserDetail(true)}}>MY HEROES</button>
                    </div>
                    <div>
                      <img src='/images/Hope2.png' alt='img' />
                      0.00
                    </div>
                    <div>
                      <div>
                        <div>Balance:</div>
                        <div>0.00</div>
                      </div>
                      <div>
                        <div>Pending Rewards:</div>
                        <div>0.00</div>
                      </div>
                      <div>
                        <div>Pending Locked Rewards:</div>
                        <div>0.00</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>Locked Balance:</div>
                        <div>0.00</div>
                      </div>
                      <div>
                        <div>Total Balance:</div>
                        <div>0.00</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>JEWEL in circulation:</div>
                        <div>76,698,795</div>
                      </div>
                      <div>
                        <div>JEWEL total supply:</div>
                        <div>353,410,348</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>JEWEL price:</div>
                        <div>$9.8635</div>
                      </div>
                      <div>
                        <div>JEWEL circ. market cap:</div>
                        <div>$756,180,680</div>
                      </div>
                      <div>
                        <div>JEWEL total market cap:</div>
                        <div>$3,484,456,825</div>
                      </div>
                    </div>
                    <div>
                      <div>Account Details</div>
                      <button>0x63BB...2461</button>
                    </div>
                  </div>
                  {isOpenUserDetail && 
                  <div onClick={(e) => {handleCloseModalUserDetail(e)}} className='modal-user-detail'>
                    <div className='modal-content-user-detail'>
                      <div>
                        Your Heroes
                        <button onClick={() => {setIsOpenUserDetail(false)}}>
                          <svg  xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                            <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'/>
                          </svg>
                        </button>
                      </div>
                      <div>
                        {isOpenSearchOption 
                        ? <div>
                            <div>
                              <div>Filter</div>
                              <button>
                                <svg onClick={() => {setIsOpenSearchOption(!isOpenSearchOption)}} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                                  <path d='M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z'/>
                                </svg>
                              </button>
                            </div>
                            <div>
                              <div>
                                <div>
                                  <div className='select'>
                                    <button>BASICS</button>
                                  </div>
                                  <div>
                                    <button>ATTRIBUTES</button>
                                  </div>
                                  <div>
                                    <button>STATS</button>
                                  </div>
                                </div>
                                <div>
                                  <button>APPLY</button>
                                  <button>RESET</button>
                                </div>
                              </div>
                              <div>
                                <input type="text" placeholder='Search by Hero ID' />
                                <div>
                                  <div>Status</div>
                                  <div>
                                    <div>
                                      <input type="checkbox" />
                                      All
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      For Sale
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      For Hire
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      On A Quest
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>Gender</div>
                                  <div>
                                    <div>
                                      <input type="checkbox" />
                                      All
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Male
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Female
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>Skiny</div>
                                  <div>
                                    <div>
                                      <input type="checkbox" />
                                      All
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Yes
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      No
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>Class</div>
                                  <div>
                                    <div>
                                      <input type="checkbox" />
                                      All
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Archer
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Darkknight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Dragoon
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Dreadknight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Knight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Monk
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Ninja
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Paladin
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Pirate
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Priest
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Sage
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Summoner
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Thief
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Warrior
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Wizard
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>Sub Class</div>
                                  <div>
                                    <div>
                                      <input type="checkbox" />
                                      All
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Archer
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Darkknight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Dragoon
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Dreadknight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Knight
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Monk
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Ninja
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Paladin
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Pirate
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Priest
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Sage
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Summoner
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Thief
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Warrior
                                    </div>
                                    <div>
                                      <input type="checkbox" />
                                      Wizard
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div>Summons Remainning</div>
                                  <input type="range" name="quantity" min="0" max="10"></input>
                                </div>
                                <div>
                                  <div>Rarity</div>
                                  <input type="range" name="quantity" min="0" max="4"></input>
                                </div>
                                <div>
                                  <div>Generation</div>
                                  <input type="range" name="quantity" min="0" max="11"></input>
                                </div>
                                <div>
                                  <div>Level</div>
                                  <input type="range" name="quantity" min="0" max="100"></input>
                                </div>
                              </div>
                            </div>
                          </div>
                          : <button onClick={() => {setIsOpenSearchOption(!isOpenSearchOption)}}>
                            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                              <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
                            </svg>
                          </button>
                        }
                        
                        <div>
                          <div>
                            <div>
                              <div>Showing 0 Heroes</div>
                              <div>
                                <div>
                                  <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                      <path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/>
                                    </svg>
                                  </button>
                                  Refresh
                                </div>
                                <div>
                                  <input type="checkbox" />
                                  Animations
                                </div>
                                <div>
                                  <input type="checkbox" />
                                  Flip All
                                </div>
                              </div>
                            </div>
                            <div>
                              <div>Sort by:</div>
                              <select>
                                <option value="level">Gen</option>
                                <option value="level">Rarity</option>
                                <option value="level">Level</option>
                                <option value="level">Cooldown</option>
                                <option value="level">ID</option>
                                <option value="level">Stamina</option>
                                <option value="level">Summons</option>
                                <option value="level">Total XP</option>
                              </select>
                              <select>
                                <option value="level">Ascending</option>
                                <option value="level">Descending</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <div>No heroes match the currently selected criteria</div>
                            <div>Don't see your heroes? Use Xfinity internet? Click below to whitelist the API.</div>
                            <div>(This will open another page, and then display an error message; Not to worry! That's expected behaviour.)</div>
                            <button>WHITELIST DFK API</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                </div>
              </div>
            }
          </div>
        </WorldMap>
      </VStack>
    </Layout >
  )
}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData()
  const allPostsData = []
  return {
    props: {
      allPostsData,
    },
  }
}


const wordMap_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-40960px, 0);
  }
`;
const items_kf = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, -12px);
  }
`;
const WorldMap = styled.div({
  backgroundColor: 'rgb(148,151,168)',
  cursor: 'url(/images/CursorDefault.png), auto',
  'button, input, select': {
    cursor: 'url(/images/SelectCursor.png), auto',
  },
  '.containerWorldMap': {
    cursor: 'url(/images/CursorDefault.png), auto',
    width: '5120px',
    height: '5120px',
    overflow: 'hidden',
    position: 'relative',
    '.castle, .portal, .marketplace, .docks, .professions, .gardens, .tavern, .jeweler, .alchemist': {
      cursor: 'url(/images/SelectCursor.png), auto',
    },
    '.world_map': {
      position: 'absolute',
      minWidth: '40960px',
      height: '5120px',
      animation: `${wordMap_kf} 1.2s steps(8) 0s infinite normal none running`,
    },
    '.castle': {
      position: 'absolute',
      left: '2500px',
      top: '2125px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '124px',
        height: '45px',
      },
      button: {
        position: 'absolute',
        left: '-92px',
        top: '64px',
        width: '302px',
        height: '215px'
      }
    },
    '.portal': {
      position: 'absolute',
      left: '2168px',
      top: '2390px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '121px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0px',
        top: '50px',
        width: '114px',
        height: '90px'
      }
    },
    '.marketplace': {
      position: 'absolute',
      left: '2470px',
      top: '2492px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '178px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '29px',
        top: '60px',
        width: '122px',
        height: '124px'
      }
    },
    '.docks': {
      position: 'absolute',
      left: '2140px',
      top: '2626px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '128px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '-90px',
        top: '94px',
        width: '240px',
        height: '170px'
      }
    },
    '.professions': {
      position: 'absolute',
      left: '2290px',
      top: '2828px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '172px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0',
        top: '32px',
        width: '170px',
        height: '127px'
      }
    },
    '.gardens': {
      position: 'absolute',
      left: '2740px',
      top: '2380px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '148px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '50px',
        width: '110px',
        height: '100px'
      }
    },
    '.tavern': {
      position: 'absolute',
      left: '2350px',
      top: '2582px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '130px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '10px',
        top: '30px',
        width: '115px',
        height: '96px'
      }
    },
    '.jeweler': {
      position: 'absolute',
      left: '2708px',
      top: '2618px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '142px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '0',
        top: '30px',
        width: '115px',
        height: '96px'
      }
    },
    '.alchemist': {
      position: 'absolute',
      left: '2795px',
      top: '2558px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '160px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '44px',
        width: '90px',
        height: '88px'
      }
    },
    '.meditation_circle': {
      position: 'absolute',
      left: '2822px',
      top: '2805px',
      img: {
        animation: `${items_kf} 1.8s linear 0s infinite alternate none running`,
        width: '220px',
        height: '45px'
      },
      button: {
        position: 'absolute',
        left: '28px',
        top: '44px',
        width: '220px',
        height: '88px'
      }
    },
  },
  '.menu': {
    position: 'fixed',
    top: '30px',
    right: '30px',
    '@media(max-width: 720px)': {
      top: '10px',
      right: '10px'
    },
    button: {
      width: '90px',
      height: '90px',
      '@media(max-width: 720px)': {
        width: '55px',
        height: '55px',
      },
      backgroundImage: 'linear-gradient(to right, rgba(1,1,1, 0.6) , rgb(1,1,1))',
      ':hover': {
        backgroundImage: 'linear-gradient(to right, rgba(1,1,1, 0.6) , rgba(135,81,20, 0.8))',
      },
      img: {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        'min-width': '106%',
        'min-height': '106%',
      },
      div: {
        position: 'absolute',
        width: '100%',
        top: '64px',
        color: 'rgb(247,183,95)',
        fontSize: '15px',
        '@media(max-width: 720px)': {
          fontSize: '12px',
          top: '34px',
        },
      }
    },
    ul: {
      position: 'absolute',
      top: '92px',
      right: 0,
      width: '160px',
      listStyle: 'none',
      backgroundImage: 'linear-gradient(to right, rgba(1,1,1, 0.6) , rgb(1,1,1))',
      color: 'white',
      '@media(max-width: 720px)': {
        top: '56px',
      },
      li: {
        padding: '4px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        fontSize: '15px',
        a: {
          width: '80%',
          textDecoration: 'none',
        },
        ':nth-of-type(2)': {
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        },
        ':last-child': {
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        },
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        div: {
          width: '20%',
          svg: {
            width: '18px',
            height: '18px',
            fill: 'white',
            margin: 'auto'
          }
        }
      }
    },
  },
  '.user-avatar': {
    position: 'fixed',
    top: '30px',
    left: '30px',
    '> button': {
      width: '90px',
      height: '90px',
      position: 'relative',
      'img:first-of-type': {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        'min-width': '106%',
        'min-height': '106%',
      },
      'img:nth-of-type(2)': {
        position: 'absolute',
        width: '88%',
        top: '8px',
        left: '6px',
        color: 'rgb(247,183,95)',
        fontSize: '15px',
      },
      button: {
        position: 'absolute',
        top: '97px',
        left: '20px',
        width: '52px',
        height: '15px',
        backgroundColor: 'rgba(78,70,38,0.8)',
        borderRadius: '0 0 5px 5px',
        border: '1px solid rgb(189,152,72)',
        borderTop: 'none',
        '@media(max-width: 720px)': {
          top: '20px',
          left: '93px',
          width: '15px',
          height: '52px',
          borderRadius: '0 5px 5px 0',
          border: '1px solid rgb(189,152,72)',
          borderLeft: 'none',
        },
        svg: {
          width: '10px',
          height: '10px',
          fill: 'rgb(189,152,72)',
          margin: 'auto',
          ':first-of-type': {
            '@media(max-width: 720px)': {
              display: 'none',
            },
          },
          ':last-child': {
            display: 'none',
            '@media(max-width: 720px)': {
              display: 'block',
            },
          }
        },
        ':hover': {
          backgroundColor: 'rgb(78,70,38)',
        }
      }
    },
    '.user-info': {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '200px',
      backgroundImage: 'linear-gradient(to right, rgb(1,1,1), rgba(1,1,1, 0.6))',
      fontSize: '14px',
      color: 'white',
      padding: '60px 20px 10px 20px',
      zIndex: '-1',
      '@media(max-width: 720px)': {
        width: '150px',
        padding: '4px 5px 4px 25px',
        top: 0,
        left: '93px',
        backgroundImage: 'linear-gradient(to right, rgba(1,1,1, 0.7), rgba(1,1,1, 0.7))',
        fontSize: '12px'
      },
      '> div': {
        fontSize: '20px',
        textAlign: 'center',
        '@media(max-width: 720px)': {
          fontSize: '14px',
        },
      },
      ul: {
        padding: '14px 0',
        '@media(max-width: 720px)': {
          padding: '2px',
        },
        li: {
          listStyle: 'none',
          'div:last-child': {
            fontSize: '20px'
          }
        },
        ':last-child': {
          borderTop: '2px solid rgba(255, 255, 255, 0.3)',
          '@media(max-width: 720px)': {
            display: 'none',
          },
        }
      }
    },
    '.modal-user-info': {
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
      color: 'white',
      overflowX: 'hidden',
      overflowY: 'hidden',
      padding: '0 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '.modal-content-user-info': {
        background: 'linear-gradient(to right bottom, rgb(46,46,46), rgb(0,0,0))',
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        padding: '8px',
        maxWidth: '430px',
        '.modal-content-user-info-header': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 80px',
          position: 'relative',
          borderBottom: '1px solid rgb(63,63,63)',
          '> button': {
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: 'fit-content',
            height: 'fit-content',
            svg: {
              fill: 'white',
              width: '25px',
              height: '25px',
            }
          },
          div: {
            position: 'relative',
            svg: {
              width: '25px',
              height: '25px',
              position: 'absolute',
              top: '0',
              left: '-50px',
              fill: 'white',
            }
          }
        },
        '.modal-content-user-info-body': {
          height: '100%',
          '@media(max-width: 720px)': {
            height: '100%',
          },
          overflowY: 'auto',
          '::-webkit-scrollbar': {
            width: '8px'
          },
          '::-webkit-scrollbar-track': {
            background: 'rgb(16,15,33)'
          },
          '::-webkit-scrollbar-thumb': {
            background: 'rgb(40,39,56)',
            borderRadius: '5px'
          },
          '> div:first-of-type': {
            padding: '20px',
            button: {
              backgroundColor: 'rgb(0,156,68)',
              borderRadius: '5px',
              width: '100%',
              height: '40px',
              fontSize: '14px',
              ':hover': {
                backgroundColor: 'rgb(251, 235, 116)',
                color: 'black'
              }
            }
          },
          '> div:nth-of-type(2)': {
            padding: '30px',
            paddingBottom: '0',
            textAlign: 'center',
            fontSize: '50px',
            fontWeight: '600',
            img: {
              margin: 'auto',
              width: '50px',
              height: '50px',
              fontSize: '14px'
            }
          },
          '> div:nth-of-type(3), > div:nth-of-type(4), > div:nth-of-type(5), > div:nth-of-type(6)': {
            padding: '8px 20px',
            borderBottom: '1px solid rgb(55,55,55)',
            '> div': {
              display: 'flex',
              justifyContent: 'space-between',
              margin: '10px 0',
            }
          },
          '> div:nth-of-type(7)': {
            padding: '8px 20px',
            paddingBottom: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            div: {
              margin: '10px 0',
            },
            button: {
              width: '100%',
              backgroundColor: 'rgb(44,47,54)',
              height: '50px',
              borderRadius: '10px',
              border: '1px solid rgb(64,68,79)',
              marginTop: '20px',
              ':hover': {
                backgroundColor: 'rgb(251, 235, 116)',
                color: 'black'
              }
            }
          }
        },
        '.modal-user-detail': {
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'auto',
          svg: {
            width: '20px',
            height: '20px',
            fill: 'white'
          },
          overflowX: 'hidden',
          overflowY: 'hidden',
          '.modal-content-user-detail': {
            backgroundColor: 'rgb(0,0,0,0.9)',
            border: '1px solid rgb(76,62,35)',
            margin: '40px auto',
            width: '95%',
            height: '90%',
            padding: '10px 30px',
            fontSize: '16px',
            overflowY: 'auto',
            '> div:first-of-type': {
              textAlign: 'center',
              fontSize: '30px',
              position: 'relative',
              button: {
                position: 'absolute',
                top: '10px',
                right: '-10px',
                width: 'fit-content',
                height: 'fit-content',
                svg: {
                  width: '30px',
                  height: '30px'
                }
              }
            },
            '> div:last-child': {
              display: 'flex',
              flexWrap: 'wrap',
              '> button': {
                display: 'flex',
                svg: {
                  marginTop: '20px'
                }
              },
              '> div:first-of-type': {
                width: '300px',
                '@media(max-width: 960px)': {
                  width: 'unset'
                },
                border: '1px solid rgb(76,62,35)',
                '> div:first-of-type': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 15px',
                  borderBottom: '1px solid rgb(76,62,35)',
                  svg: {
                    width: '14px',
                    height: '14px',

                  }
                },
                '> div:last-child': {
                  '> div:first-of-type': {
                    '> div:first-of-type': {
                      display: 'flex',
                      div: {
                        padding: '5px 12px',
                        fontSize: '12px',
                        color: 'rgb(124,124,123)',
                        fontWeight: '700',
                        button: {
                          width: 'fit-content',
                          height: 'fit-content'
                        }
                      },
                      'div.select': {
                        color: 'rgb(20,194,90)',
                        borderBottom: '2px solid rgb(20,194,90)'
                      }
                    },
                    '> div:last-child': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      button: {
                        border: '1px solid rgb(250,192,93)',
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: '5px 45px',
                        borderRadius: '8px',
                        color: 'rgb(250,192,93)',
                        fontSize: '13px',
                        ':hover': {
                          backgroundColor: 'rgb(250,192,93)',
                          color: 'black'
                        }
                      }
                    }
                  },
                  '> div:last-child': {
                    padding: '15px 25px',
                    height: '650px',
                    overflowY: 'auto',
                    '::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '::-webkit-scrollbar-track': {
                      background: 'rgb(16,15,33)'
                    },
                    '::-webkit-scrollbar-thumb': {
                      background: 'rgb(40,39,56)',
                      borderRadius: '5px'
                    },
                    '> input': {
                      backgroundColor: 'transparent',
                      border: '1px solid rgb(64,64,63)',
                      borderRadius: '5px',
                      padding: '2px 5px',
                      width: '100%',
                      fontWeight: '500',
                      '::placeholder': {
                        color: 'rgb(124,124,123)'
                      },
                      ':hover': {
                        border: '1px solid rgb(255,255,255)',
                      }
                    },
                    '> div': {
                      marginTop: '20px',
                      '> div:first-of-type': {
                        color: 'rgb(124,124,123)',
                        fontWeight: '500',
                      },
                      '> div:last-child': {
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        '> div': {
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '14px',
                          width: '120px',
                          padding: '0 10px',
                          'input': {
                            marginRight: '8px',
                            width: '14px',
                            height: '14px',
                            border: '2px solid rgb(255,165,0)',
                            borderRadius: '3px',
                            accentColor: 'rgb(255,165,0)',
                            backgroundColor: 'transparent',
                            // filter: 'rgb(255,165,0)'
                          },
                        }
                      },
                      '> input': {
                        width: '100%',
                        '-webkit-appearance': 'none',
                        appearance: 'none',
                        height: '2px',
                        background: 'rgb(20,194,90)',
                        outline: 'none',
                        '::-webkit-slider-thumb': {
                          '-webkit-appearance': 'none',
                          appearance: 'none',
                          width: '15px',
                          height: '15px',
                          borderRadius: '50%',
                          background: 'rgb(20,194,90)',
                          cursor: 'pointer'
                        }
                      }
                    }
                  }
                },
              },
              '> div:last-child': {
                flex: 1,
                padding: '0 25px',
                '@media(max-width: 960px)': {
                  padding: 0
                },
                '> div:first-of-type': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  '@media(max-width: 960px)': {
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px',
                  },
                  '> div:first-of-type': {
                    '> div:first-of-type': {
                      textAlign: 'center'
                    },
                    '> div:last-child': {
                      display: 'flex',
                      '> div': {
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '20px',
                        svg: {
                          width: '18px',
                          height: '18px',
                          marginRight: '10px',
                        },
                        input: {
                          marginRight: '5px',
                        }
                      }
                    }
                  },
                  '> div:last-child': {
                    display: 'flex',
                    alignItems: 'center',
                    select: {
                      marginLeft: '10px',
                      backgroundColor: 'transparent',
                      borderBottom: '1px solid white',
                      option: {
                        backgroundColor: 'rgb(66,66,66)',
                        ':checked': {
                          backgroundColor: 'rgb(96,96,96)',
                        }
                      }
                    }
                  }
                },
                '> div:last-child': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '80px',
                  'div:nth-of-type(1)': {
                    marginBottom: '30px',
                    fontSize: '18px'
                  },
                  button: {
                    width: 'fit-content',
                    height: 'fit-content',
                    padding: '10px 50px',
                    fontSize: '14px',
                    backgroundColor: 'rgb(0,156,68)',
                    borderRadius: '5px',
                    marginTop: '50px',
                    ':hover': {
                      backgroundColor: 'rgb(251,235,116)',
                      color: 'black'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})
