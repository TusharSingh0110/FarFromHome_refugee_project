const hre = require("hardhat");

async function main() {
  const FFH = await hre.ethers.getContractFactory("FFH");
  const ffh = await FFH.deploy();

  await ffh.waitForDeployment();

  console.log(`Deployed contract address: ${ffh.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x0aD9e7080754e43B06CCcC89C7994ac91925287e
