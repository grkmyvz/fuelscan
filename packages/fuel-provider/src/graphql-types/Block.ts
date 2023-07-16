import Header from '../graphql-types/Header';
import Consensus from '../graphql-types/Consensus';
import Transaction from '../graphql-types/Transaction';

const Block = `
id
header {
    ${Header}
}
consensus {
    ${Consensus}
}
transactions {
    ${Transaction}
}
`;

export default Block;
