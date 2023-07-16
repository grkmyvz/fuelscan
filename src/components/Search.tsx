import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

import { checkInput } from '../helpers/backend';

/*
Example Block Number: 1394096
Example Block Hash: 0xc735831916f33f0402bef1063ed3f9324c946f2dbd86a736adb6ebc4073d67c8
Example Transaction: 0x875c4c905909401edbbaee6f1ea02f7fdf6de612378f1ffd49db88da81713d06
Example Address: 0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871
Example Contract: 0xa46e7ec74b94223616ad3cea2bfea8e3d4003b87f0a189bc5fed93e03e946943
*/

export default function SearchComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function routeSearch(e: any) {
    setIsLoading(true);
    const searchInput = e.target.previousSibling.value;
    const inputType = await checkInput(searchInput);
    navigate(`/${inputType}/${searchInput}`);
  }

  return (
    <Form className="d-flex m-3">
      <Form.Control
        type="search"
        placeholder="Block Number | Block Hash | Transaction Hash | Address | Contract Id"
        className="me-2"
        aria-label="Search"
      />
      <Button
        variant="outline-success"
        onClick={routeSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </>
        ) : (
          'Search'
        )}
      </Button>
    </Form>
  );
}
