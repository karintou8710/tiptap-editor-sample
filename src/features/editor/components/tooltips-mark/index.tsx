import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
} from "react-icons/md";

type Props = {
  editor: Editor;
  className?: string;
};

export default function TooltipsMark({ editor, className }: Props) {
  return (
    <div className={`${styles.buttonGroup} ${className}`}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        role="checkbox"
        aria-checked={editor.isActive("bold")}
      >
        <MdFormatBold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        role="checkbox"
        aria-checked={editor.isActive("italic")}
      >
        <MdFormatItalic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        role="checkbox"
        aria-checked={editor.isActive("strike")}
      >
        <MdFormatStrikethrough size={20} />
      </button>
    </div>
  );
}
