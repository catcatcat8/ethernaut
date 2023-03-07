import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { owner } = await getNamedAccounts()

  const instanceAddr = '0xe350Ff70BbF9dB9608Fc1a4BB2796688c8B44Bff'

  await deploy('TelephoneHack', {
    from: owner,
    args: [instanceAddr],
    log: true,
  })
}
export default func

func.tags = ['TelephoneHack']
