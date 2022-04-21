# Minimal hardhat/typechain/openzeppelin starter

## Dev Setup

```bash
nvm use
yarn
```

## Generate typechain bindings

```bash
yarn hardhat typechain
```

## Run tests

```bash
yarn hardhat test
```

## Deploy contract a a local environment

Start up the hardhat node (in it's own terminal):

```bash
yarn hardhat node
```

Run the deploy script:

```bash
yarn hardhat run scripts/deploys/local.ts --network localhost
```

## Setup .env

```bash
cp sample_dot_env .env
```

Then edit to add in keys

## Ethernaut

1. Deploy the new contract

    ```bash
    yarn hardhat run scripts/deploys/local.ts --network rinkeby
    ```

2. Create/run script to invoke the new contract on the external network.

    ```bash
    yarn hardhat run scripts/ethernaut/3_coin_flip.ts --network rinkeby
    ```

## Local Fork

Can run a local network which forks a current snapshot, eg:

```bash
yarn hardhat node --fork https://rinkeby.infura.io/v3/24ca35f5760c4f96ba344aeb8af69590
```

Where the ID is the infura project key (rate limited).