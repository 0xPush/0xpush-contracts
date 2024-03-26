create-wallet: 
	npx hardhat run scripts/create-wallet.ts

deploy-storage:
	npx hardhat run scripts/deploy-storage.ts --network

deploy-storage-mainnet:
	npx hardhat run scripts/deploy-storage.ts --network