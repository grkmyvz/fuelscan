import Genesis from './Genesis';
import PoAConsensus from './PoAConsensus';
const Consensus = `
... on Genesis {
    ${Genesis}
}
... on PoAConsensus {
    ${PoAConsensus}
}
`;

export default Consensus;
