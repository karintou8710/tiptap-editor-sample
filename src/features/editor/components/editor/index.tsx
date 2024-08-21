import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import Placeholder from "@tiptap/extension-placeholder";
import { Image } from "../../exntensions/image";
import Dropcursor from "@tiptap/extension-dropcursor";
import History from "@tiptap/extension-history";

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
import BubbleTooltips from "../bubble-tooltips";

const extensions = [
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
  Dropcursor.configure({
    width: 2,
    color: "#9333ea",
  }),
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
];

const content = `
        <h1>This is title</h1>
        <p>texttext</p>
        <p>texttext</p>
        <p>texttext</p>
      `;

export default function Editor() {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<Tooltips />}
    >
      <BubbleTooltips />
    </EditorProvider>
  );
}
