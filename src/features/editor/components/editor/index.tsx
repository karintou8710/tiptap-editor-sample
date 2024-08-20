import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { BubbleMenu, EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import Placeholder from "@tiptap/extension-placeholder";

import "./index.scss";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import History from "@tiptap/extension-history";

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
  Dropcursor,
  History,
];

const content = `
        <h1>This is a 1st level heading</h1>
        <p>This is a paragraph</p>
      `;

export default function Editor() {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<Tooltips />}
    >
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  );
}
