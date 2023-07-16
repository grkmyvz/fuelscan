import Contract from './Contract';

const InputContract = `
utxoId
balanceRoot
stateRoot
txPointer
contract {
    ${Contract}
}
`;

export default InputContract;
