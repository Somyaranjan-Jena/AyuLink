async function main() {
  // Dynamically import the Hardhat Runtime Environment
  const hre = await import('hardhat');
  const ethers = hre.ethers;

  // Get the contract factory and deploy
  const HerbTraceFactory = await ethers.getContractFactory("HerbTrace");
  const herbTrace = await HerbTraceFactory.deploy();
  await herbTrace.waitForDeployment();

  console.log(
    `HerbTrace contract deployed to ${herbTrace.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});