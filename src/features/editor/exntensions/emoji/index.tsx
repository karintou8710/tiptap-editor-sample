import { Node } from "@tiptap/react";
import { emojiData, EmojiNames } from "./data";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    emoji: {
      setEmoji: (name: EmojiNames) => ReturnType;
    };
  }
}

const Emoji = Node.create({
  name: "emoji",
  group: "inline",
  atom: true,
  inline: true,

  addAttributes() {
    return {
      emojiName: {
        default: null,
        parseHTML(el) {
          return el.getAttribute("data-emoji-name");
        },
        renderHTML(attrs) {
          return {
            "data-emoji-name": attrs.emojiName,
          };
        },
      },
    };
  },

  parseHTML() {
    return Object.keys(emojiData).map((name) => ({
      tag: `span[data-emoji-name="${name}"]`,
    }));
  },

  renderHTML({ HTMLAttributes }) {
    const name: EmojiNames | undefined = HTMLAttributes["data-emoji-name"];
    if (!name) throw new Error("invalid emoji name");
    const emoji = emojiData[name];

    return ["span", HTMLAttributes, emoji];
  },

  addCommands() {
    return {
      setEmoji:
        (name) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              emojiName: name,
            },
          });
        },
    };
  },
});

export default Emoji;
