import { CollectionConfig } from "payload/types";

export const Artists: CollectionConfig = {
  slug: "artists",
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: "artistName",
  },
  fields: [
    {
      name: "artistName",
      type: "text",
    },
  ],
};
