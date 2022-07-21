import { getAddresses } from 'constants/addresses'
import { ethers } from 'ethers'
import Web3 from 'web3'
import profilesInterface from '../build/contracts/Profiles.json'
import { getOpenWorldContract } from './openWorldContract'
import heroInterface from '../build/contracts/HeroCore.json'

const web3 = new Web3(Web3.givenProvider)

const getProfilesContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const chainId = await web3.eth.getChainId()
  const profileAddress = getAddresses(chainId).PROFILES

  return new ethers.Contract(
    profileAddress,
    profilesInterface.abi,
    provider.getSigner()
  )
}

export const getHeroCoreContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const heroAddress = getAddresses(chainId).HERO_CORE

  return new ethers.Contract(
    heroAddress,
    heroInterface.abi,
    provider.getSigner()
  )
}

// Call Methods
export async function fetchRequireBalanceProfession(): Promise<string[]> {
  try {
    const contract = await getProfilesContract()
    const requireBalances = await Promise.all([
      contract.requireBalanceBlacksmith(),
      contract.requireBalanceSupplier(),
      contract.requireBalanceOpenian(),
    ])

    return requireBalances.map((value) => value.toString())
  } catch (error) {
    return ['0', '0', '0']
  }
}

export const mintProfessionNFT = async (
  trait: number,
  onTransactionExecute: (txHash: string) => void
) => {
  const HeroCore = await getHeroCoreContract()
  const OpenWorld = await getOpenWorldContract()
  const currentAddress = await window.ethereum.selectedAddress

  const allowance = await OpenWorld.allowance(currentAddress, HeroCore.address)

  if (allowance < web3.utils.toWei('1000000', 'ether')) {
    const tx = await OpenWorld.approve(
      HeroCore.address,
      web3.utils.toWei('1000000', 'ether')
    )
    tx.wait()
  }
  try {
    const tx = await HeroCore.mint(currentAddress, trait)
    onTransactionExecute(tx.hash)
    const receipt = await tx.wait()

    return receipt
  } catch (e) {
    return null
  }
}

export const fetchUserProfessionNFT = async () => {
  try {
    const contract = await getHeroCoreContract()
    const currentAddress = await window.ethereum.selectedAddress
    const heroBalance = await contract.balanceOf(currentAddress)
    const nftList = []

    for (let i = 0; i < heroBalance.toNumber(); i++) {
      const heroId = await contract.tokenOfOwnerByIndex(currentAddress, i)
      const trait = await contract.getTrait(heroId.toNumber())
      nftList.push({ heroId: heroId.toNumber(), trait })
    }

    return nftList
  } catch (error) {
    return []
  }
}

const NFT_TYPES = ['openianCard', 'supplierCard', 'blacksmithCard']

export async function fetchUserProfessionNFTAmount(): Promise<
  { type: string; ids: number[] }[]
> {
  const nftList = await fetchUserProfessionNFT()

  const nftListIds = NFT_TYPES.map((type, index) => {
    return nftList.map((nft) => {
      if (nft.trait === index + 1) {
        return nft.heroId
      }
    })
  })

  const results = NFT_TYPES.map((type, index) => ({
    type,
    ids: nftListIds[index][0] !== undefined ? nftListIds[index] : [],
  }))
  return results
}

export const activateProfession = async (
  profession,
  heroId,
  onTransactionExecute: (hash: string) => void
) => {
  const contract = await getProfilesContract()
  try {
    const tx = await contract.setProfession(profession, heroId)
    onTransactionExecute(tx.hash)
    const receipt = await tx.wait()
    return receipt
  } catch (e) {
    return null
  }
}

export const fetchProfessionsNFTAmount = async () => {
  try {
    const contract = await getHeroCoreContract()
    const openianAmount = await contract.openianAmount()
    const supplierAmount = await contract.supplierAmount()
    const blacksmithAmount = await contract.blacksmithAmount()

    return {
      openianAmount: openianAmount.toNumber(),
      supplierAmount: supplierAmount.toNumber(),
      blacksmithAmount: blacksmithAmount.toNumber(),
    }
  } catch (err) {
    return {
      openianAmount: 0,
      supplierAmount: 0,
      blacksmithAmount: 0,
    }
  }
}

export const fetchProfessionsNFTPrices = async () => {
  const contract = await getHeroCoreContract()
  const openianPrice = await contract.openianPrice()
  const supplierPrice = await contract.supplierPrice()
  const blacksmithPrice = await contract.blacksmithPrice()

  return {
    openianPrice: ethers.utils.formatEther(openianPrice),
    supplierPrice: ethers.utils.formatEther(supplierPrice),
    blacksmithPrice: ethers.utils.formatEther(blacksmithPrice),
  }
}
