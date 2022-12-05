import { Card, Button } from "react-bootstrap";
import { favouritesAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "../lib/userData";
import Error from "next/error";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ArtworkCardDetail({objectID}) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  }

  if (error){ 
    return <Error statusCode={404} />
  }
  if (!data){ 
    return null;
  }

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            data.primaryImage
              ? data.primaryImage
              : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text><strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}
                    <strong>Classification: </strong> {data.classification ? data.classification : "N/A"}
                    <strong>Medium: </strong> {data.medium ? data.medium : "N/A"}
                    <br />
                    <br />
                    <strong>Artist: </strong>{data.artistDisplayName}{" "}{data.artistDisplayName ? (
              <Link href={data.artistWikidata_URL} target="_blank">
                (wiki)
              </Link>
            ) : (""
            )}
            <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"}
            <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}
            <br />
            <br />
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {" "}
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}