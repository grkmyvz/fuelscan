import Block from '../graphql-types/Block';
import ConsensusParameters from '../graphql-types/ConsensusParameters';

export function qChain() {
  return `
    query {
        chain {
            name
            latestBlock {
                ${Block}
            }
            baseChainHeight
            peerCount
            consensusParameters {
                ${ConsensusParameters}
            }
        }
    }
    `;
}
