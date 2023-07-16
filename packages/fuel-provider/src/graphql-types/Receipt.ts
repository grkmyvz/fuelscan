import Contract from './Contract';

const Receipt = `
contract {
    ${Contract}
}
pc
is
to {
    ${Contract}
}
toAddress
amount
assetId
gas
param1
param2
val
ptr
digest
reason
ra
rb
rc
rd
len
receiptType
rawPayload
result
gasUsed
data
messageId
sender
recipient
nonce
contractId
`;

export default Receipt;
