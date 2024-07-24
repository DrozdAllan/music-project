import { Meteor } from "meteor/meteor";
import { ArtistCollection } from "./artist";

Meteor.publish("artists.allArtists", function () {
  return ArtistCollection.find({});
});
