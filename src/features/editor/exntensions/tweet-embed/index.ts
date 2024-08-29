import { Node, ReactNodeViewRenderer } from "@tiptap/react";
import View from "./view";

const TweetEmbed = Node.create({
  name: "tweet-embed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      tweetId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-tweet-id"),
        renderHTML: (attributes) => {
          return {
            "data-tweet-id": attributes.tweetId,
          };
        },
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
