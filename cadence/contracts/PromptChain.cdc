import NonFungibleToken from "./utility/NonFungibleToken.cdc"

pub contract PromptChain: NonFungibleToken {
    pub var totalSupply: UInt64
    pub var ownedNFTAddress: {UInt64: Address}

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let category: String
        pub let title: String
        pub let description: String
        pub let thumbnail: String
        pub let priceToUse: UInt64
        pub let priceForSale: UInt64
        pub var metadata: {String: String}

        init(_category: String, _title: String, _description: String, _thumbnail: String, _priceToUse: UInt64, _priceForSale: UInt64, _metadata: {String: String}) {
            self.id = PromptChain.totalSupply + 1
            PromptChain.totalSupply = PromptChain.totalSupply + 1

            self.category = _category
            self.title = _title
            self.description = _description
            self.thumbnail = _thumbnail
            self.priceToUse = _priceToUse
            self.priceForSale = _priceForSale
            self.metadata = _metadata
        }
    }

    pub resource interface CollectionPublic {
        pub fun borrowEntireNFT(id: UInt64): &PromptChain.NFT
    }

    pub resource Collection: NonFungibleToken.Receiver, NonFungibleToken.Provider, NonFungibleToken.CollectionPublic, CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let myToken <- token as! @PromptChain.NFT
            emit Deposit(id: myToken.id, to: self.owner?.address)
            PromptChain.ownedNFTAddress[myToken.id] = self.owner?.address
            self.ownedNFTs[myToken.id] <-! myToken
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            PromptChain.ownedNFTAddress.remove(key: withdrawID) ?? panic("This NFT does not exist")
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("This NFT does not exist")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <- token
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowEntireNFT(id: UInt64): &PromptChain.NFT {
            let reference = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            return reference as! &PromptChain.NFT
        }

        init() {
            self.ownedNFTs <- {}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createToken(category: String, title: String, description: String, thumbnail: String, priceToUse: UInt64, priceForSale: UInt64, metadata: {String: String}): @PromptChain.NFT {
        return <- create NFT(_category: category, _title: title, _description: description, _thumbnail: thumbnail, _priceToUse: priceToUse, _priceForSale: priceForSale, _metadata: metadata)
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    init() {
        self.totalSupply = 0
        self.ownedNFTAddress = {}
    }
}
