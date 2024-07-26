import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material/";
import { ArtistController } from "/imports/api/artist/artist";
import { toTitleCase } from "../utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface AlbumFormProps {
  artistId: string;
  artistName: string;
}

export const AlbumForm = ({ artistId, artistName }: AlbumFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // continue with the data
      ArtistController.addAlbumToArtist.call({
        artistId: artistId,
        title: toTitleCase(title.trim()),
      });
      setTitle("");
    }
  };

  return (
    <>
      <Typography>Add a new album to {artistName}</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <TextField
          label="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary">
          Add Album
        </Button>
      </Box>
    </>
  );
};
