import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  Text,
  Box,
  Image,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import LoadingModal from '@components/LoadingModal'
import Button from '@components/theme/components/Button'
import useTransactionState, {
  TRANSACTION_STATE,
} from 'hooks/useTransactionState'

import { forwardRef, useImperativeHandle, useState, useCallback } from 'react'
import { buyFirstHammer } from 'utils/Item'

export type ConfirmationModalRef = {
  open: () => void
  close: () => void
}

function ConfirmationModal(_, ref) {
  const { isOpen, onToggle } = useDisclosure()
  const [buyAmount, setBuyAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  const handleTxStateChange = useTransactionState()

  useImperativeHandle(
    ref,
    () => ({
      open: onToggle,
      close: onToggle,
    }),
    [onToggle]
  )

  const handleChangeBuyAmount = useCallback((_, value: number) => {
    setBuyAmount(value)
  }, [])

  const handleConfirm = useCallback(async () => {
    setLoading(true)
    await buyFirstHammer((hash) => {
      handleTxStateChange('Buy first hammer', hash, TRANSACTION_STATE.WAITING)
    })
    setLoading(false)
    onToggle()
  }, [handleTxStateChange, onToggle])

  return (
    <Modal isOpen={isOpen} onClose={onToggle} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Text textAlign="center" fontWeight="bold" mb={8} mt={4}>
              Buy Items
            </Text>
            <Box
              bgColor="white"
              p={0.4}
              minW={68}
              alignItems="center"
              justifyContent="center"
              mb={10}
            >
              <Image
                src="/images/shop/icon-sushi-1.webp"
                width={68}
                height={68}
                alt="icon-sushi"
                p={2}
                background="linear-gradient(180deg, rgba(129, 129, 129, 0.7) 0%, rgba(213, 213, 213, 0.7) 100%)"
              />
            </Box>
            <NumberInput
              defaultValue={1}
              min={1}
              max={2}
              onChange={handleChangeBuyAmount}
              isDisabled
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mt={8}
            >
              <Text fontWeight="bold">Total pay: {buyAmount * 150} OPEN</Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" justifyContent="center">
          <Button onClick={handleConfirm} isLoading={loading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default forwardRef<ConfirmationModalRef, any>(ConfirmationModal)
