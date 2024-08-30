import { Node, nodePasteRule, ReactNodeViewRenderer } from "@tiptap/react";
import View from "./view";

const twitterUrlReg = /^https:\/\/(twitter\.com|x\.com)\/.*\/status\/(\d+)$/g;

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

  addPasteRules() {
    return [
      nodePasteRule({
        find: twitterUrlReg,
        type: this.type,
        getAttributes(match) {
          console.log(match);
          return {
            tweetId: match[2],
          };
        },
      }),
    ];
  },
});

export default TweetEmbed;
