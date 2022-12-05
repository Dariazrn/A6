import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { registerUser } from "../lib/authenticate";
import { useRouter } from 'next/router';
import { useAtom } from "jotai";

export default function Register(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault();
    try {
      await registerUser(userName, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <div>Register</div>Enter your register information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="userName"
            name="userName"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            value={password2}
            type="password"
            id="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <br />

        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
        <br />
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
      </Form>
    </>
  );
}
