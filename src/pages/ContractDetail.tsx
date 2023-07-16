import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../components/Loading';

import { getContractData } from '../helpers/backend';

import type { IContract } from 'fuel-provider/dist/types/PropTypes';

export default function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<IContract>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getContractData(id as string).then((contractData) => {
      setContract(contractData);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      {isLoading ? <Loading /> : <ContractDetailContent contract={contract} />}
    </>
  );
}

export function ContractDetailContent({
  contract,
}: {
  contract: IContract | undefined;
}) {
  return (
    <Card bg="dark" data-bs-theme="dark" className="m-3">
      <Card.Header>Contract Hash: {contract?.id}</Card.Header>
      <Card.Body>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(contract, null, 2)}
        </pre>
      </Card.Body>
    </Card>
  );
}
