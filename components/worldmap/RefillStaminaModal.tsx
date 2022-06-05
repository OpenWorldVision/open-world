import React, { useCallback, useState } from 'react'
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Wrap,
  WrapItem,
  Text,
  useToast,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { fetchAmountItemByTrait } from 'utils/blackSmithContract'
import { refillStamina } from 'utils/professionContract'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import LoadingModal from '@components/LoadingModal'

type Props = {
  isOpen: boolean
  onToggle: () => void
  onSuccess: () => void
}

function RefillStaminaModal(props: Props) {
  const { isOpen, onToggle, onSuccess } = props
  const {
    isOpen: loading,
    onToggle: onToggleLoading,
    onClose,
  } = useDisclosure()
  const [amountSushi, setAmountSushi] = useState(0)
  const [success, setSuccess] = useState(false)
  const toast = useToast()

  const handleUseSushi = useCallback(async () => {
    if (success) {
      onClose()
      setSuccess(false)
      return
    }
    try {
      onToggleLoading()
      const availableSushi = await fetchAmountItemByTrait(4)
      if (availableSushi?.length < amountSushi) {
        toast({
          title: 'Recover stamina',
          description: 'Not enough sushi to recover stamina',
          duration: 10000,
          isClosable: true,
          status: 'warning',
        })
        onClose()
        return
      }

      await refillStamina(
        availableSushi?.slice(0, amountSushi).map((v) => `${v}`),
        (txHash) => {
          toast({
            title: 'Recover stamina transaction is executing',
            description: (
              <Link
                href={`https://testnet.bscscan.com/tx/${txHash}`}
                isExternal
              >
                Transaction detail <ExternalLinkIcon mx="2px" />
              </Link>
            ),
            duration: 10000,
            isClosable: true,
            status: 'info',
          })
        }
      )
      onSuccess()
      setSuccess(true)
    } catch (e) {
    } finally {
      onClose()
    }
  }, [amountSushi, onClose, onSuccess, onToggleLoading, success, toast])

  const handleChangeAmountSushi = useCallback((_: string, value: number) => {
    setAmountSushi(value)
  }, [])

  return (
    <>
      <Modal isOpen={loading} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <LoadingModal />
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onToggle} isCentered>
        <ModalOverlay />
        <ModalContent
          bgImg="url(/images/profile/frame.png)"
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          bgColor="rgb(0,0,0,.8)"
          padding={8}
          containerProps={{
            zIndex: 9999,
          }}
        >
          <ModalHeader alignItems="center" justifyContent="center">
            <Text fontSize="xl" color="white" textAlign="center">
              Recover Stamina
            </Text>
          </ModalHeader>
          <ModalCloseButton
            bgColor="#F1F099"
            color="#3D2315"
            borderRadius={20}
            mt={2}
            mr={2}
            _hover={{
              bgColor: '#F1D999',
            }}
          />
          {success && (
            <ModalBody>
              <Center mb={8}>
                <Text fontSize="xl" color="white">
                  SUCCESS !!
                </Text>
              </Center>
              <Center>
                <Text fontSize="md" color="white">
                  You gain {amountSushi * 50} Stamina Point !
                </Text>
              </Center>
            </ModalBody>
          )}
          {!success && (
            <ModalBody>
              <Center mb={10}>
                <img
                  src="/images/inventory/sushi.png"
                  width={40}
                  height={40}
                  alt="sushi"
                />
              </Center>
              <Center>
                <Wrap align="center">
                  <WrapItem>
                    <Text fontSize="md" color="white">
                      AMOUNT
                    </Text>
                  </WrapItem>
                  <WrapItem>
                    <NumberInput
                      color="white"
                      onChange={handleChangeAmountSushi}
                      min={1}
                      max={2}
                    >
                      <NumberInputField
                        backgroundColor="#2e1c0e"
                        borderColor="#2e1c0e"
                        borderRadius={20}
                      />
                      <NumberInputStepper borderRadius={20}>
                        <NumberIncrementStepper
                          backgroundColor="transparent"
                          borderColor="#2e1c0e"
                          borderRadius={20}
                        />
                        <NumberDecrementStepper
                          backgroundColor="transparent"
                          borderColor="#2e1c0e"
                          borderRadius={20}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </WrapItem>
                </Wrap>
              </Center>
              <Center>
                <Text color={'white'} fontSize="xs" mt={4}>
                  * You can use max 2 sushi to recover stamina
                </Text>
              </Center>
            </ModalBody>
          )}
          <ModalFooter alignItems="center" justifyContent="center">
            <Center>
              <Button
                onClick={handleUseSushi}
                disabled={loading}
                colorScheme="yellow"
              >
                {success ? 'CONFIRM' : 'USE'}
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RefillStaminaModal
