import Block from '../graphql-types/Block';

import type { Hex } from '../types/PropTypes';

export function qBlock({
  blockId,
  blockNumber,
}: {
  blockId?: Hex;
  blockNumber?: string;
}) {
  if (blockId) {
    return `
    query {
        block(id: "${blockId}") {
            ${Block}
        }
    }
    `;
  } else if (blockNumber) {
    return `
    query {
        block(height: "${blockNumber}") {
            ${Block}
        }
    }`;
  } else {
    throw new Error('Use blockId or blockNumber.');
  }
}
