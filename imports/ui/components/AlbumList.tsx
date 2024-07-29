import React from "react";
import { AlbumInterface, ArtistController } from "../../api/artist/artist";
import { SongForm } from "./SongForm";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

export const AlbumList = ({ album }: { album: AlbumInterface }) => {
  function removeSong(song: string) {
    ArtistController.removeSongFromAlbum.call({
      albumId: album._id,
      title: song,
    });
  }

  const removeAlbum = () => {
    ArtistController.removeAlbumFromArtist.call({
      albumId: album._id,
    });
  };

  return (
    <Accordion>
      <AccordionSummary className="fixedBg" expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1">
          {album.name} (
          {album.releaseDate.toLocaleDateString(undefined, {
            month: "numeric",
            year: "numeric",
          })}
          )
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={6}>
            <List dense>
              {album.songs!.map((song: string, index: number) => {
                return (
                  <ListItem key={index} divider>
                    <ListItemText primary={song} />
                    <IconButton onClick={() => removeSong(song)}>
                      <ClearIcon color="error" />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <SongForm albumId={album._id} albumName={album.name} />
              <Button variant="outlined" color="error" onClick={removeAlbum}>
                Remove Album
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
