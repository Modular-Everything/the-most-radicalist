import payload from "payload";
import { FieldHook } from "payload/types";
import slugify from "slugify";

const format = (val: string): string =>
  slugify(val, {
    lower: true,
    strict: true,
  });

async function isTitleFound(slug: string, collection: string, id: string) {
  const titleFound = await payload.find({
    collection,
    where: {
      slug: {
        equals: slug,
      },
      id: {
        not_equals: id,
      },
    },
  });

  if (titleFound.docs.length > 0) return true;
  return false;
}

async function getUniqueSlug(slug: string, collection: string, id: string) {
  let i = 2;
  let isFound = await isTitleFound(slug, collection, id);
  const regex = /^.*-\d+$/;

  while (isFound) {
    if (regex.test(slug)) {
      const match = slug.match(regex);
      if (match) {
        i = parseInt(match[0].split("-").pop()) + 1;
      }
      slug = slug.replace(/\d+$/, "");
      slug += `${i}`;
    } else {
      slug += `-${i}`;
    }
    isFound = await isTitleFound(slug, collection, id);
  }

  return slug;
}

const formatSlug =
  (collection: string, fallback: string, unique: boolean): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    const { id } = originalDoc;

    if (typeof value === "string") {
      if (!unique) return format(value);
      return getUniqueSlug(format(value), collection, id);
    }

    if (operation === "create") {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        if (!unique) return format(fallbackData);
        return getUniqueSlug(format(fallbackData), collection, id);
      }
    }

    return value;
  };

export default formatSlug;
