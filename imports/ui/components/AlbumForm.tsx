import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material/";
import { ArtistController } from "/imports/api/artist/artist";
import { toTitleCase } from "../utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface AlbumFormProps {
  artistId: string;
  artistName: string;
}

export const AlbumForm = ({ artistId, artistName }: AlbumFormProps) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [releaseDate, setReleaseDate] = React.useState<Dayjs | null>(dayjs(""));
  const [dateError, setDateError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    } else {
      setTitleError(false);
    }

    if (!releaseDate?.isValid()) {
      setDateError(true);
      valid = false;
    } else {
      setDateError(false);
    }

    if (valid) {
      // continue with the data
      ArtistController.addAlbumToArtist.call({
        artistId: artistId,
        title: toTitleCase(title.trim()),
        releaseDate: releaseDate?.toDate(),
      });
      setTitle("");
      setReleaseDate(dayjs(""));
    }
  };

  return (
    <>
      <Typography sx={{ pt: 1 }}>Add a new album to {artistName}</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          helperText={titleError ? "Title is required" : ""}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={releaseDate}
            onChange={(newDate) => setReleaseDate(newDate)}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                required: true,
                error: dateError,
                helperText: dateError ? "Date is required" : "",
              },
            }}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary">
          Add Album
        </Button>
      </Box>
    </>
  );
};
