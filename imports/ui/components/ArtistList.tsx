import React from "react";
import {
  AlbumInterface,
  ArtistController,
  ArtistInterface,
} from "../../api/artist/artist";
import { AlbumList } from "./AlbumList";
import Accordion from "react-bootstrap/Accordion";
import { Button, Col, Row } from "react-bootstrap";
import { AlbumForm } from "./AlbumForm";

export const ArtistList = ({ artist }: { artist: ArtistInterface }) => {
  function deleteArtist() {
    ArtistController.deleteArtist.call({ artistId: artist._id! });
  }
  return (
    <Accordion.Item eventKey={artist._id!}>
      <Accordion.Header>
        <h4>{artist.name}</h4>
      </Accordion.Header>

      <Accordion.Body>
        <Row>
          <Col>
            {artist.albums.map((album: AlbumInterface) => {
              return <AlbumList album={album} key={album._id} />;
            })}
          </Col>
          <Col>
            <AlbumForm artistId={artist._id!} />
            <Button variant="danger" onClick={deleteArtist}>
              Delete artist
            </Button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};
