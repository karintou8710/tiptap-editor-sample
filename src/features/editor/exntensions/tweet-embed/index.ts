import { Node, ReactNodeViewRenderer } from "@tiptap/react";
import View from "./view";

const TweetEmbed = Node.create({
  name: "tweet-embed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: {
        default: "https://x.com/McDonaldsJapan/status/1827609356835184698",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-tweet-embed",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-tweet-embed", HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});

export default TweetEmbed;
