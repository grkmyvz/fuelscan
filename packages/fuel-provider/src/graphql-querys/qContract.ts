import Contract from '../graphql-types/Contract';

import type { Hex } from '../types/PropTypes';

export function qContract({ contractId }: { contractId: Hex }) {
  return `
    query {
        contract(id: "${contractId}") {
            ${Contract}
        }
    }
    `;
}
