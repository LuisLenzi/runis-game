import { Container } from './styles';

export function Loading({ show }) {
  return (
    <Container show={show}>
      <div className="loading-container">
        <div className="circle1" />
        <div className="circle2" />
      </div>
    </Container>
  );
}