import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../components/Loading';

import { getTransactionData } from '../helpers/backend';

import type { ITransaction } from 'fuel-provider/dist/types/PropTypes';

export default function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTransactionData(id as string).then((transactionData) => {
      setTransaction(transactionData);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <TransactionDetailContent transaction={transaction} />
      )}
    </>
  );
}

export function TransactionDetailContent({
  transaction,
}: {
  transaction: ITransaction | undefined;
}) {
  return (
    <Card bg="dark" data-bs-theme="dark" className="m-3">
      <Card.Header>Transaction Hash: {transaction?.id}</Card.Header>
      <Card.Body>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(transaction, null, 2)}
        </pre>
      </Card.Body>
    </Card>
  );
}
