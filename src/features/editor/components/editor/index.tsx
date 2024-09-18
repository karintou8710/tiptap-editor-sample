import { EditorProvider } from "@tiptap/react";
import Tooltips from "../tooltips";
import BubbleTooltips from "../bubble-tooltips";

import "./index.scss";
import extensions from "./extensions";
import DragHandle from "../../exntensions/drag-handle";

const content = `
        <h1><span style="color: #bef264">Tiptap製</span>のエディタ<span data-emoji-id="fire" /></h1>
        <p></p>
        <p><a href="https://projectmili.com/"><b>Mili</b></a><b> - Compass</b><span data-emoji-id="+1" /></p>
        <div data-youtube-video>
          <iframe src="https://www.youtube.com/watch?v=92E0X59wzeg"></iframe>
        </div>
        <react-tweet-embed data-tweet-id="1828273245377962327"></react-tweet-embed>
        <img src="/lake.jpeg" alt="lake" />
        <p></p>
      `;

export default function Editor() {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<Tooltips />}
    >
      <BubbleTooltips />
      <DragHandle />
    </EditorProvider>
  );
}
