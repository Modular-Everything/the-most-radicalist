// @ts-nocheck

/**
 * Checks if the given item is an object.
 *
 * @param item - The item to check.
 * @returns `true` if the item is an object, `false` otherwise.
 */
export function isObject(item: unknown): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deeply merges two objects.
 *
 * @template T - The type of the target object.
 * @template R - The type of the source object.
 * @param {T} target - The target object to merge into.
 * @param {R} source - The source object to merge from.
 * @returns {T} - The merged object.
 */
export function deepMerge<T, R>(target: T, source: R): T {
  // Create a new object that is a copy of the target object
  const output = { ...target };

  // Check if both the target and source objects are objects
  if (isObject(target) && isObject(source)) {
    // Iterate over each key in the source object
    Object.keys(source).forEach((key) => {
      // Check if the value of the key in the source object is an object
      if (isObject(source[key])) {
        // If the key does not exist in the target object, add it with the value from the source object
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          // If the key exists in both the target and source objects, recursively merge the values
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        // If the value of the key in the source object is not an object, assign it directly to the output object
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  // Return the merged object
  return output;
}
