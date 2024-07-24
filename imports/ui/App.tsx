import React, { useState } from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import {
  ArtistCollection,
  ArtistController,
  ArtistInterface,
} from "../api/artist/artist";
import { ArtistList } from "./components/ArtistList";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const App = () => {
  const isLoading = useSubscribe("artists.allArtists");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log("form is okay");
    ArtistController.createArtist.call({
      name: name,
      // albums: ,
    });
    setShow(false);
  };

  const artists = useFind(() => ArtistCollection.find({}, []));

  if (isLoading()) {
    return <h3>LOADING...</h3>;
  }

  return (
    <>
      <h3>These are the artists working under the Sony Music UK Label</h3>
      <Button variant="primary" onClick={handleShow}>
        Add A New Artist
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="artistForm.ControlInput1">
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                autoFocus
                placeholder="Artist or Band Name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion alwaysOpen>
        {artists.map((artist: ArtistInterface) => {
          return <ArtistList artist={artist} key={artist._id} />;
        })}
      </Accordion>
    </>
  );
};
