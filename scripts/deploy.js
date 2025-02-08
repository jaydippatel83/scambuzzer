async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const ScamBuzzerSubscriptionNFT = await ethers.getContractFactory("ScamBuzzerSubscriptionNFT");

    const scamBuzzerContract = await ScamBuzzerSubscriptionNFT.deploy({
        gasLimit: 5000000 // Set a sufficient gas limit
    });

    await scamBuzzerContract.deployed();
    console.log("ScamBuzzerSubscriptionNFT deployed to:", scamBuzzerContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
