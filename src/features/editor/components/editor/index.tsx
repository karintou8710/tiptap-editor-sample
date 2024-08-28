import { EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import BubbleTooltips from "../bubble-tooltips";

import "./index.scss";
import extensions from "./extensions";

const content = `
        <h1>1</h1>
        <p>23</p>
        <p>456</p>
        <p>7</p>
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
