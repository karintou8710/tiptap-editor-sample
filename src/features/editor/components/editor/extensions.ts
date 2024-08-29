import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
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
import CustomDropCursor from "../../exntensions/drop-cursor";
import Youtube from "@tiptap/extension-youtube";

const extensions: Extensions = [
  CustomDropCursor,
  Document,
  Paragraph,
  Text,
  Placeholder.configure({
    placeholder: "ここに入力してください",
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Image,
  History,
  Blockquote,
  BulletList,
  ListItem,
  OrderedList,
  HorizontalRule,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Pen,
  ForceParagraphLastBlock,
  Youtube,
];

export default extensions;
