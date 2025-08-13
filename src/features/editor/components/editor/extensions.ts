import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Placeholder } from "@tiptap/extension-placeholder";
import { History } from "@tiptap/extension-history";
import { Extensions } from "@tiptap/react";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Strike } from "@tiptap/extension-strike";
import { Underline } from "@tiptap/extension-underline";
import { Code } from "@tiptap/extension-code";
import Image from "../../exntensions/nodes/image";
import Pen from "../../exntensions/marks/pen";
import { Youtube } from "@tiptap/extension-youtube";
import TweetEmbed from "../../exntensions/nodes/tweet-embed";
import Heading from "../../exntensions/nodes/heading";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Emoji from "../../exntensions/nodes/emoji";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Caption } from "../../exntensions/nodes/caption";
import Figure from "../../exntensions/nodes/figure";
import { TrailingNode } from "@tiptap/extensions";

import "./index.scss";

const extensions: Extensions = [
  // Node
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Image.configure({
    HTMLAttributes: {
      class: "image",
    },
  }),
  Caption,
  Figure,
  Blockquote,
  BulletList,
  ListItem,
  OrderedList,
  HorizontalRule,
  Youtube,
  TweetEmbed,
  Emoji,

  // Mark
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Pen,
  TextStyle,
  Link.extend({ inclusive: false }).configure({
    protocols: ["https"],
  }),

  // Functional
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "見出しを入力";
      }

      if (node.type.name === "caption") {
        return "キャプションを入力";
      }

      return "ここに入力";
    },
    includeChildren: true,
  }),
  History,
  TrailingNode,
  Color,
  Dropcursor.configure({
    width: 2,
    color: "#9333ea",
  }),
];

export default extensions;
