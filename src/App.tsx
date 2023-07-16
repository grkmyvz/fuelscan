import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { handleBlocks } from './helpers/backend';

import HomePage from './pages/HomePage';
import TransactionDetail from './pages/TransactionDetail';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import BlockDetail from './pages/BlockDetail';
import AddressDetail from './pages/AddressDetail';
import ContractDetail from './pages/ContractDetail';

export default function App() {
  useEffect(() => {
    handleBlocks(0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/block/:id" element={<BlockDetail />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/address/:id" element={<AddressDetail />} />
          <Route path="/contract/:id" element={<ContractDetail />} />
          <Route path="/not-found/:id" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
