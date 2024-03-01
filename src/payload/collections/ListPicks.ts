import payload from "payload";
import { CollectionConfig } from "payload/types";

export const ListPicks: CollectionConfig = {
  slug: "list-picks",
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: "trackAndArtist",
  },
  fields: [
    {
      name: "track",
      type: "text",
      required: true,
    },
    {
      name: "artist",
      type: "relationship",
      relationTo: "artists",
      required: true,
    },
    {
      name: "trackAndArtist",
      type: "text",
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.trackAndArtist;
          },
        ],
        afterRead: [
          async ({ data }) => {
            const artistData = await payload.findByID({
              collection: "artists",
              id: data.artist,
            });
            return `${data.track || "Untitled"} by ${artistData.artistName || "Anonymous"}`;
          },
        ],
      },
    },
    {
      name: "genres",
      type: "relationship",
      relationTo: "genres",
      hasMany: true,
    },
  ],
};
