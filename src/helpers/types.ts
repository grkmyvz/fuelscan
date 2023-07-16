export type IChainInfo = {
  name?: string;
  latestBlock?: number;
  baseChainHeight?: string;
  minGasPrice?: number;
  maxTx?: number;
  nodeVersion?: string;
};

export type IBlockInfo = {
  hash: string;
  number: number;
  txCount: number;
  transactions: string[];
};

export type ITransactionInfo = {
  hash: string;
  blockNumber: number;
};
