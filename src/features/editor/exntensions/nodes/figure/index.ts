import { mergeAttributes, Node } from "@tiptap/react";

export interface FigureOptions {
  HTMLAttributes: Record<string, any>;
}

export interface SetFigureOptions {
  src: string;
  alt?: string;
  caption: string;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    figure: {
      setFigure: (options: SetFigureOptions) => ReturnType;
    };
  }
}

export const Figure = Node.create({
  name: "figure",

  group: "block",
  content: "image caption",
  isolating: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setFigure:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: "image",
                attrs: {
                  src: options.src,
                  alt: options.alt || "",
                },
              },
              {
                type: "caption",
                content: [{ type: "text", text: options.caption }],
              },
            ],
          });
        },
    };
  },
});

export default Figure;
