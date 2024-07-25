import React, { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { ArtistController } from "/imports/api/artist/artist";
import { toTitleCase } from "../utils";

interface SongFormProps {
  albumId: string;
  albumName: string;
}

export const SongForm = ({ albumId, albumName }: SongFormProps) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setValidated(true);
      // continue with the data
      ArtistController.addSongToAlbum.call({
        albumId: albumId,
        title: toTitleCase(title.trim()),
      });
      setTitle("");
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="songForm.ControlInput1">
        <Form.Label>Add a new song to {albumName}</Form.Label>
        <Stack gap={2}>
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
