import { useEditor, EditorContent } from "@tiptap/react";
import Tooltips from "../tooltips";
import BubbleTooltips from "../bubble-tooltips";

import "./index.scss";
import extensions from "./extensions";
import DragHandle from "../../exntensions/drag-handle";
import LakeImage from "../../../../assets/lake.jpeg";

const content = `
        <h1><span style="color: #bef264">Tiptap製</span>のエディタ<span data-emoji-id="fire" /></h1>
        <p></p>
        <p><a href="https://projectmili.com/"><b>Mili</b></a><b> - Compass</b><span data-emoji-id="+1" /></p>
        <div data-youtube-video>
          <iframe src="https://www.youtube.com/watch?v=92E0X59wzeg"></iframe>
        </div>
        <img src="${LakeImage}" alt="lake" />
        <p></p>
      `;

export default function Editor() {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Tooltips editor={editor} />
      <EditorContent editor={editor} />
      <BubbleTooltips editor={editor} />
      <DragHandle editor={editor} />
    </div>
  );
}
