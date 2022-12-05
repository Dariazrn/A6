import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { removeToken, readToken } from "../lib/authenticate";
function MainNav() {

   const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout() {
    setExpanded(false);
    removeToken();
    router.push("/login");
  }
  async function submitForm(e) {
    e.preventDefault();

    if (searchField != "") {

      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
      setExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    }

  }

  let token = readToken();

  const toggle = () => {
    setExpanded((isExpanded) => !isExpanded);
  };
  
  return (
    <>
    <Navbar className='fixed-top navbar-dark bg-primary' bg="dark" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand >Daria Zyrianova</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle}/>
        <Navbar.Collapse id="basic-navbar-nav">
          
        <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={toggle}>Home</Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link onClick={toggle}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                </Form>
              </>
            )}

            {token && (
              <Nav>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={toggle}>
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={toggle}>
                      Search History
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}

            <Nav>
              {!token && (
                <>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link onClick={toggle}>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link onClick={toggle}>Log In</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;