import { Field } from "payload/types";

import { deepMerge } from "../utilities/deepMerge";
import formatSlug from "../utilities/formatSlug";

type Slug = (
  collection: string,
  fieldToUse?: string,
  unique?: boolean,
  overrides?: Partial<Field>
) => Field;

export const slugField: Slug = (
  collection,
  fieldToUse = "title",
  unique = true,
  overrides
) =>
  // deepMerge is used here to merge the default field with the overrides
  deepMerge<Field, Partial<Field>>(
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      unique,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug(collection, fieldToUse, unique)],
      },
    },
    overrides
  );
