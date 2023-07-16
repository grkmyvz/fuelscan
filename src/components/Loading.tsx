import { Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        role="status"
        variant="success"
        className="m-3"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
