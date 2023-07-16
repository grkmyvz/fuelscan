import ContractBalance from '../graphql-types/ContractBalance';

import type { Hex } from '../types/PropTypes';

export function qContractBalance({
  contractId,
  assetId,
}: {
  contractId: Hex;
  assetId: Hex;
}) {
  return `
    query {
        contractBalance(contract: "${contractId}", asset: "${assetId}") {
            ${ContractBalance}
        }
    }
    `;
}
