import { Meteor } from "meteor/meteor";
import { ArtistCollection } from "./artist";

Meteor.publish("artists.allArtists", function () {
  return ArtistCollection.find({});
});
// Meteor.publish("posts.userPosts", function () {
//   return LabelCollection.find({ userId: this.userId });
// });
