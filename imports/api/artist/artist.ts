import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

export interface AlbumInterface {
  _id: string;
  name: string;
  releaseDate: Date;
  songs?: string[];
}

export interface ArtistInterface {
  _id?: string;
  name: string;
  albums: AlbumInterface[];
}

export const ArtistCollection = new Mongo.Collection<ArtistInterface>(
  "artists"
);

export const AlbumSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  songs: {
    type: Array,
    optional: true,
  },
  "songs.$": {
    type: String,
  },
});

export const ArtistSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
  },
  albums: {
    type: Array,
    optional: true,
  },
  "albums.$": {
    type: AlbumSchema,
  },
});

export const ArtistController = {
  // Create new Artist
  createArtist: new ValidatedMethod({
    name: "artists.createArtist",
    validate: ArtistSchema.validator(),
    run(args: { name: string; albums?: [] }) {
      const newArtist: ArtistInterface = {
        name: args.name,
        albums: [],
      };
      return ArtistCollection.insert(newArtist);
    },
  }),
  // Update Artist to add a new Album
  addAlbumToArtist: new ValidatedMethod({
    name: "artists.addAlbumToArtist",
    validate: null,
    run(args: { artistId: string; title: string; songs?: [] }) {
      const newAlbum: AlbumInterface = {
        _id: Math.floor(Math.random() * 1000).toString(),
        releaseDate: new Date(),
        name: args.title,
        songs: [],
      };
      return ArtistCollection.update(
        {
          _id: args.artistId,
        },
        {
          $push: {
            albums: newAlbum,
          },
        }
      );
    },
  }),
  // Update Artist to push a new song to an Album
  addSongToAlbum: new ValidatedMethod({
    name: "artists.addSongToAlbum",
    validate: null,
    run(args: { albumId: string; title: string }) {
      return ArtistCollection.update(
        { "albums._id": args.albumId },
        {
          $push: {
            "albums.$.songs": args.title,
          },
        }
      );
    },
  }),
  // Update Artist to pull a song from an Album
  deleteSongFromAlbum: new ValidatedMethod({
    name: "artists.deleteSongFromAlbum",
    validate: null,
    run(args: { albumId: string; title: string }) {
      return ArtistCollection.update(
        { "albums._id": args.albumId },
        {
          $pull: {
            "albums.$.songs": args.title,
          },
        }
      );
    },
  }),
  // Delete Artist
  deleteArtist: new ValidatedMethod({
    name: "artists.deleteArtist",
    validate: null,
    run(args: { artistId: string }) {
      return ArtistCollection.remove({
        _id: args.artistId,
      });
    },
  }),
};