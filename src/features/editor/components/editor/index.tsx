import { EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import BubbleTooltips from "../bubble-tooltips";

import "./index.scss";
import extensions from "./extensions";

const content = `
        <h1>Tiptap製のエディタ</h1>
        <p></p>
        <p><b>Mill - Compass</b></p>
        <div data-youtube-video>
          <iframe src="https://www.youtube.com/watch?v=92E0X59wzeg" width="700" height="394"></iframe>
        </div>
        <react-tweet-embed />
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
