import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useRouter } from "next/router";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favorites() {
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null; 

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length == 0 ? (
          <Card>
            <h4>Nothing Here. Try adding some new artwork to the list.</h4>
          </Card>
        ) : (

          favouritesList.map((objectIDs) => (
            <Col lg={3} key={objectIDs}>
              <ArtworkCard objectID={objectIDs} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}