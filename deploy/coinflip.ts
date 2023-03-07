import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { owner } = await getNamedAccounts()

  const instanceAddr = '0xe1aE9b8F8B341357Ee8F26F36c77D0CDCda7045b'

  await deploy('CoinFlipHack', {
    from: owner,
    args: [instanceAddr],
    log: true,
  })
}
export default func

func.tags = ['CoinFlipHack']
