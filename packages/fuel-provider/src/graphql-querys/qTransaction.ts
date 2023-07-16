import Transaction from '../graphql-types/Transaction';

import type { Hex } from '../types/PropTypes';

export function qTransaction({ transactionId }: { transactionId: Hex }) {
  return `
    query {
        transaction(id: "${transactionId}") {
            ${Transaction}
        }
    }
    `;
}
