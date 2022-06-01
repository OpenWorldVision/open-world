import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const professionContract = {
  addressHarmony: '0x2BE7506f18E052fe8d2Df291d9643900f4B5a829',
  addressBSC: '0x7210aEaF0c7d74366E37cfB37073cB630Ac86B5b',
  jsonInterface: require('../build/contracts/NFTMarket.json'),
}

const nftAddress = '0xC7610EC0BF5e0EC8699Bc514899471B3cD7d5492'

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

  try {
    const data = await contract.methods
      .addListing(nftAddress, id, price)
      .send({ from: accounts[0] })
    return data
  } catch (error) {
    return null
  }
}

export const getListingIDs = async () => {
  const contract = await getNFTMarketContract()
  const accounts = await web3.eth.getAccounts()
  try {
    const listIds = await contract.methods
      .getListingSlice(nftAddress, 0, 100)
      .call({ from: accounts[0] })
    const listFull = []
    listIds?.sellers?.forEach((id, index) => {
      const prevId = listIds?.sellers?.[index - 1]

      if (prevId !== id) {
        const itemNFT = {
          [id]: {
            listItem: [
              { id: listIds?.ids?.[index], price: listIds?.prices?.[index] },
            ],
          },
        }
        listFull?.push(itemNFT)
      } else {
        listFull?.map((item) => {
          if (item?.hasOwnProperty(id)) {
            item?.[id]?.listItem?.push({
              id: listIds?.ids?.[index],
              price: listIds?.prices?.[index],
            })
          }
          return item
        })
      }
    })
    console.log('ga vit', listIds)
    return listFull
  } catch (error) {}
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
