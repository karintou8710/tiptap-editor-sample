import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import History from "@tiptap/extension-history";
import { Extensions } from "@tiptap/react";

import "./index.scss";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Image from "../../exntensions/image";
import Pen from "../../exntensions/pen";
import ForceParagraphLastBlock from "../../exntensions/force-paragraph-last-block";
import Youtube from "@tiptap/extension-youtube";
import TweetEmbed from "../../exntensions/tweet-embed";
import Heading from "../../exntensions/heading";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Emoji from "../../exntensions/emoji";
import UniqueId from "../../exntensions/unique-id";
import Dropcursor from "@tiptap/extension-dropcursor";

const extensions: Extensions = [
  // Node
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Image,
  Blockquote,
  BulletList,
  ListItem,
  OrderedList,
  HorizontalRule,
  Youtube,
  TweetEmbed,
  Link.configure({
    protocols: ["https"],
  }),
  Emoji,

  // Mark
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Pen,
  TextStyle,

  // Functional
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "見出しを入力してください";
      }

      return "ここに入力してください";
    },
  }),
  History,
  ForceParagraphLastBlock,
  Color,
  Dropcursor.configure({
    width: 2,
    color: "#9333ea",
  }),
  UniqueId,
];

export default extensions;
