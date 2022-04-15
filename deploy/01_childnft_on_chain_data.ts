module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, erc721base } = await getNamedAccounts();

  let baseAddress = erc721base;
  // Deploy in testnet or when no base is deployed
  if (!baseAddress) {
    baseAddress = (await deployments.get("TestBase")).address;
  }

  const baseURI = 'https://arweave.net/gU0SB5pNS5DfrfZtrP3kZSW1AyYMWdzG6JtUSYsADGM/';
  const numberOfColors = 4

  const contractArgs = [
    baseAddress,
    baseURI,
    numberOfColors
  ]

  const contract = await deploy("NeonsColorChangingNoun", {
    from: deployer,
    args: contractArgs,
    log: true,
  });

  const contractArgsSeparated = separateContractArgs(contractArgs);

  console.log('')
  console.log('✅  ✅  ✅  ✅  ✅')
  console.log('To Verify:')
  console.log(`Rinkeby:\n npx hardhat verify --network rinkeby ${contract.address} ${contractArgsSeparated}`)
  console.log('---')
  console.log(`Mainnet:\n npx hardhat verify --network mainnet ${contract.address} ${contractArgsSeparated}`)
  console.log('✅  ✅  ✅  ✅  ✅')
  console.log('')

};
module.exports.tags = ["NeonsColorChangingNoun"];
module.exports.dependencies = ["TestBase"];

function separateContractArgs(args: string[]): string {
  let separatedArgs = args.toString();
  while (separatedArgs.includes(',')) {
    separatedArgs = separatedArgs.replace(',', ' ');
  }
  return separatedArgs;
}