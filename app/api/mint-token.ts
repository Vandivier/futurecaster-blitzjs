import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ethers } from "ethers"
import { NextApiRequest, NextApiResponse } from "next"

export default function mint(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  // the RPC URL to the blockchain that the NFT contract is deployed on.
  // "rinkeby" = rinkeby testnet,
  // "https://rpc-mumbai.maticvigil.com" = mumbai testnet.
  //   const rpcUrl = "rinkeby"
  //
  // infura url used by metamask
  const rpcUrl = "https://rinkeby.infura.io/v3/"

  // setup a wallet using private key for the SDK.
  // the wallet must have MINTER role to mint the NFT.
  // you can assign MINTER role to the wallet through the NFT collection dashboard.
  const wallet = new ethers.Wallet(
    process.env.ETH_NET_MINTER_WALLET_SECRET as string,
    ethers.getDefaultProvider(rpcUrl)
  )

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nft = new ThirdwebSDK(wallet).getNFTCollection("0x78591Cf9Bc3431E41614707eF731c512A04977eB")
  return new Promise<void>((resolve) => {
    const { address } = req.body

    nft
      .mintTo(address, {
        name: "Futurecast",
        description: "A fortune cookie kinda",
        image: "ipfs://QmcmfEV7X5LPfrAjUubw3wGV4toY9Mkb74XVhQJeKakp4Z",
      })
      .then((metadata) => {
        // Returning the NFT metadata to the client requested.
        // This depends on the HTTP server framework
        res.status(200).json(metadata)
        resolve()
      })
  })
}
