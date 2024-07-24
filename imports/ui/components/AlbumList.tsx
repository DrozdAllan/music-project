import React from "react";
import { AlbumInterface, ArtistController } from "../../api/artist/artist";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { SongForm } from "./SongForm";
import { Col, Row } from "react-bootstrap";

export const AlbumList = ({ album }: { album: AlbumInterface }) => {
  function removeSong(song: string) {
    console.log("song to remove: ", song);
    ArtistController.deleteSongFromAlbum.call({
      albumId: album._id,
      title: song,
    });
  }

  return (
    <Accordion.Item eventKey={album._id}>
      <Accordion.Header>
        {album.name} (
        {album.releaseDate.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })}
        )
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col>
            <ListGroup>
              {album.songs!.map((song: string) => {
                return (
                  <ListGroup.Item key={song}>
                    <span>{song}</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeSong(song)}
                    >
                      x
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>
            <SongForm albumId={album._id} />
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};
