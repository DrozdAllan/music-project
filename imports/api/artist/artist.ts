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
  // Remove Artist
  removeArtist: new ValidatedMethod({
    name: "artists.removeArtist",
    validate: null,
    run(args: { artistId: string }) {
      return ArtistCollection.remove({
        _id: args.artistId,
      });
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
  // Update Artist to remove an Album
  removeAlbumFromArtist: new ValidatedMethod({
    name: "artists.removeAlbumFromArtist",
    validate: null,
    run(args: { albumId: string }) {
      return ArtistCollection.update(
        {
          "albums._id": args.albumId,
        },
        {
          $pull: {
            albums: {
              _id: args.albumId,
            },
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
  // Update Artist to remove a song from an Album
  removeSongFromAlbum: new ValidatedMethod({
    name: "artists.removeSongFromAlbum",
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
};
