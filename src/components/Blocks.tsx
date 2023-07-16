import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Stack, Container } from 'react-bootstrap';

import { handleReadBlocks } from '../helpers/backend';

import type { IBlockInfo } from '../helpers/types';

export default function BlocksComponent() {
  const [blockInfos, setBlockInfos] = useState<IBlockInfo[]>([]);

  async function loopBlocks() {
    const blocks = await handleReadBlocks();
    setBlockInfos(blocks);
    setTimeout(loopBlocks, 1000);
  }

  useEffect(() => {
    loopBlocks();
  }, []);

  return (
    <Container fluid>
      <h3 className="text-white">Blocks</h3>
      <Stack
        direction="horizontal"
        gap={3}
        style={{ overflowX: 'scroll', paddingBottom: 10 }}
      >
        {blockInfos.map((block, index) => (
          <Link to={`/block/${block.number}`} key={index}>
            <Card
              bg="dark"
              data-bs-theme="dark"
              style={{ minWidth: 150 }}
              border="success"
            >
              <Card.Body className="text-center">
                <p>{block.number}</p>
                <p>
                  {block.hash.slice(0, 4)}...{block.hash.slice(-4)}
                </p>
                <p>Tx Count: {block.txCount}</p>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
