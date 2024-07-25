import React from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ArtistCollection, ArtistInterface } from "../../api/artist/artist";
import { ArtistList } from "../components/ArtistList";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";

export const Home = () => {
  const isLoading = useSubscribe("artists.allArtists");
  const artists = useFind(() => ArtistCollection.find({}, []));

  if (isLoading()) {
    return (
      <Container>
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  return (
    <Container className="pt-2">
      <Accordion alwaysOpen>
        {artists.map((artist: ArtistInterface) => {
          return <ArtistList artist={artist} key={artist._id} />;
        })}
      </Accordion>
    </Container>
  );
};
