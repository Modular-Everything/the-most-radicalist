import { CollectionConfig } from "payload/types";

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
  ],
};
