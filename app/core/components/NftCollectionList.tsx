import { useEffect, useState } from "react"
import { NFTMetadataOwner } from "@thirdweb-dev/sdk"
import { useNFTCollection } from "@thirdweb-dev/react"

// A React component to render all nfts from the nft collection.
// ref: https://portal.thirdweb.com/guides/mint-nft-using-nextjs
export const NftCollectionList = () => {
  // React state for a list of nfts in the nft collection
  const [nfts, setNFTs] = useState([] as NFTMetadataOwner[])

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nftCollectionAddress = "0x78591Cf9Bc3431E41614707eF731c512A04977eB"
  const nftCollection = useNFTCollection(nftCollectionAddress)

  useEffect(() => {
    const getNfts = async () => {
      const nfts = await nftCollection?.getAll()
      setNFTs(nfts || [])
    }

    getNfts()
  }, [nftCollection])

  // render the list of nfts
  console.log(nfts)
  return (
    <div>
      {nfts.map((nft) => (
        <p key={nft.metadata.id.toString()}>Token Id: {nft.metadata.id.toString()}</p>
      ))}
    </div>
  )
}
