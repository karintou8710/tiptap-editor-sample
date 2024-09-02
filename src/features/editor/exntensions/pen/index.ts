import { Mark, mergeAttributes } from "@tiptap/react";

export interface PenOptions {
  // eslint-disable-next-line
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    pen: {
      setPen: () => ReturnType;
      togglePen: () => ReturnType;
      unsetPen: () => ReturnType;
    };
  }
}

const Pen = Mark.create<PenOptions>({
  name: "pen",

  addAttributes() {
    return {
      class: {
        default: "pen",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[class='pen']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setPen:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      togglePen:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetPen:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default Pen;
