import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";

import { Artists } from "./collections/Artists";
import { Genres } from "./collections/Genres";
import { ListPicks } from "./collections/ListPicks";

// import { CoreLibraries } from "./collections/CoreLibraries";
// import { Customers } from "./collections/Customers";
// import { Libraries } from "./collections/Libraries";
// import Users from "./collections/Users";

export default buildConfig({
  admin: {
    //   user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  // collections: [Users, Customers, Libraries, CoreLibraries],
  collections: [Artists, ListPicks, Genres],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
});
