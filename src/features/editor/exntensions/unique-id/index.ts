import { Extension } from "@tiptap/react";

const UniqueId = Extension.create({
  name: "unique-id",

  addGlobalAttributes() {
    return [
      {
        types: ["heading", "paragraph", "tweet-embed"],
        attributes: {
          uniqueId: {
            default: crypto.randomUUID(),
            rendered: false,
          },
        },
      },
    ];
  },
});

export default UniqueId;
