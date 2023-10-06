import * as fcl from "@onflow/fcl";

const ALLPROMPTS = `
import PromptChain from 0xPromptChain
pub struct NFT {
	pub let id: String
	pub let category: String
	pub let title: String
	pub let description: String
	pub let thumbnail: String
	pub let priceToUse: UInt64
	pub let priceForSale: UInt64
	pub let metadata: {String: String}
	init(_id: UInt64, _category: String, _title: String, _description: String, _thumbnail: String, _priceToUse: UInt64, _priceForSale: UInt64, _metadata: {String: String}) {
		self.id = _id.toString()
		self.category = _category
		self.title = _title
		self.description = _description
		self.thumbnail = _thumbnail
		self.priceToUse = _priceToUse
		self.priceForSale = _priceForSale
		self.metadata = _metadata
	}
}
pub fun main(): [NFT] {
	let collections = PromptChain.ownedNFTAddress
    let dataNft: [NFT] = []
    for key in collections.keys {
			let ownerAddress = collections[key]
			let collection = getAccount(ownerAddress!).getCapability(/public/PromptChainPromptCollection).borrow<&PromptChain.Collection{PromptChain.CollectionPublic}>() ?? panic("Could not borrow a reference to the collection")
			let entireNFT = collection.borrowEntireNFT(id: key)
			dataNft.append(
				NFT(
					_id: entireNFT.id,
					_category: entireNFT.category,
					_title: entireNFT.title,
					_description: entireNFT.description,
					_thumbnail: entireNFT.thumbnail,
					_priceToUse: entireNFT.priceToUse,
					_priceForSale: entireNFT.priceForSale,
					_metadata: entireNFT.metadata,
				)
			)
    }

    return dataNft
}`;

export async function getAllPrompts() {
  return fcl.query({
    cadence: ALLPROMPTS,
    args: (arg, t) => [],
  });
}

const FINDPROMPT = `
import PromptChain from 0xPromptChain
pub struct NFT {
	pub let id: String
	pub let category: String
	pub let title: String
	pub let description: String
	pub let thumbnail: String
	pub let priceToUse: UInt64
	pub let priceForSale: UInt64
	pub let metadata: {String: String}
	init(_id: UInt64, _category: String, _title: String, _description: String, _thumbnail: String, _priceToUse: UInt64, _priceForSale: UInt64, _metadata: {String: String}) {
		self.id = _id.toString()
		self.category = _category
		self.title = _title
		self.description = _description
		self.thumbnail = _thumbnail
		self.priceToUse = _priceToUse
		self.priceForSale = _priceForSale
		self.metadata = _metadata
	}
}
pub fun main(id: UInt64): NFT {
	let collections = PromptChain.ownedNFTAddress
	let ownerAddress = collections[id]
	let collection = getAccount(ownerAddress!).getCapability(/public/PromptChainPromptCollection).borrow<&PromptChain.Collection{PromptChain.CollectionPublic}>() ?? panic("Could not borrow a reference to the collection")
	let entireNFT = collection.borrowEntireNFT(id: id)
	return  NFT(
		_id: entireNFT.id,
		_category: entireNFT.category,
		_title: entireNFT.title,
		_description: entireNFT.description,
		_thumbnail: entireNFT.thumbnail,
		_priceToUse: entireNFT.priceToUse,
		_priceForSale: entireNFT.priceForSale,
		_metadata: entireNFT.metadata,
	)
}`;

export async function findPrompt(id) {
  return fcl.query({
    cadence: FINDPROMPT,
    args: (arg, t) => [
		arg(id, t.UInt64),
	],
  });
}


const ALLOWNERS = `
import PromptChain from 0xPromptChain

pub fun main(): {UInt64: Address} {
    return PromptChain.ownedNFTAddress
}`;

export async function getAllOwners() {
  return fcl.query({
    cadence: ALLOWNERS,
    args: (arg, t) => [],
  });
}

const USEDCOUNT = `
import PromptChain from 0xPromptChain

pub fun main(): {UInt64: UInt64} {
    return PromptChain.usedNFTCount
}`;

export async function getUsedCount() {
  return fcl.query({
    cadence: USEDCOUNT,
    args: (arg, t) => [],
  });
}