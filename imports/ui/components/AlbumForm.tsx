import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ArtistController } from "/imports/api/artist/artist";

interface AlbumFormProps {
  artistId: string;
}

export const AlbumForm = ({ artistId }: AlbumFormProps) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setValidated(true);
      // continue with the data
      ArtistController.addAlbumToArtist.call({
        artistId: artistId,
        title: title.trim(),
      });
      setTitle("");
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="albumForm.ControlInput1">
        <Form.Label>Add a new album to this artist</Form.Label>
        <Form.Control
          required
          size="sm"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Title is required
        </Form.Control.Feedback>
      </Form.Group>

      <Button size="sm" variant="primary" type="submit">
        Confirm
      </Button>
    </Form>
  );
};
