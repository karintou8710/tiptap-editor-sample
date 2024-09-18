export const BASE_STATIC_PATH =
  typeof process !== "undefined" && process.env.GITHUB_PAGES
    ? "/tiptap-editor-sample"
    : "";
