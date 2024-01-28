import React, { useState } from 'react';
import { Form, Button, Row, Col, Dropdown, FormControl } from 'react-bootstrap';

const ExpressionForm = ({ onSubmit }) => {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([
    { ruleType: 'Age', operator: '>', value: '', score: '' },
  ]);

  const handleConnectorChange = (e) => {
    setConnectorType(e);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = expressions.filter((_, i) => i !== index);
    setExpressions(updatedExpressions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ connectorType, expressions });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="connectorType">
        <Form.Label column sm="2">
          Connector Type
        </Form.Label>
        <Col sm="10">
          <Dropdown onSelect={handleConnectorChange}>
            <Dropdown.Toggle variant="success" id="dropdown-connector">
              {connectorType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="AND">AND</Dropdown.Item>
              <Dropdown.Item eventKey="OR">OR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Form.Group>

      {expressions.map((expression, index) => (
        <div key={index}>
          <Form.Group as={Row} controlId={`ruleType-${index}`}>
            <Form.Label column sm="2">
              Rule Type
            </Form.Label>
            <Col sm="4">
              <Form.Control
                as="select"
                value={expression.ruleType}
                onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}
              >
                <option>Age</option>
                <option>Credit Score</option>
                <option>Account Balance</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId={`operator-${index}`}>
            <Form.Label column sm="2">
              Operator
            </Form.Label>
            <Col sm="4">
              <Form.Control
                as="select"
                value={expression.operator}
                onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}
              >
                <option>{'>'}</option>
                <option>{'<'}</option>
                <option>{'>='}</option>
                <option>{'<='}</option>
                <option>{'='}</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId={`value-${index}`}>
            <Form.Label column sm="2">
              Value
            </Form.Label>
            <Col sm="4">
              <FormControl
                type="text"
                value={expression.value}
                onChange={(e) => handleExpressionChange(index, 'value', e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId={`score-${index}`}>
            <Form.Label column sm="2">
              Score
            </Form.Label>
            <Col sm="4">
              <FormControl
                type="text"
                value={expression.score}
                onChange={(e) => handleExpressionChange(index, 'score', e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="danger" onClick={() => handleDeleteExpression(index)}>
            Delete
          </Button>
        </div>
      ))}

      <Button variant="primary" onClick={handleAddExpression}>
        Add Expression
      </Button>

      <Button type="submit" variant="success">
        Submit
      </Button>
    </Form>
  );
};

export default ExpressionForm;
