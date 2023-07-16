import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Stack } from 'react-bootstrap';

import { handleReadTransactions } from '../helpers/backend';

import type { ITransactionInfo } from '../helpers/types';

export default function TransactionsComponent() {
  const [transactions, setTransactions] = useState<ITransactionInfo[]>([]);

  async function loopTransactions() {
    const transactions = await handleReadTransactions();
    setTransactions(transactions);
    setTimeout(loopTransactions, 1000);
  }

  useEffect(() => {
    loopTransactions();
  }, []);

  return (
    <Container fluid className="mt-3">
      <h3 className="text-white">Last Block Transactions</h3>
      <Stack direction="vertical" gap={3}>
        {transactions.map((transaction, index) => (
          <Link to={`/transaction/${transaction.hash}`} key={index}>
            <Card
              bg="dark"
              data-bs-theme="dark"
              style={{ minWidth: 150 }}
              border="success"
            >
              <Card.Body className="text-center">
                {transaction.blockNumber} | {transaction.hash}
              </Card.Body>
            </Card>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
