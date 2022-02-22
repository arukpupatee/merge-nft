import { task } from "hardhat/config";
import { getAccount } from "../helpers/helpers";

task("check-balance", "Prints out the balance of your account").setAction(
  async function (taskArguments, hre) {
    const account = getAccount();
    console.log(
      `Account balance for ${account.address}: ${await account.getBalance()}`
    );
  }
);

task("deploy-registry", "Deploys the NiftyRegistry.sol contract").setAction(
  async function (taskArguments, hre) {
    const owners = ["0x12a3a8D82c2EF2E4b8C5c2EF7a624b839d047051"];
    const signingKeys = ["0x12a3a8D82c2EF2E4b8C5c2EF7a624b839d047051"];

    const contractFactory = await hre.ethers.getContractFactory(
      "NiftyRegistry",
      getAccount()
    );
    const contract = await contractFactory.deploy(owners, signingKeys);
    console.log(`Contract deploying to address: ${contract.address}`);

    await contract.deployed();
    console.log(`Contract deployed to address: ${contract.address}`);
  }
);

task(
  "deploy-metadata-generator",
  "Deploys the MergeMetadata.sol contract"
).setAction(async function (taskArguments, hre) {
  const contractFactory = await hre.ethers.getContractFactory(
    "MergeMetadata",
    getAccount()
  );
  const contract = await contractFactory.deploy();
  console.log(`Contract deploying to address: ${contract.address}`);

  await contract.deployed();
  console.log(`Contract deployed to address: ${contract.address}`);
});

task("deploy-merge", "Deploys the Merge.sol contract").setAction(
  async function (taskArguments, hre) {
    const registryAddress = "0x0ACa7aC5e71421fc0529b4CD746636bA77D0aDa7";
    const omnibusAddress = "0x12a3a8D82c2EF2E4b8C5c2EF7a624b839d047051";
    const metadataGeneratorAddress =
      "0x3273199fb64D2290F735D24e77765827dCd9b8B5";
    const pakAddress = "0x12a3a8D82c2EF2E4b8C5c2EF7a624b839d047051";

    const contractFactory = await hre.ethers.getContractFactory(
      "Merge",
      getAccount()
    );
    const contract = await contractFactory.deploy(
      registryAddress,
      omnibusAddress,
      metadataGeneratorAddress,
      pakAddress
    );
    console.log(`Contract deploying to address: ${contract.address}`);

    await contract.deployed();
    console.log(`Contract deployed to address: ${contract.address}`);
  }
);
