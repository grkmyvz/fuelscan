import { FuelProvider } from 'fuel-provider';
import { WebDatabase } from './cache';

import type { IChainInfo, IBlockInfo, ITransactionInfo } from './types';
import {
  Hex,
  IBalance,
  IBlock,
  ITransaction,
} from 'fuel-provider/dist/types/PropTypes';

const provider = new FuelProvider('https://beta-3.fuel.network/graphql');
const db = new WebDatabase();

clearDB();

async function clearDB() {
  const intervalId = setInterval(async () => {
    db.clearDB();
  }, 5000);
  return () => clearInterval(intervalId);
}

export async function handleChainInfo(): Promise<IChainInfo> {
  const chainQuery = `
  query {
    chain {
      name
      latestBlock {
        header {
          height
        }
      }
      baseChainHeight
    }
  }
  `;

  const { chain } = await provider.getCustomQuery(chainQuery);

  return {
    name: chain.name,
    latestBlock: chain.latestBlock.header.height,
    baseChainHeight: chain.baseChainHeight,
  };
}

export async function handleNodeInfo(): Promise<IChainInfo> {
  const nodeInfo = await provider.getNodeInfo();
  return {
    minGasPrice: nodeInfo.minGasPrice,
    maxTx: nodeInfo.maxTx,
    nodeVersion: nodeInfo.nodeVersion,
  };
}

export async function handleBlocks(blockNumber: number) {
  if (blockNumber === 0) {
    const { latestBlock } = await handleChainInfo();
    blockNumber = (latestBlock as number) - 1;
  }
  const blockQuery = `
    query {
      block(height: "${blockNumber}") {
        id
        transactions {
          id
        }
      }
    }
    `;
  try {
    const { block } = await provider.getCustomQuery(blockQuery);
    if (block !== null) {
      const transactionIds = block.transactions.map(
        (transaction: any) => transaction.id
      );
      const existingBlock = await db.blocks
        .where('number')
        .equals(Number(blockNumber))
        .first();
      if (!existingBlock) {
        await db.blocks.add({
          hash: block.id,
          number: Number(blockNumber),
          txCount: block.transactions.length,
          transactions: transactionIds,
        });
      }
      setTimeout(() => {
        handleBlocks(blockNumber + 1);
      }, 500);
    } else {
      setTimeout(() => {
        handleBlocks(blockNumber);
      }, 500);
    }
  } catch (err) {
    setTimeout(() => {
      handleBlocks(blockNumber);
    }, 500);
    console.error(err);
  }
}

export async function handleReadBlocks(): Promise<IBlockInfo[]> {
  const blocks = await db.blocks.reverse().limit(20).toArray();
  if (blocks.length === 0) return [];
  let cacheBlocks: IBlockInfo[] = [];
  // TODO: is coming from behind.
  blocks.map((block) => {
    cacheBlocks.push({
      hash: block.hash,
      number: block.number,
      txCount: block.txCount,
      transactions: block.transactions,
    });
  });
  return cacheBlocks;
}

export async function handleReadTransactions(): Promise<ITransactionInfo[]> {
  const blocks = await db.blocks.reverse().limit(1).toArray();
  if (blocks.length === 0) return [];
  const transactions = blocks
    .map((block) => {
      return block.transactions.map((transaction) => {
        return {
          hash: transaction,
          blockNumber: block.number,
        };
      });
    })
    .flat();
  return transactions;
}

export async function getBlockData(id: string): Promise<IBlock> {
  if (id?.startsWith('0x') && id?.length === 66) {
    return await provider.getBlock({ blockId: id as Hex });
  } else if (!isNaN(Number(id))) {
    console.log('test');
    return await provider.getBlock({ blockNumber: id });
  } else {
    window.location.href = `/not-found`;
    throw new Error('Invalid block id');
  }
}

export async function getTransactionData(id: string): Promise<ITransaction> {
  if (id?.startsWith('0x') && id?.length === 66) {
    return await provider.getTransaction({ transactionId: id as Hex });
  } else {
    window.location.href = `/not-found`;
    throw new Error('Invalid transaction id');
  }
}

export async function getContractData(id: string): Promise<any> {
  if (id?.startsWith('0x') && id?.length === 66) {
    return await provider.getContract({ contractId: id as Hex });
  } else {
    window.location.href = `/not-found`;
    throw new Error('Invalid contract id');
  }
}

export async function getBalanceData(
  id: string,
  assetId: string
): Promise<IBalance> {
  return await provider.getBalance({
    address: id as Hex,
    assetId: assetId as Hex,
  });
}

export async function checkInput(id: string): Promise<string> {
  const blockNumberQuery = `
    query {
      block(height: "${id}") {
        id
      }
    }`;
  const blockNumber = await provider.getCustomQuery(blockNumberQuery);
  if (blockNumber !== null) {
    return 'block';
  }

  const blockHashQuery = `
    query {
      block(id: "${id}") {
        id
      }
    }`;
  const blockHash = await provider.getCustomQuery(blockHashQuery);
  if (blockHash && blockHash.block !== null) {
    return 'block';
  }

  const transactionQuery = `
    query {
      transaction(id: "${id}") {
        id
      }
    }`;
  const transaction = await provider.getCustomQuery(transactionQuery);
  if (transaction && transaction.transaction !== null) {
    return 'transaction';
  }

  const contractQuery = `
      query {
        contract(id: "${id}") {
          id
        }
      }`;
  const contract = await provider.getCustomQuery(contractQuery);
  if (contract && contract.contract !== null) {
    return 'contract';
  }

  const accountQuery = `
      query {
        balance(owner: "${id}", assetId: "0x0000000000000000000000000000000000000000000000000000000000000000") {
          owner
        }
      }`;
  const account = await provider.getCustomQuery(accountQuery);
  if (account && account.balance !== null) {
    return 'address';
  } else {
    return 'not-found';
  }
}
