export type Hex = `0x${string}`;

export type IHealth = {
  health: boolean;
};

export type IChain = {
  name: string;
  latestBlock: IBlock;
  baseChainHeight: string;
  peerCount: number;
  consensusParameters: IConsensusParameters;
};

export type IBlock = {
  id: string;
  header: IHeader;
  consensus: IConsensus;
  transactions: ITransaction[];
};

export type ITransaction = {
  id: string;
  inputAssetIds: string[];
  inputContracts: IContract[];
  gasPrice: number;
  gasLimit: number;
  maturity: number;
  txPointer: string;
  isScript: boolean;
  isCreate: boolean;
  isMint: boolean;
  inputs: IInput[];
  outputs: IOutput[];
  witnesses: string;
  receiptsRoot: string;
  status: ITransactionStatus;
  recepipts: IReceipt[];
  script: string;
  scriptData: string;
  bytecodeWitnessIndex: number;
  bytecodeLength: number;
  salt: string;
  storageSlots: string[];
  rawPayload: string;
};

export type IConsensusParameters = {
  contractMaxSize: number;
  maxInputs: number;
  maxOutputs: number;
  maxWitnesses: number;
  maxGasPerTx: number;
  maxScriptLength: number;
  maxScriptDataLength: number;
  maxStorageSlots: number;
  maxPredicateLength: number;
  maxPredicateDataLength: number;
  gasPriceFactor: number;
  gasPerByte: number;
  maxMessageDataLength: number;
};

export type IHeader = {
  id: string;
  deHeight: number;
  transactionsCount: number;
  outputMessagesCount: number;
  transactionsRoot: string;
  outputMessagesRoot: string;
  height: number;
  prevRoot: string;
  time: string;
  applicationHash: string;
};

export type IConsensus = IGenesis | PoAConsensus;

export type IGenesis = {
  chainConfigHash: string;
  coinsRoot: string;
  contractsRoot: string;
  messagesRoot: string;
};

export type PoAConsensus = {
  signature: string;
};

export type IContract = {
  id: string;
  bytecode: string;
  salt: string;
};

export type IInput = IInputCoin | IInputContract | IInputMessage;

export type IInputCoin = {
  utxoId: string;
  owner: string;
  amount: number;
  assetId: string;
  txPointer: string;
  witnessIndex: number;
  maturity: number;
  predicate: string;
  predicateData: string;
};

export type IInputContract = {
  utxoId: string;
  balanceRoot: string;
  stateRoot: string;
  txPointer: string;
  contract: IContract;
};

export type IInputMessage = {
  messageId: string;
  sender: string;
  recipient: string;
  amount: number;
  nonce: number;
  witnessIndex: number;
  data: string;
  predicate: string;
  predicateData: string;
};

export type IOutput =
  | ICoinOutput
  | IContractOutput
  | IMessageOutput
  | IChangeOutput
  | IVariableOutput
  | IContractCreated;

export type ICoinOutput = {
  to: string;
  amount: number;
  assetId: string;
};

export type IContractOutput = {
  inputIndex: number;
  balanceRoot: string;
  stateRoot: string;
};

export type IMessageOutput = {
  recipient: string;
  amount: number;
};

export type IChangeOutput = {
  to: string;
  amount: number;
  assetId: string;
};

export type IVariableOutput = {
  to: string;
  amount: number;
  assetId: string;
};

export type IContractCreated = {
  contract: IContract;
  stateRoot: string;
};

export type ITransactionStatus =
  | ISubmittedStatus
  | ISuccessStatus
  | ISqueezedOutStatus
  | IFailureStatus;

export type ISubmittedStatus = {
  time: string;
};

export type ISuccessStatus = {
  time: string;
  programState: IProgramState;
};

export type ISqueezedOutStatus = {
  reason: string;
};

export type IFailureStatus = {
  time: string;
  reason: string;
  programState: IProgramState;
};

export type IProgramState = {
  returnType: string;
  data: string;
};

export type IReceipt = {
  contract: IContract;
  pc: number;
  is: number;
  to: IContract;
  toAddress: string;
  amount: number;
  assetId: string;
  gas: number;
  param1: number;
  param2: number;
  val: number;
  ptr: number;
  digest: string;
  reason: number;
  ra: number;
  rb: number;
  rc: number;
  rd: number;
  len: number;
  receiptType: string;
  rawPayload: string;
  result: number;
  gasUsed: number;
  data: string;
  messageId: string;
  sender: string;
  recipient: string;
  nonce: string;
  contractId: string;
};

export type IBalance = {
  owner: string;
  amount: number;
  assetId: string;
};

export type IContractBalance = {
  contract: string;
  amount: number;
  assetId: string;
};

export type INodeInfo = {
  utxoValidation: boolean;
  vmBacktrece: boolean;
  minGasPrice: number;
  maxTx: number;
  maxDepth: number;
  nodeVersion: string;
};
