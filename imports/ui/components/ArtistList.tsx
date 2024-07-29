import React from "react";
import {
  AlbumInterface,
  ArtistController,
  ArtistInterface,
} from "../../api/artist/artist";
import { AlbumList } from "./AlbumList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { AlbumForm } from "./AlbumForm";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";

export const ArtistList = ({ artist }: { artist: ArtistInterface }) => {
  function removeArtist() {
    ArtistController.removeArtist.call({ artistId: artist._id! });
  }
  return (
    <Accordion>
      <AccordionSummary className="fixedBg" expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{artist.name}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            {artist.albums.map((album: AlbumInterface) => {
              return <AlbumList album={album} key={album._id} />;
            })}
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <AlbumForm artistId={artist._id!} artistName={artist.name} />

              <Button variant="outlined" color="error" onClick={removeArtist}>
                Remove artist
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
