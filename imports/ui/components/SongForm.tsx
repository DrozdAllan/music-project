import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material/";
import { ArtistController } from "/imports/api/artist/artist";
import { toTitleCase } from "../utils";

interface SongFormProps {
  albumId: string;
  albumName: string;
}

export const SongForm = ({ albumId, albumName }: SongFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // continue with the data
      ArtistController.addSongToAlbum.call({
        albumId: albumId,
        title: toTitleCase(title.trim()),
      });
      setTitle("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <Typography>Add a new song to {albumName}</Typography>
      <TextField
        required
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Song
      </Button>
    </Box>
  );
};
