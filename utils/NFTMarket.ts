import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const professionContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0xF65a2cd87d3b0Fa43C10979c2E60BAA40Bb03C1d',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

const getNFTMarketContract = async () => {
  const chainId = await web3.eth.getChainId()

  if (chainId === 97) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressBSC
    )
  } else if (chainId === 1666700000) {
    return new web3.eth.Contract(
      professionContract.jsonInterface.abi,
      professionContract.addressHarmony
    )
  }
}

export const sellSushi = async (id: number, price: number) => {
  const contract = await getNFTMarketContract()
  const accounts = await web3.eth.getAccounts()
  const nftAddress = '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492'

  try {
    const data = await contract.methods
      .addListing(nftAddress, id, price)
      .send({ from: accounts[0] })
    console.log('data add listing', data)
    return data
  } catch (error) {
    console.log('3124234', error)
  }
}
