import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// 1x1 transparent GIF, used when a Sanity image field has no uploaded file yet
// (for example after importing content without its assets).
const PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const hasImage = (source: any): boolean =>
  Boolean(
    source &&
      (typeof source === "string" ||
        source.asset?._ref ||
        source.asset?._id ||
        source.asset?.url ||
        source._ref ||
        source._id)
  );

// Chainable stand-in that mirrors the builder API but always returns the placeholder.
const emptyBuilder: any = new Proxy(function () {}, {
  get: (_t, prop) => (prop === "url" ? () => PLACEHOLDER : () => emptyBuilder),
});

export function urlFor(source: any) {
  return hasImage(source) ? builder.image(source) : (emptyBuilder as ReturnType<typeof builder.image>);
}
