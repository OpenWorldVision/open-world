import { useState, useEffect, useCallback, useRef } from 'react'
import styled from '@emotion/styled'
import UserInfo from '@components/worldmap/UserInfo'
import CreateProfile from '@components/worldmap/CreateProfile'
import { getProfile, getStamina } from 'utils/profileContract'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenBalance, setProfile } from 'reduxActions/profileAction'
import Inventory, { InventoryRef } from '../professions/Inventory'
import ProfessionsTutorial from '@components/professions/ProfessionsTutorial'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import RefillStaminaModal from './RefillStaminaModal'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { getOpenBalance } from 'utils/checkBalanceOpen'

type UserDetailsProps = {
  profile: any
  balance: number
  career: string
  staminaPoint: number
  onClickProfile: () => void
  onOpenInventory: () => void
}

function UserDetails(props: UserDetailsProps) {
  const { profile, balance, career, staminaPoint, onClickProfile, onOpenInventory } = props
  const { onToggle } = useDisclosure()

  return (
    <div className="user-info">
      <div>{profile?._name}</div>
      <ul>
        <Wrap>
          <WrapItem>
            <img
              src="/favicon.ico"
              alt="img"
              width={25}
              height={25}
            />
          </WrapItem>
          <WrapItem alignItems="center">
            <Text> {balance} OPEN</Text>
          </WrapItem>
        </Wrap>
        {/* Career : Openian or Supplier or BlackSmith */}
        <Text>Career: {career}</Text>
        <Wrap>
          <WrapItem>
            <img
              src="/images/icons/inventory.png"
              alt="img"
              width={20}
              height={20}
            />
          </WrapItem>
          <WrapItem>
            <Text
              className="click-cursor"
              onClick={onOpenInventory}
            >
              Inventory
            </Text>
          </WrapItem>
        </Wrap>

        <Wrap
          alignItems="center"
          justifyContent="center"
          borderTop="none"
        >
          <WrapItem alignItems="center">
            <img
              src="/images/icons/stamina-point.png"
              alt="img"
              width={15}
              height={15}
            />
          </WrapItem>
          <WrapItem>
            <Text>Stamina Point</Text>
          </WrapItem>

          <WrapItem alignItems="center">
            <Text fontWeight={500}>{staminaPoint}/100</Text>
          </WrapItem>
          <WrapItem>
            <Button
              onClick={onToggle}
              size="xs"
              colorScheme="yellow"
              leftIcon={<PlusSquareIcon />}
              variant="solid"
              disabled={staminaPoint === 100}
            >
              Recover
            </Button>
          </WrapItem>
        </Wrap>
      </ul>
      <Button
        cursor={'url(/images/worldmap/click-cursor.png)'}
        onClick={onClickProfile}
        className="btn-profile click-cursor"
        colorScheme="yellow"
        bgColor="#E8BE8A"
      >
        Profile
      </Button>
    </div>
  )
}

