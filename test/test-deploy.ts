/* eslint-disable camelcase */
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe('SimpleStorage', () => {
  let simpleStorage: SimpleStorage;
  let SimpleStorageFactory: SimpleStorage__factory;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it('Should start with a favorite number of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    expect(currentValue).to.equal(0);
  });

  it('Should update when we call store', async () => {
    const expectedValue = 7;
    const transactionResponse = await simpleStorage.store(expectedValue);
    const transactionReceipt = await transactionResponse.wait();
    const currentValue = await simpleStorage.retrieve();
    expect(currentValue).to.equal(expectedValue);
  });
});
