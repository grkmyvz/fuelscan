import CoinOutput from './CoinOutput';
import ContractOutput from './ContractOutput';
import MessageOutput from './MessageOutput';
import ChangeOutput from './ChangeOutput';
import VariableOutput from './VariableOutput';
import ContractCreated from './ContractCreated';

const Output = `
... on CoinOutput {
    ${CoinOutput}
}
... on ContractOutput {
    ${ContractOutput}
}
... on MessageOutput {
    ${MessageOutput}
}
... on ChangeOutput {
    ${ChangeOutput}
}
... on VariableOutput {
    ${VariableOutput}
}
... on ContractCreated {
    ${ContractCreated}
}
`;

export default Output;
