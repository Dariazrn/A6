import useSWR from 'swr'
import Error from 'next/error'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "../lib/userData";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ArtworkCardDetail(props) {

    const { data, error } = useSWR(
        props.objectID
          ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
          : null,
        fetcher
      );

      const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
      const [showAdded, setShowAdded] = useState(false);

      useEffect(() => {
        setShowAdded(favouritesList?.includes(props.objectID));
      }, [favouritesList]);

      async function favouritesClicked() {
        if (showAdded) {
          setFavouritesList(await removeFromFavourites(props.objectID));
          setShowAdded(false);
        } else {
          setFavouritesList(await addToFavourites(props.objectID));
          setShowAdded(true);
        }
      }
    
      if (error) return <Error statusCode={404} />;

        return (
            <>
                <Card>
                    {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} />}
                    
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong> {data?.objectDate ? data?.objectDate : 'N/A'}<br />
                            <strong>Classification: </strong> {data?.classification ? data?.classification : 'N/A'}<br />
                            <strong>Medium: </strong> {data?.medium ? data?.medium : 'N/A'}<br /><br />
                            <strong>Artist: </strong> {data?.artistDisplayName ? data?.artistDisplayName + " ": 'N/A'}
                            {data.artistDisplayName && (( <a href={data?.artistWikidata_URL} style={{textDecoration: 'none'}} target="_blank" rel="noreferrer" ><span style={{color: 'black'}}>( </span> <u>wiki</u> <span style={{color: 'black'}}> )</span></a>))}
                            <br />
                            <strong>Credit Line: </strong> {data?.creditLine ? data?.creditLine : 'N/A'}<br />
                            <strong>Dimensions: </strong> {data?.dimensions ? data?.dimensions : 'N/A'}<br />
                            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>+ Favourite {showAdded && "( added )"}</Button> 
                        </Card.Text>
       
                       
                    </Card.Body>
                </Card>
            </>
        );
    }