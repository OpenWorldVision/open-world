import { useCallback, useMemo } from 'react'
import { useToast } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export enum TRANSACTION_STATE {
  FAILED = 0,
  SUCCESSFUL,
  WAITING,
  NOT_EXECUTED,
}

function useTransactionState() {
  const toast = useToast()

  const blockExplorer = useMemo(() => {
    const chainId = window?.ethereum?.chainId
    switch (chainId) {
      // BSC testnet
      case '0x61':
        return 'https://testnet.bscscan.com/tx/'
      case '0x38':
        return 'https://bscscan.com/tx/'
      // Harmony tesnet
      case '0x6357d2e0':
      case '0x6357d2e1':
      case '0x6357d2e2':
      case '0x6357d2e3':
        return 'https://explorer.pops.one/tx/'
      // Harmony mainet
      case '0x63564c40':
      case '0x63564c41':
      case '0x63564c42':
      case '0x63564c43':
        return 'https://explorer.harmony.one/tx/'
    }
  }, [])

  const handleTxStateChange = useCallback(
    (title, txHash, txResult: TRANSACTION_STATE) => {
      toast.closeAll()
      switch (txResult) {
        case TRANSACTION_STATE.FAILED:
          return toast({
            title: title + ' transaction is failed',
            description: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={blockExplorer + txHash}
              >
                Transaction detail <ExternalLinkIcon mx="2px" />
              </a>
            ),
            duration: 10000,
            isClosable: true,
            status: 'error',
          })
        case TRANSACTION_STATE.SUCCESSFUL:
          return toast({
            title: title + ' transaction is successful',
            description: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={blockExplorer + txHash}
              >
                Transaction detail <ExternalLinkIcon mx="2px" />
              </a>
            ),
            duration: 10000,
            isClosable: true,
            status: 'success',
          })

        case TRANSACTION_STATE.WAITING:
          return toast({
            title: title + ' transaction is excuting',
            duration: 100000,
            description: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={blockExplorer + txHash}
              >
                Transaction detail <ExternalLinkIcon mx="2px" />
              </a>
            ),
            status: 'info',
            containerStyle: {
              zIndex: 999999,
            },
          })

        case TRANSACTION_STATE.NOT_EXECUTED:
          return toast({
            title: title + ' transaction is failed to execute',
            duration: 10000,
            isClosable: true,
            status: 'error',
          })
      }
    },
    [blockExplorer, toast]
  )

  return handleTxStateChange
}

export default useTransactionState
