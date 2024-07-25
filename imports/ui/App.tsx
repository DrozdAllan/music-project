import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Home } from "./views/Home";
import { ArtistController } from "../api/artist/artist";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toTitleCase } from "./utils";

export const App = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    ArtistController.createArtist.call({
      name: toTitleCase(name.trim()),
    });
    setName("");
    setShow(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary">
        <Container>
          <Navbar.Brand>Music-Project</Navbar.Brand>
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
        </Container>
      </Navbar>
      <Home />
    </>
  );
};
