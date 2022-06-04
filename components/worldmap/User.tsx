import { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import UserInfo from '@components/worldmap/UserInfo'
import CreateProfile from '@components/worldmap/CreateProfile'
import { getProfile, getStamina } from 'utils/profileContract'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from 'reduxActions/profileAction'
import ProfessionsTutorial from '@components/professions/ProfessionsTutorial'
import Image from 'next/image'
import {
  Button,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
  Spinner,
} from '@chakra-ui/react'
import RefillStaminaModal from './RefillStaminaModal'
import { PlusSquareIcon } from '@chakra-ui/icons'

type Props = {
  balance: number
}

export default function User(props: Props) {
  const { balance } = props

  const { isOpen, onToggle } = useDisclosure()
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false)
  const [isOpenCreateProfile, setIsOpenCreateProfile] = useState(false)
  const [isOpenTutorial, setIsOpenTutorial] = useState(false)
  const [career, setCareer] = useState('None')
  const profile = useSelector((state: any) => state.ProfileStore.profile)
  const [staminaPoint, setStaminaPoint] = useState(0)

  const dispatch = useDispatch()

  const getDataProfile = useCallback(async () => {
    const _profile = await getProfile()
    dispatch(setProfile({ profile: _profile }))

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

  const handleGetStamina = useCallback(async () => {
    const stamina = await getStamina()
    if (stamina) {
      setStaminaPoint(stamina)
    }
  }, [])

  useEffect(() => {
    getDataProfile()
    handleGetStamina()
  }, [])

  const handleOpenTutorial = useCallback(() => {
    setIsOpenTutorial(true)
  }, [])

  const handleClickAvatar = useCallback(() => {
    setIsOpenAvatar((isOpenAvatarPrev) => !isOpenAvatarPrev)
  }, [])

  const handleClickProfile = useCallback(() => {
    setIsOpenUserInfo(true)
  }, [])

  return (
    <UserCSS>
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
          onClick={handleClickAvatar}
        >
          <img
            src={`/images/profile/hero/${
              profile?._picId && profile?._picId < 14 ? profile?._picId : 'none'
            }.webp`}
            alt="img"
            width={77}
            height={77}
          />
        </Button>
        {isOpenAvatar && (
          <div className="user-info">
            <div>{profile?._name}</div>
            <ul>
              <Wrap>
                <WrapItem>
                  <Image src="/favicon.ico" alt="img" width={25} height={25} />
                </WrapItem>
                <WrapItem alignItems="center">
                  {balance ? (
                    <Text> {balance} OPEN</Text>
                  ) : (
                    <Spinner
                      sx={{ marginRight: '6px' }}
                      thickness="5px"
                      speed="0.65s"
                      emptyColor="#745FFB"
                      color="#E14C90"
                      size="sm"
                    />
                  )}
                </WrapItem>
              </Wrap>
              {/* Career : Openian or Supplier or BlackSmith */}
              <Text>Career: {career}</Text>
              <Wrap>
                <WrapItem>
                  <Image
                    src="/images/icons/inventory.png"
                    alt="img"
                    width={20}
                    height={20}
                  />
                </WrapItem>
                <WrapItem>
                  <Text>Inventory</Text>
                </WrapItem>
              </Wrap>

              <Wrap
                alignItems="center"
                justifyContent="center"
                borderTop="none"
              >
                <WrapItem alignItems="center">
                  <Image
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
                  >
                    Recover
                  </Button>
                </WrapItem>
              </Wrap>
            </ul>
            <Button
              cursor={'url(/images/worldmap/click-cursor.png)'}
              onClick={handleClickProfile}
              className="btn-profile click-cursor"
              colorScheme="yellow"
              bgColor="#E8BE8A"
            >
              Profile
            </Button>
          </div>
        )}
        {isOpenUserInfo && (
          <UserInfo
            setIsOpenUserInfo={setIsOpenUserInfo}
            isOpenUserInfo={isOpenUserInfo}
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            profile={profile}
            balance={balance}
          />
        )}
        {profile === false && (
          <CreateProfile
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            isOpenCreateProfile={isOpenCreateProfile}
            getDataProfile={getDataProfile}
            handleOpenTutorial={handleOpenTutorial}
          />
        )}
        {isOpenCreateProfile && (
          <CreateProfile
            profile={profile}
            isEdit={true}
            setIsOpenCreateProfile={setIsOpenCreateProfile}
            isOpenCreateProfile={isOpenCreateProfile}
            getDataProfile={getDataProfile}
            handleOpenTutorial={handleOpenTutorial}
          />
        )}
        {isOpenTutorial && (
          <ProfessionsTutorial
            setIsOpenTutorial={setIsOpenTutorial}
            isOpenTutorial={isOpenTutorial}
          />
        )}
        <RefillStaminaModal isOpen={isOpen} onToggle={onToggle} />
      </div>
    </UserCSS>
  )
}

const UserCSS = styled.div({
  '.user-avatar': {
    position: 'fixed',
    top: '30px',
    left: '50px',
    zIndex: '999998',
    width: '200px',
    '@media(max-width: 720px)': {
      top: '10px',
      left: '10px',
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
    },
    '.user-info': {
      position: 'absolute',
      top: '70px',
      left: 0,
      width: '200px',
      backgroundImage: 'url(/images/profile/frame.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundColor: 'rgb(0,0,0,.6)',
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
  },
})
