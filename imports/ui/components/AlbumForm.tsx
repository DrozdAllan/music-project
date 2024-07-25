import React, { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { ArtistController } from "/imports/api/artist/artist";
import { toTitleCase } from "../utils";

interface AlbumFormProps {
  artistId: string;
  artistName: string;
}

export const AlbumForm = ({ artistId, artistName }: AlbumFormProps) => {
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
        title: toTitleCase(title.trim()),
      });
      setTitle("");
    }
  };

  return (
    <Form
      className="py-2"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="albumForm.ControlInput1">
        <Form.Label>Add a new album to {artistName}</Form.Label>
        <Stack direction="horizontal" gap={2}>
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
          <Button size="sm" variant="primary" type="submit">
            Confirm
          </Button>
        </Stack>
      </Form.Group>
    </Form>
  );
};
