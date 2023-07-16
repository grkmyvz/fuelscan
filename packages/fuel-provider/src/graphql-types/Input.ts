import InputCoin from './InputCoin';
import InputContract from './InputContract';
import InputMessage from './InputMessage';

const Input = `
... on InputCoin {
    ${InputCoin}
}
... on InputContract {
    ${InputContract}
}
... on InputMessage {
    ${InputMessage}
}
`;

export default Input;
