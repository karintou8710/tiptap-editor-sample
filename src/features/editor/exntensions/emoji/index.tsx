import { Node } from "@tiptap/react";
import { emojiData } from "./data";
import Suggestion from "@tiptap/suggestion";
import suggestion from "./suggestion";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    emoji: {
      setEmoji: (name: string) => ReturnType;
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
    const name: string | undefined = HTMLAttributes["data-emoji-name"];
    const emoji = emojiData.find((item) => item.name === name);
    if (!emoji) throw new Error("invalid emoji name");

    return ["span", HTMLAttributes, emoji.data];
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
