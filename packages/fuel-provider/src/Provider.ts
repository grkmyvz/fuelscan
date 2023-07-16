import {
  qHealth,
  qChain,
  qBlock,
  qTransaction,
  qBalance,
  qContract,
  qContractBalance,
  qNodeInfo,
} from './graphql-querys';

import type {
  Hex,
  IBalance,
  IBlock,
  IChain,
  IContract,
  IContractBalance,
  IHealth,
  INodeInfo,
  ITransaction,
} from './types/PropTypes';

export class FuelProvider {
  readonly #url: string;

  constructor(url: string) {
    this.#url = url;
  }

  async #request(query: string, variables?: any) {
    const body = {
      query: query,
      variables: variables ? variables : null,
    };
    try {
      const response = await fetch(this.#url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('GraphQL Query Error: ', error);
    }
  }

  async getHealth(): Promise<IHealth> {
    const result = await this.#request(qHealth());
    return result.data;
  }

  async getChain(): Promise<IChain> {
    const result = await this.#request(qChain());
    return result.data.chain;
  }

  async getBlock({
    blockId,
    blockNumber,
  }: {
    blockId?: Hex;
    blockNumber?: string;
  }): Promise<IBlock> {
    if (!blockId && !blockNumber)
      throw new Error('blockId or blockNumber is required');
    const result = await this.#request(qBlock({ blockId, blockNumber }));
    return result.data.block;
  }

  async getTransaction({
    transactionId,
  }: {
    transactionId: Hex;
  }): Promise<ITransaction> {
    const result = await this.#request(qTransaction({ transactionId }));
    return result.data.transaction;
  }

  async getBalance({
    address,
    assetId,
  }: {
    address: Hex;
    assetId: Hex;
  }): Promise<IBalance> {
    const result = await this.#request(qBalance({ address, assetId }));
    return result.data.balance;
  }

  async getContract({ contractId }: { contractId: Hex }): Promise<IContract> {
    const result = await this.#request(qContract({ contractId }));
    return result.data.contract;
  }

  async getContractBalance({
    contractId,
    assetId,
  }: {
    contractId: Hex;
    assetId: Hex;
  }): Promise<IContractBalance> {
    const result = await this.#request(
      qContractBalance({ contractId, assetId })
    );
    return result.data.contractBalance;
  }

  async getNodeInfo(): Promise<INodeInfo> {
    const result = await this.#request(qNodeInfo());
    return result.data.nodeInfo;
  }

  async getCustomQuery(query: string, variables?: any): Promise<any> {
    const result = await this.#request(query, variables);
    return result.data;
  }
}
