import { useAddress, useMetamask } from "@thirdweb-dev/react"

// ref: https://portal.thirdweb.com/guides/mint-nft-using-nextjs#time-to-make-the-magic-happen
export const NftMintButton = () => {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const onMintHandler = async () => {
    // alert("sup")
    // make a backend server api request to mint an NFT
    await fetch("/api/mint-token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ address }),
    })
  }

  const ConnectWallet = () => {
    return <button onClick={connectWithMetamask}>Connect with Metamask</button>
  }

  // render the button to mint a sword NFT
  return address ? <button onClick={onMintHandler}>Mint Futurecast NFT</button> : <ConnectWallet />
}
