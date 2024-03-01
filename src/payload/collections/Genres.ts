import { CollectionConfig } from "payload/types";

// import { TracksByGenre } from "../components/TracksByGenre";

export const Genres: CollectionConfig = {
  slug: "genres",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    // {
    //   name: "tracksByGenre",
    //   label: "Tracks by Genre",
    //   type: "ui",
    //   admin: {
    //     components: {
    //       Field: TracksByGenre,
    //     },
    //   },
    //   custom: {
    //     someProp: "someValue",
    //   },
    // },
  ],
};
