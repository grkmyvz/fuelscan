import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, InputGroup, Button, Form } from 'react-bootstrap';
import Loading from '../components/Loading';

import { getBalanceData } from '../helpers/backend';

import type { IBalance } from 'fuel-provider/dist/types/PropTypes';

export default function AddressDetail() {
  const { id } = useParams<{ id: string }>();
  const [assetId, setAssetId] = useState<string>();
  const [content, setContent] = useState<JSX.Element[]>([
    <AddressBalanceContent
      key={1}
      address={id as string}
      assetId="0x0000000000000000000000000000000000000000000000000000000000000000"
    />,
  ]);

  async function handleAssetId() {
    if (assetId) {
      const newAddressBalanceContent = (
        <AddressBalanceContent
          key={content.length + 1}
          address={id as string}
          assetId={assetId}
        />
      );
      setContent((prevContent) => [...prevContent, newAddressBalanceContent]);
      setAssetId('');
    }
  }

  return (
    <Card bg="dark" data-bs-theme="dark" className="m-3">
      <Card.Header>Address: {id}</Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Asset Id"
            aria-label="Asset Id"
            aria-describedby="asset-id"
            onChange={(e) => setAssetId(e.target.value)}
          />
          <Button
            variant="outline-success"
            id="asset-id"
            onClick={handleAssetId}
          >
            Check Amount
          </Button>
        </InputGroup>
        {content}
      </Card.Body>
    </Card>
  );
}

export function AddressBalanceContent({
  address,
  assetId,
}: {
  address: string;
  assetId: string;
}) {
  const [balance, setBalance] = useState<IBalance>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBalanceData(address, assetId).then((balanceData) => {
      setBalance(balanceData);
      setIsLoading(false);
    });
  }, [address, assetId]);

  return (
    <Card className="mt-3">
      <Card.Body>
        <p>Asset Id: "{assetId}"</p>
        <hr />
        {isLoading ? (
          <Loading />
        ) : (
          <pre>{JSON.stringify(balance, null, 2)}</pre>
        )}
      </Card.Body>
    </Card>
  );
}
