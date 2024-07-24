import { Meteor } from "meteor/meteor";
import { ArtistCollection } from "../imports/api/artist/artist";
import { mockArtist1 } from "/mockArtists";
import "../imports/api/artist/publications";

function importMock() {
  ArtistCollection.insert(mockArtist1);
  // ArtistCollection.insert(mockArtist2);
}

Meteor.startup(async () => {
  // If the Label collection is empty, add some data.
  if ((await ArtistCollection.find().countAsync()) === 0) {
    importMock();
  }
});
