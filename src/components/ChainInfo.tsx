import { useEffect, useState } from 'react';
import { Card, Stack } from 'react-bootstrap';

import { handleChainInfo, handleNodeInfo } from '../helpers/backend';

import type { IChainInfo } from '../helpers/types';

export default function ChainInfoComponent() {
  const [chainInfo, setChainInfo] = useState<IChainInfo>();

  async function loopChainInfo() {
    const chainInfo = await handleChainInfo();
    setChainInfo((prevChainInfo) => ({
      ...prevChainInfo,
      name: chainInfo.name,
      latestBlock: chainInfo.latestBlock,
      baseChainHeight: chainInfo.baseChainHeight,
    }));
    setTimeout(loopChainInfo, 1000);
  }

  useEffect(() => {
    loopChainInfo();
    handleNodeInfo().then((nodeInfo) => {
      setChainInfo((prevChainInfo) => ({
        ...prevChainInfo,
        minGasPrice: nodeInfo.minGasPrice,
        maxTx: nodeInfo.maxTx,
        nodeVersion: nodeInfo.nodeVersion,
      }));
    });
  }, []);

  return (
    <Card border="success" bg="dark" data-bs-theme="dark" className="m-3">
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">{chainInfo?.name}</div>
          <div className="p-2 ms-auto">{chainInfo?.latestBlock}</div>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center"
        >
          <div className="p-2">
            Base Chain Height : {chainInfo?.baseChainHeight}
          </div>
          <div className="p-2">Min Gas Price : {chainInfo?.minGasPrice}</div>
          <div className="p-2">Max Tx : {chainInfo?.maxTx}</div>
          <div className="p-2">Node Version : {chainInfo?.nodeVersion}</div>
        </Stack>
      </Card.Body>
    </Card>
  );
}
