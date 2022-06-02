import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

export const nftMarketContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0x7210aEaF0c7d74366E37cfB37073cB630Ac86B5b',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

const nftAddress = '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492'

const getNFTMarketContract = async () => {
  const chainId = await web3.eth.getChainId()

  if (chainId === 97) {
    return new web3.eth.Contract(
      nftMarketContract.jsonInterface.abi,
      nftMarketContract.addressBSC
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      nftMarketContract.jsonInterface.abi,
      nftMarketContract.addressHarmony
    )
  }
}

export const sellSushi = async (ids: Array<number>, price: number) => {
  const contract = await getNFTMarketContract()
  const accounts = await web3.eth.getAccounts()

  console.log('2124', ids)

  try {
    const data = await contract.methods
      .addListing(nftAddress, ids, price)
      .send({ from: accounts[0] })
    return data
  } catch (error) {
    console.log('e4witi', error)
    return null
  }
}
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
type Listing = {
  id: string
  items: string[]
  price: string
  seller: string
  trait: string
}
export async function getListingIDs(): Promise<Listing[]> {
  const contract = await getNFTMarketContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const listIds = await contract.methods
      .getListingSlice(nftAddress, 0, 20)
      .call({ from: accounts[0] })
    const listFull = []
    listIds?.sellers?.forEach((sellerAddress, index) => {
      if (sellerAddress !== NULL_ADDRESS) {
        listFull.push({
          id: listIds?.ids[index],
          items: listIds?.items[index],
          price: listIds?.prices[index],
          seller: listIds?.sellers[index],
          trait: listIds?.trait[index],
        })
      }
    })
    return listFull
  } catch (error) {
    return []
  }
}

const getDetailNFTItem = async (id: number) => {
  const contract = await getNFTMarketContract()
  const accounts = await web3.eth.getAccounts()
  const price = await contract?.methods
    ?.getFinalPrice(nftAddress, id)
    .call({ from: accounts[0] })
  const sellerInfor = await contract?.methods
    ?.getSellerOfNftID(nftAddress, id)
    .call({ from: accounts[0] })
}

// const
