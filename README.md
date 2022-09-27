# Simple Storage

- [Useage](#useage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Estimate gas](#estimate-gas)
  - [Verify on etherscan](#verify-on-etherscan)
- [Typescript differences](#typescript-differences)
- [Linting](#linting)
- [References](#References)

This project is apart of the Hardhat FreeCodeCamp video.

Video coming soon...

# Getting Started



# Useage

Deploy:

```
npx hardhat run scripts/deploy.ts
```

or

```
npx hardhat run scripts/deploy.ts --network goerli
```

or

```
# Run this in one shell
npx hardhat node
# And on a different shell
npx hardhat run scripts/deploy.ts --network localhost
```

## Testing

```
npx hardhat test
```
When you run the tests it should show you something like following example
``` shell
  Lock
    Deployment
      ✓ Should set the right unlockTime
      ✓ Should set the right owner
      ✓ Should receive and store the funds to lock
      ✓ Should fail if the unlockTime is not in the future
    Withdrawals
      Validations
        ✓ Should revert with the right error if called too soon
        ✓ Should revert with the right error if called from another account
        ✓ Shouldn't fail if the unlockTime has arrived and the owner calls it
      Events
        ✓ Should emit an event on withdrawals
      Transfers
        ✓ Should transfer the funds to the owner

  SimpleStorage
    ✓ Should start with a favorite number of 0
    ✓ Should update when we call store


  11 passing (2s)



·------------------------------|----------------------------|-------------|-----------------------------·
|     Solc version: 0.8.17     ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······························|····························|·············|······························
|  Methods                     ·               57 gwei/gas                ·       1347.42 usd/eth       │
··················|············|··············|·············|·············|···············|··············
|  Contract       ·  Method    ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··················|············|··············|·············|·············|···············|··············
|  Lock           ·  withdraw  ·           -  ·          -  ·      34096  ·            7  ·       2.62  │
··················|············|··············|·············|·············|···············|··············
|  SimpleStorage  ·  store     ·           -  ·          -  ·      43724  ·            2  ·       3.36  │
··················|············|··············|·············|·············|···············|··············
|  Deployments                 ·                                          ·  % of limit   ·             │
·······························|··············|·············|·············|···············|··············
|  Lock                        ·           -  ·          -  ·     326016  ·        1.1 %  ·      25.04  │
·······························|··············|·············|·············|···············|··············
|  SimpleStorage               ·           -  ·          -  ·     562541  ·        1.9 %  ·      43.20  │
·------------------------------|--------------|-------------|-------------|---------------|-------------·
```

### Test Coverage

```
npx hardhat coverage
```

It should show something like the following output

``` shell

Version
=======
> solidity-coverage: v0.8.17

Instrumenting for coverage...
=============================

> Lock.sol
> SimpleStorage.sol

Compilation:
============

Generating typings for: 2 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 8 typings!
Compiled 2 Solidity files successfully

Network Info
============
> HardhatEVM: v2.11.2
> network:    hardhat



  Lock
    Deployment
      ✔ Should set the right unlockTime (372ms)
      ✔ Should set the right owner
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future (62ms)
    Withdrawals
      Validations
        ✔ Should revert with the right error if called too soon (46ms)
        ✔ Should revert with the right error if called from another account (46ms)
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it (42ms)
      Events
        ✔ Should emit an event on withdrawals (48ms)
      Transfers
        ✔ Should transfer the funds to the owner (54ms)

  SimpleStorage
    ✔ Should start with a favorite number of 0
    ✔ Should update when we call store (41ms)


  11 passing (912ms)

--------------------|----------|----------|----------|----------|----------------|
File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
 contracts/         |    85.71 |      100 |       80 |    81.82 |                |
  Lock.sol          |      100 |      100 |      100 |      100 |                |
  SimpleStorage.sol |       50 |      100 |    66.67 |       50 |          31,32 |
--------------------|----------|----------|----------|----------|----------------|
All files           |    85.71 |      100 |       80 |    81.82 |                |
--------------------|----------|----------|----------|----------|----------------|

```

# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` (You could use any testnet like kovan or rinkby) and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `KOVAN_RPC_URL`: This is url of the kovan testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
npx hardhat run scripts/deploy.ts --network goerli
```

## Estimate gas

You can estimate how much gas things cost by running:

```
npx hardhat test
```

And you'll see and output file called `gas-report.txt`

Example:

```
·------------------------------|----------------------------|-------------|-----------------------------·
|     Solc version: 0.8.17     ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······························|····························|·············|······························
|  Methods                     ·               57 gwei/gas                ·       1347.42 usd/eth       │
··················|············|··············|·············|·············|···············|··············
|  Contract       ·  Method    ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··················|············|··············|·············|·············|···············|··············
|  Lock           ·  withdraw  ·           -  ·          -  ·      34096  ·            7  ·       2.62  │
··················|············|··············|·············|·············|···············|··············
|  SimpleStorage  ·  store     ·           -  ·          -  ·      43724  ·            2  ·       3.36  │
··················|············|··············|·············|·············|···············|··············
|  Deployments                 ·                                          ·  % of limit   ·             │
·······························|··············|·············|·············|···············|··············
|  Lock                        ·           -  ·          -  ·     326016  ·        1.1 %  ·      25.04  │
·······························|··············|·············|·············|···············|··············
|  SimpleStorage               ·           -  ·          -  ·     562541  ·        1.9 %  ·      43.20  │
·------------------------------|--------------|-------------|-------------|---------------|-------------·
```



## References

This repo is based on the web3 freecodecamp course
[Freecodecamp JS Web3](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)