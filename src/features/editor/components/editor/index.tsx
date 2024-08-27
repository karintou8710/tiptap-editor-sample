import { EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import BubbleTooltips from "../bubble-tooltips";

import "./index.scss";
import extensions from "./extensions";

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
