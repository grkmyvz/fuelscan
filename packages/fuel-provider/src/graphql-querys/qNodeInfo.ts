import NodeInfo from '../graphql-types/NodeInfo';

export function qNodeInfo() {
  return `
    query {
        nodeInfo {
            ${NodeInfo}
        }
    }
    `;
}
