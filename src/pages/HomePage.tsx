import ChainInfoComponent from '../components/ChainInfo';
import SearchComponent from '../components/Search';
import BlocksComponent from '../components/Blocks';
import TransactionsComponent from '../components/Transactions';

export default function HomePage() {
  return (
    <>
      <ChainInfoComponent />
      <SearchComponent />
      <BlocksComponent />
      <TransactionsComponent />
    </>
  );
}
