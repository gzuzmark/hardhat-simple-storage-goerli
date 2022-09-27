import { Verify } from 'crypto';
import { ethers, run, network } from 'hardhat';

async function verify(contractAddress: string, args: unknown[]) {
  console.log('Verifying contract.......');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
}

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log(
    '🚀 ~  Deploying contract file: deploy.ts ~ line 5 ~ main ~ SimpleStorageFactory',
    SimpleStorageFactory
  );

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(
    '🚀 ~ file: deploy.ts ~ line 12 ~ main ~ simpleStorage',
    simpleStorage.address
  );
  // what happens when we deploy to hardhat network?
  const { chainId } = network.config;
  if (chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log(
      '🚀 Verifyiiinnn...... ~ file: deploy.ts ~ line 40 ~ main ~ verify',
      verify
    );
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  console.log('Simple Storage deployed to:', simpleStorage.address);

  const currentValue = await simpleStorage.retrieve();
  console.log(
    '🚀 ~ file: deploy.ts ~ line 42 ~ main ~ currentValue',
    currentValue
  );

  // Update the current valie
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(
    '🚀 ~ file: deploy.ts ~ line 51 ~ main ~ updatedValue',
    updatedValue
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
