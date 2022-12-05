import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useRouter } from "next/router";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favorites() {
  const [favouritesList] = useAtom(favouritesAtom);
  
  if(!favouritesList) return null;

  return (
    <>
      {favouritesList.length > 0 ?

        <Row className="gy-4">{favouritesList.map(objID => (
          <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
        ))}</Row>

        :

        <Card>
          <Card.Body>
            <div>Nothing Here</div>Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      }
    </>
  )
}