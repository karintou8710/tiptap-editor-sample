import { Node } from "@tiptap/react";
import { emojiData } from "./data";
import Suggestion from "@tiptap/suggestion";
import suggestion from "./suggestion";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    emoji: {
      setEmoji: (id: string) => ReturnType;
    };
  }
}

const Emoji = Node.create({
  name: "emoji",
  group: "inline",
  atom: true,
  inline: true,
  selectable: false,

  addAttributes() {
    return {
      emojiId: {
        default: null,
        parseHTML(el) {
          return el.getAttribute("data-emoji-id");
        },
        renderHTML(attrs) {
          return {
            "data-emoji-id": attrs.emojiId,
          };
        },
      },
    };
  },

  parseHTML() {
    return emojiData.map((item) => ({
      tag: `span[data-emoji-id="${item.id}"]`,
    }));
  },

  renderHTML({ HTMLAttributes }) {
    const id: string | undefined = HTMLAttributes["data-emoji-id"];
    const emoji = emojiData.find((item) => item.id === id);
    if (!emoji) throw new Error("invalid emoji id");

    return ["span", HTMLAttributes, emoji.skins[0].native];
  },

  addCommands() {
    return {
      setEmoji:
        (id) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              emojiId: id,
            },
          });
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...suggestion,
      }),
    ];
  },
});

export default Emoji;
