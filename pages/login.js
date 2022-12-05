import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from 'next/router';
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory} from "../lib/userData";
import { useAtom } from "jotai";


export default function Login(props) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function submitForm(e) {
    e.preventDefault();

    try {
      await authenticateUser(userName, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <div>Login</div>Enter your login information below:
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
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
        <br />
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
      </Form>
    </>
  );
}
