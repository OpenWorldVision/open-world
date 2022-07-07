import { getAddresses } from 'constants/addresses'
import { BigNumber, ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import heroMarketInterface from '../build/contracts/HeroMarket.json'
import { NULL_ADDRESS } from './NFTMarket'
import { getOpenWorldContract } from './openWorldContract'
import { getHeroCoreContract } from './professions'

export const getHeroMarketContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const { chainId } = await provider.getNetwork()
  const marketAddress = getAddresses(chainId).HERO_MARKET

  return new ethers.Contract(
    marketAddress,
    heroMarketInterface.abi,
    provider.getSigner()
  )
}
type Listing = {
  id: number
  price: string
  seller: string
  trait: number
}
export async function getListingIDs(
  isMine: boolean,
  isFull = false
): Promise<Listing[]> {
  const contract = await getHeroMarketContract()
  const account = await contract.signer.getAddress()
  const { chainId } = await contract.provider.getNetwork()
  const heroAddress = getAddresses(chainId).HERO_CORE
  const heroContract = await getHeroCoreContract()
  try {
    const rawList = await contract.getListingSlice(heroAddress, 0, 30)

    const listings = (
      await Promise.all(
        rawList?.sellers?.map(async (sellerAddress, index) => {
          if (sellerAddress === NULL_ADDRESS) {
            return null
          }
          const trait = await heroContract.getTrait(
            rawList?.ids[index].toNumber()
          )
          return {
            id: rawList?.ids[index].toNumber(),
            price: ethers.utils.formatEther(rawList?.prices[index]),
            seller: rawList?.sellers[index],
            trait,
          }
        })
      )
    ).filter((v) => v !== null)

    if (isFull) {
      return listings.map((item) => ({
        ...item,
        isOwner: item?.seller === account,
      }))
    }

    return listings.filter((item) =>
      !isMine ? item?.seller !== account : item?.seller === account
    )
  } catch (e) {
    return []
  }
}
type Hero = {
  id: number
  trait: number
}
export async function getHeroes(): Promise<Hero[]> {
  const contract = await getHeroCoreContract()
  const account = await contract.signer.getAddress()

  const balance: BigNumber = await contract.balanceOf(account)
  const ids: number[] = []
  for (let i = 0; i < balance.toNumber(); i++) {
    const id: BigNumber = await contract.tokenOfOwnerByIndex(account, i)
    ids.push(id.toNumber())
  }

  const heroes = await Promise.all(
    ids.map(async (id) => {
      const trait: number = await contract.getTrait(id)
      return { trait, id }
    })
  )
  return heroes
}

export const listingHero = async (
  id: number,
  price: number,
  onTransactionExecute: (txHash: string) => void
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const heroMarketContract = await getHeroMarketContract()
  const account = await provider.getSigner().getAddress()
  const heroCoreContract = await getHeroCoreContract()

  try {
    const isApproved = await heroCoreContract.isApprovedForAll(
      account,
      heroMarketContract.address
    )
    if (!isApproved) {
      const tx = await heroCoreContract.setApprovalForAll(
        heroMarketContract.address,
        true
      )
      await tx.wait()
    }

    const tx2 = await heroMarketContract.addListing(
      heroCoreContract.address,
      id,
      ethers.utils.parseEther(`${price}`)
    )
    onTransactionExecute(tx2.hash)

    const receipt = await tx2.wait()

    return receipt
  } catch (error) {
    return null
  }
}

export const purchaseHero = async (
  id: number,
  onTransactionExecute: (txHash: string) => void,
  onError?: (error: string) => void
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const heroCoreContract = await getHeroCoreContract()
  const heroMarketContract = await getHeroMarketContract()
  const openContract = await getOpenWorldContract()
  const account = await provider.getSigner().getAddress()
  const maxPrice = await heroMarketContract.getFinalPrice(
    heroCoreContract.address,
    id
  )

  try {
    const allowance: BigNumber = await openContract.allowance(
      account,
      heroMarketContract.address
    )

    if (!allowance.gte(parseEther('10000'))) {
      const tx = await openContract.approve(
        heroMarketContract.address,
        parseEther('100000000')
      )
      await tx.wait()
    }

    const tx2 = await heroMarketContract.purchaseListing(
      heroCoreContract.address,
      id,
      maxPrice
    )

    onTransactionExecute(tx2.hash)
    const receipt = await tx2.wait()
    return receipt
  } catch (error) {
    onError?.(error.reason)
    return null
  }
}

export const cancelListingItem = async (
  id: number,
  onTransactionExecute: (txHash: string) => void
) => {
  try {
    const contract = await getHeroMarketContract()
    const { chainId } = await contract.provider.getNetwork()
    const heroCore = getAddresses(chainId).HERO_CORE

    const tx = await contract?.cancelListing(heroCore, id)
    await tx.wait()
    onTransactionExecute(tx.hash)

    const receipt = await tx.wait()

    if (receipt) {
      return receipt
    }
  } catch (error) {
    return null
  }
}
