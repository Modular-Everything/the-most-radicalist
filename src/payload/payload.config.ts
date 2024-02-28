import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

// import { CoreLibraries } from "./collections/CoreLibraries";
// import { Customers } from "./collections/Customers";
// import { Libraries } from "./collections/Libraries";
// import Users from "./collections/Users";

export default buildConfig({
  admin: {
    //   user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  // collections: [Users, Customers, Libraries, CoreLibraries],
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
