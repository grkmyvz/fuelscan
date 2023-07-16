import Dexie from 'dexie';

type IDBBlock = {
  hash: string;
  number: number;
  txCount: number;
  transactions: string[];
};
export class WebDatabase extends Dexie {
  blocks: Dexie.Table<IDBBlock>;

  constructor() {
    super('WebDatabase');
    this.version(1).stores({
      blocks: '++id, id, number, txCount, transactions',
    });
    this.blocks = this.table('blocks');
  }

  async clearDB() {
    const dataCount = await this.blocks.count();
    if (dataCount > 100) {
      const deleteCount = dataCount - 50;
      await this.blocks.orderBy('id').limit(deleteCount).delete();
    }
  }
}
