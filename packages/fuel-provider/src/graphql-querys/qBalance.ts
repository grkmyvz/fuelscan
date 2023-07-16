import type { Hex } from '../types/PropTypes';

export function qBalance({ address, assetId }: { address: Hex; assetId: Hex }) {
  return `
  query {
    balance(owner: "${address}", assetId: "${assetId}") {
      owner
      amount
      assetId
    }
  }
  `;
}
