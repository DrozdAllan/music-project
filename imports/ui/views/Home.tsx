import React from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ArtistCollection, ArtistInterface } from "../../api/artist/artist";
import { ArtistList } from "../components/ArtistList";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Home = () => {
  const isLoading = useSubscribe("artists.allArtists");
  const artists = useFind(() => ArtistCollection.find({}, []));

  if (isLoading()) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {artists.map((artist: ArtistInterface) => {
        return <ArtistList artist={artist} key={artist._id} />;
      })}
    </Box>
  );
};
