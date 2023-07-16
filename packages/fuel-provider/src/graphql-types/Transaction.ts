import Contract from './Contract';
import Input from './Input';
import Output from './Output';
import TransactionStatus from './TransactionStatus';
import Receipt from './Receipt';

const Transaction = `
id
inputAssetIds
inputContracts {
    ${Contract}
}
gasPrice
gasLimit
maturity
txPointer
isScript
isCreate
isMint
inputs {
    ${Input}
}
outputs {
    ${Output}
}
witnesses
receiptsRoot
status {
    ${TransactionStatus}
}
receipts {
    ${Receipt}
}
script
scriptData
bytecodeWitnessIndex
bytecodeLength
salt
storageSlots
rawPayload
`;

export default Transaction;
