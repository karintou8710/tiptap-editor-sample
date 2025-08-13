import { mergeAttributes, Node } from "@tiptap/react";

export interface CaptionOptions {
  HTMLAttributes: Record<string, any>;
}

export const Caption = Node.create<CaptionOptions>({
  name: "caption",

  group: "block",
  content: "inline*",
  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figcaption",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