export default function User() {
  const [balance, setBalance] = useState(null)

  const { isOpen, onToggle } = useDisclosure()
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false)
  const [isOpenCreateProfile, setIsOpenCreateProfile] = useState(false)
  const [isOpenTutorial, setIsOpenTutorial] = useState(false)
  const [career, setCareer] = useState('None')
  const profile = useSelector((state: any) => state.ProfileStore.profile)
  const [staminaPoint, setStaminaPoint] = useState(0)
  const [loading, setLoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const inventoryRef = useRef<InventoryRef>()

  const dispatch = useDispatch()

  const getDataProfile = useCallback(async () => {
    setLoading(true)
    const _profile = await getProfile()
    dispatch(setProfile({ profile: _profile }))
    setLoading(false)
    switch (_profile?._profession) {
      case '1':
        setCareer('Openian')
        break
      case '2':
        setCareer('Supplier')
        break
      case '3':
        setCareer('Blacksmith')
        break
      default:
        setCareer('None')
        break
    }
  }, [dispatch])

  const getBalance = useCallback(async () => {
    const balance = await getOpenBalance(true)
    dispatch(setOpenBalance(balance))
    setBalance(balance)
  }, [dispatch])

  const handleGetStamina = useCallback(async () => {
    const stamina = await getStamina()
    if (stamina) {
      setStaminaPoint(stamina)
    }
  }, [])

  const checkWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [window.innerWidth])

  useEffect(() => {
    getDataProfile()
    handleGetStamina()
    getBalance()
    const getBalanceInterval = setInterval(getBalance, 60000)
    checkWindowWidth()
    window.addEventListener('resize', checkWindowWidth)

    return () => {
      clearInterval(getBalanceInterval)
      window.removeEventListener('resize', checkWindowWidth)
    }
  }, [])
  const handleOpenTutorial = useCallback(() => {
    setIsOpenTutorial(true)
  }, [])

  const handleClickProfile = useCallback(() => {
    setIsOpenUserInfo(true)
  }, [])

  const handleOpenInventory = () => {
    inventoryRef.current?.open()
  }

  if (loading) {
    return null
  }

  return (
    <UserCSS>
      <div className="user-wrap">
        {windowWidth > 1024 ? (
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                _hover={{
                  backgroundColor: 'transparent',
                }}
                _focus={{
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
                _active={{
                  backgroundColor: 'transparent',
                }}
                bgColor="transparent"
                border="none"
                outline="transparent"
                className="click-cursor"
                margin="auto"
              >
                <img
                  src={`/images/profile/hero/${
                    profile?._picId && profile?._picId < 14
                      ? profile?._picId
                      : 'none'
                  }.webp`}
                  alt="img"
                  width={77}
                  height={77}
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              border="none"
              _focus={{ boxShadow: 'none' }}
              width={220}
            >
              <UserDetails
                profile={profile}
                balance={balance}
                career={career}
                staminaPoint={staminaPoint}
                onClickProfile={handleClickProfile}
                onOpenInventory={handleOpenInventory}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <div className="user-infomation">
            <div className="user-group">
              <Popover>
                <PopoverTrigger>
                  <div className="user-avatar">
                    <Button
                      _hover={{
                        backgroundColor: 'transparent',
                      }}
                      _focus={{
                        border: 'none',
                        backgroundColor: 'transparent',
                      }}
                      _active={{
                        backgroundColor: 'transparent',
                      }}
                      bgColor="transparent"
                      border="none"
                      outline="transparent"
                      className="click-cursor"
                      margin="auto"
                    >
                      <img
                        src={`/images/profile/hero/${
                          profile?._picId && profile?._picId < 14
                            ? profile?._picId
                            : 'none'
                        }.webp`}
                        alt="img"
                        width={77}
                        height={77}
                      />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  border="none"
                  _focus={{ boxShadow: 'none' }}
                  width={220}
                >
                  <UserDetails
                    profile={profile}
                    balance={balance}
                    career={career}
                    staminaPoint={staminaPoint}
                    onClickProfile={handleClickProfile}
                    onOpenInventory={handleOpenInventory}
                  />
                </PopoverContent>
              </Popover>

              <Text className="user-displayName">{profile?._name}</Text>
              <Text className="user-career">{career}</Text>
            </div>
            <div className="user-group">
              <div className="user-balance">
                <div>{balance}</div>
                <img
                  src="images/profile/OPEN-coin.webp"
                  className="openCoint-icon"
                ></img>
                <a
                  className='buy-OPEN-link'
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://pancakeswap.finance/swap?outputCurrency=0x27a339d9B59b21390d7209b78a839868E319301B"
                >
                  <span>+</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <UserInfo
          setIsOpenUserInfo={setIsOpenUserInfo}
          isOpenUserInfo={isOpenUserInfo}
          setIsOpenCreateProfile={setIsOpenCreateProfile}
          profile={profile}
          balance={balance}
        />

        {(!profile || isOpenCreateProfile) && !isOpenTutorial && (
          <CreateProfile
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            getDataProfile={getDataProfile}
            handleOpenTutorial={handleOpenTutorial}
            isEdit={isOpenCreateProfile}
            profile={profile}
          />
        )}

        <Inventory ref={inventoryRef} />

        <ProfessionsTutorial
          onClose={() => setIsOpenTutorial(false)}
          isOpenTutorial={isOpenTutorial}
        />
        <RefillStaminaModal
          isOpen={isOpen}
          onToggle={onToggle}
          onSuccess={handleGetStamina}
        />
      </div>
    </UserCSS>
  )
}

const UserCSS = styled.div({
  '.user-wrap': {
    position: 'fixed',
    top: '30px',
    left: '50px',
    zIndex: '999998',
    width: '200px',
    '@media(max-width: 720px)': {
      top: '10px',
      left: '10px',
      width: '100px',
    },
    '> button': {
      height: '110px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(/images/worldmap/Frame.webp)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      padding: '10px',
      img: {
        width: '76px',
        height: '76px',
        borderRadius: '50%',
      },
      '@media(max-width: 720px)': {
        height: '82px',
        img: {
          width: '52px',
          height: '52px',
          borderRadius: '50%',
        },
      },
    },
    '.user-info': {
      backgroundImage: 'url(/images/profile/frame.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundColor: 'rgb(0,0,0,.8)',
      fontSize: '14px',
      color: 'white',
      padding: '35px 20px 10px 20px',
      zIndex: '-1',
      '> div': {
        fontSize: '20px',
        textAlign: 'center',
        backgroundImage: 'url(/images/profile/frame.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        marginTop: '10px',
      },
      ul: {
        padding: '14px 0',
        '@media(max-width: 720px)': {
          padding: '2px',
        },
        li: {
          listStyle: 'none',
          'div:last-child': {
            fontSize: '20px',
          },
        },
        ':last-child': {
          '@media(max-width: 720px)': {
            fontSize: '14px',
          },
        },
      },
      '.btn-profile': {
        width: '100%',
        border: '1px solid #fbeb74',
        height: '40px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '6px',
        ':hover': {
          backgroundColor: '#fbeb74',
          color: 'black',
        },
        ':focus': {
          border: 'none',
          outline: 'none',
        },
        ':active': {
          border: 'none',
          outline: 'none',
        },
      },
    },

    '@media(max-width: 1024px)': {
      position: 'unset',
      width: '100%',
      '.user-infomation': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '.user-group': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        '.user-displayName': {
          paddingRight: '8px',
          paddingLeft: '24px',
          fontSize: '18px',
          fontWeight: '600',
          display: 'none',
        },
        '.user-career': {
          padding: '10px',
          backgroundColor: '#D1D1D1',
          borderRadius: '6px',
          fontWeight: '700',
          display: 'none',
        },
        '.user-avatar > button': {
          width: 'fit-content',
          height: 'fit-content',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #646464',
          backgroundColor: '#fff',
          padding: '3.4px',
          img: {
            border: '3px solid #646464',
            width: '54.19px',
            height: '54.19px',
            borderRadius: '50%',
          },
        },
        '.user-balance': {
          position: 'relative',
          '> div': {
            padding: '2px 45px 2px 35px',
            fontWeight: '500',
            fontSize: '13px',
            backgroundColor: '#B4A787',
            textAlign: 'center',
            border: '1px solid #634A2E',
            borderRadius: '15px',
            color: '#412300',
          },
          '.openCoint-icon': {
            position: 'absolute',
            right: '0',
            top: '-4px',
            width: '32px',
            height: '32px',
          },
          '.buy-OPEN-link': {
            bottom: '-2px',
            right: '17px',
            borderRadius: '2px',
            display: 'block',
            backgroundColor: '#FF4A4A',
            width: '16px',
            height: '16px',
            position: 'absolute',
            transform: 'rotate(45deg)',
            '> span': {
              position: 'absolute',
              top: 0,
              left: 0,
              lineHeight: '12px',
              transform: 'rotate(-45deg)',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              color: '#fff',
              fontWeight: '700',
            },
          }
        },
      },
    },
  },
})
