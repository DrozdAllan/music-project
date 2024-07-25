import React from "react";
import { AlbumInterface, ArtistController } from "../../api/artist/artist";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { SongForm } from "./SongForm";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const AlbumList = ({ album }: { album: AlbumInterface }) => {
  function removeSong(song: string) {
    ArtistController.deleteSongFromAlbum.call({
      albumId: album._id,
      title: song.trim(),
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
                  <ListGroup.Item
                    key={song}
                    className="d-flex justify-content-between"
                  >
                    <span>{song}</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeSong(song)}
                    >
                      <FontAwesomeIcon className="fa-xs" icon={faXmark} />
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>
            <SongForm albumId={album._id} albumName={album.name} />
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};
