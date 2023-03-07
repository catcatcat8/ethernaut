import { ethers } from 'hardhat'
import { CoinFlipHack__factory, CoinFlip__factory } from '../typechain'
import { BNToNumstr } from '../tools/hardhat/extensions/bignumber'

import { config } from '../secrets.config'

const MUMBAI_RPC = 'https://rpc-mumbai.maticvigil.com'
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC)

const instanceAddr = '0xe1aE9b8F8B341357Ee8F26F36c77D0CDCda7045b'
const hackContractAddr = '0xF83d54C4A5D4437Dd5F446916fdf993370191a72'

async function hack() {
  const signer = new ethers.Wallet(config.PRIVATE.MAIN[0], provider)
  const contractInstance = CoinFlip__factory.connect(instanceAddr, provider)
  const contractHackSigner = CoinFlipHack__factory.connect(hackContractAddr, signer)
  
  for (let index = 0; index < 10; index++) {
    const tx = await contractHackSigner.hack()
    console.log(tx.hash);
    await tx.wait()
  }

  console.log(await (await contractInstance.consecutiveWins()).toString());
}

hack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
