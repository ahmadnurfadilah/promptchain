import * as fcl from "@onflow/fcl";

const CREATE_PROMPT = `
import PromptChain from 0xPromptChain
import FungibleToken from 0xFungibleToken

transaction (_title: String, _description: String, _thumbnail: String, _priceToUse: UInt64, _priceForSale: UInt64, _metadata: {String: String}) {
  prepare(acct: AuthAccount) {
    if acct.borrow<&PromptChain.Collection>(from: /storage/PromptChainCollection) == nil {
			acct.save(<- PromptChain.createEmptyCollection(), to: /storage/PromptChainCollection)
			acct.link<&PromptChain.Collection{PromptChain.CollectionPublic}>(/public/PromptChainCollection, target: /storage/PromptChainCollection)
    }

		let collection = acct.borrow<&PromptChain.Collection>(from: /storage/PromptChainCollection) ?? panic("This collection does not exists here")
    let nft <- PromptChain.createToken(title: _title, description: _description, thumbnail: _thumbnail, priceToUse: _priceToUse, priceForSale: _priceForSale, metadata: _metadata)
    collection.deposit(token: <- nft)
  }
}`;

export async function createPrompt(title, description, thumbnail, priceToUse, priceForSale, metadata) {
  return fcl.mutate({
    cadence: CREATE_PROMPT,
    args: (arg, t) => [
      arg(title, t.String),
      arg(description, t.String),
      arg(thumbnail, t.String),
      arg(priceToUse, t.UInt64),
      arg(priceForSale, t.UInt64),
      arg(metadata, t.Dictionary({ key: t.String, value: t.String })),
    ],
  });
}
