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

const SEND_FLOW = `import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
transaction(amount: UFix64, to: Address) {
  let sentVault: @FungibleToken.Vault
  prepare(sender: AuthAccount) {
    let vault = sender.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow reference to the owner's Vault!")
    self.sentVault <- vault.withdraw(amount: amount)
  }
  execute {
    let recipient = getAccount(to)
    let receiver = recipient.getCapability(/public/flowTokenReceiver).borrow<&{FungibleToken.Receiver}>() ?? panic("Could not borrow receiver reference to the recipient's Vault")
    receiver.deposit(from: <-self.sentVault)
  }
}`;

export async function sendFlow(amount, to) {
  return fcl.mutate({
    cadence: SEND_FLOW,
    args: (arg, t) => [arg(amount, t.UFix64), arg(to, t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 1000,
  });
}