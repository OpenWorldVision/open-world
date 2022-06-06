export const TOKEN_DECIMALS = 18

export enum Networks {
  BSC_TESTNET = 97,
  HARMONY_TESTNET = 1666700000,
  HARMONY = 1666600000,
}

export const DEFAULT_NETWORK =
  process.env.NODE_ENV === 'production'
    ? Networks.HARMONY
    : Networks.HARMONY_TESTNET
