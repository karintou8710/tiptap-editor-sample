import { useEditor, EditorContent } from "@tiptap/react";
import Tooltips from "../tooltips";

import "./index.scss";
import extensions from "./extensions";
import DragHandle from "../../exntensions/functionality/drag-handle";
import LakeImage from "../../../../assets/lake.jpeg";

const content = `
        <h1>Tiptap製のエディタ<span data-emoji-id="fire" /></h1>
        <p></p>
        <p><a href="https://projectmili.com/"><b>Mili</b></a><b> - Compass</b></p>
        <div data-youtube-video>
          <iframe src="https://www.youtube.com/watch?v=92E0X59wzeg"></iframe>
        </div>
        <figure>
          <img src="${LakeImage}" alt="lake" />
          <figcaption>支笏湖</figcaption>
        </figure>
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
      <DragHandle editor={editor} />
    </div>
  );
}
