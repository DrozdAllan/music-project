import React from "react";
import {
  AlbumInterface,
  ArtistController,
  ArtistInterface,
} from "../../api/artist/artist";
import { AlbumList } from "./AlbumList";
import Accordion from "react-bootstrap/Accordion";
import { Button, Stack } from "react-bootstrap";
import { AlbumForm } from "./AlbumForm";

export const ArtistList = ({ artist }: { artist: ArtistInterface }) => {
  function deleteArtist() {
    ArtistController.deleteArtist.call({ artistId: artist._id! });
  }
  return (
    <Accordion.Item eventKey={artist._id!}>
      <Accordion.Header>
        <h4>{artist.name}</h4>
      </Accordion.Header>

      <Accordion.Body>
        <Stack>
          {artist.albums.map((album: AlbumInterface) => {
            return <AlbumList album={album} key={album._id} />;
          })}

          <AlbumForm artistId={artist._id!} artistName={artist.name} />

          <div className="text-center mt-2">
            <Button size="sm" variant="danger" onClick={deleteArtist}>
              Delete artist
            </Button>
          </div>
        </Stack>
      </Accordion.Body>
    </Accordion.Item>
  );
};
