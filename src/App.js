import React from 'react';
import { Container } from 'react-bootstrap';
import ExpressionForm from './components/ExpressionForm';

function App() {
  const handleSubmit = (data) => {
    console.log('Submitted Data:', data);
    // This is a simple console.log of data , in real world scenario it could be send to an API or store
  };
  return (
    <Container>
      <h1>Expression Engine UI</h1>
      <ExpressionForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
