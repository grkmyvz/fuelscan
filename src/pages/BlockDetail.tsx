import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, Tabs, Tab } from 'react-bootstrap';
import Loading from '../components/Loading';

import { getBlockData } from '../helpers/backend';

import type { IBlock } from 'fuel-provider/dist/types/PropTypes';

export default function BlockDetail() {
  const { id } = useParams<{ id: string }>();
  const [block, setBlock] = useState<IBlock>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBlockData(id as string).then((blockData) => {
      setBlock(blockData);
      setIsLoading(false);
    });
  }, [id]);

  return <>{isLoading ? <Loading /> : <BlockDetailContent block={block} />}</>;
}

export function BlockDetailContent({ block }: { block: IBlock | undefined }) {
  return (
    <Card bg="dark" data-bs-theme="dark" className="m-3">
      <Card.Header>
        Block Hash: {block?.id}
        <span className="float-end">Block Number: {block?.header.height}</span>
      </Card.Header>
      <Card.Body>
        <Tabs
          defaultActiveKey="transactions"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="transactions"
            title={`Transactions (Count : ${block?.transactions.length})`}
          >
            <ListGroup variant="flush">
              {block?.transactions.map((tx, index) => (
                <ListGroup.Item key={index}>
                  <Link to={`/transaction/${tx.id}`}>{tx.id}</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
          <Tab eventKey="allBlockData" title="All Block Data">
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(block, null, 2)}
            </pre>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}
