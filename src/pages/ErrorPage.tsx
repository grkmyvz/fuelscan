import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function ErrorPage() {
  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="display-1 text-white">404</h1>
          <p className="lead text-white">
            Oops! The page you were looking for could not be found.
          </p>
          <Link to="/">
            <Button variant="secondary">Home Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
