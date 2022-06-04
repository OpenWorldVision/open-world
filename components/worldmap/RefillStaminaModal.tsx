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
} from '@chakra-ui/react'
import Image from 'next/image'
import { fetchAmountItemByTrait } from 'utils/blackSmithContract'
import { refillStamina } from 'utils/professionContract'

type Props = {
  isOpen: boolean
  onToggle: () => void
}

function RefillStaminaModal(props: Props) {
  const { isOpen, onToggle } = props
  const [amountSushi, setAmountSushi] = useState(0)
  const toast = useToast()

  const handleUseSushi = useCallback(async () => {
    const availableSushi = await fetchAmountItemByTrait(4)
    if (availableSushi?.length < amountSushi) {
      toast({
        title: 'Refill stamina',
        description: 'Not enough sushi',
        duration: 10000,
        isClosable: true,
        status: 'warning',
      })
      return
    }

    await refillStamina(
      availableSushi?.slice(0, amountSushi).map((v) => `${v}`)
    )
  }, [amountSushi, toast])

  const handleChangeAmountSushi = useCallback((_: string, value: number) => {
    setAmountSushi(value)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onToggle} isCentered>
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundImage: 'url(./images/profile/frame.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundColor: 'rgb(0,0,0,.8)',
        }}
      >
        <ModalHeader>
          <Text fontSize="md" color="white">
            Refill Stamina
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center mb={10}>
            <Image
              src="/images/inventory/sushi.png"
              width={60}
              height={30}
              alt="sushi"
            />
          </Center>
          <Center>
            <Wrap align="center">
              <WrapItem>
                <Text fontSize="md" color="white">
                  AMOUNT :
                </Text>
              </WrapItem>
              <WrapItem>
                <NumberInput color="white" onChange={handleChangeAmountSushi}>
                  <NumberInputField
                    backgroundColor="#2e1c0e"
                    borderColor="#2e1c0e"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      backgroundColor="#2e1c0e"
                      borderColor="#2e1c0e"
                    />
                    <NumberDecrementStepper
                      backgroundColor="#2e1c0e"
                      borderColor="#2e1c0e"
                    />
                  </NumberInputStepper>
                </NumberInput>
              </WrapItem>
            </Wrap>
          </Center>
        </ModalBody>
        <ModalFooter alignItems="center" justifyContent="center">
          <Center>
            <Button onClick={handleUseSushi}>USE</Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RefillStaminaModal
