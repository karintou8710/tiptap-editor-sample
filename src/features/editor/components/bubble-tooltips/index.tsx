import { BubbleMenu, useCurrentEditor } from "@tiptap/react";

import styles from "./index.module.scss";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from "react-icons/md";

export default function BubbleTooltips() {
  const { editor } = useCurrentEditor();

  if (editor == null) return null;

  return (
    <BubbleMenu
      editor={editor}
      className={styles.buttonGroup}
      shouldShow={({ editor, state }) => {
        if (state.selection.empty) return false;

        return editor.isActive("paragraph") || editor.isActive("heading");
      }}
    >
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
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        role="checkbox"
        aria-checked={editor.isActive("underline")}
      >
        <MdFormatUnderlined size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        role="checkbox"
        aria-checked={editor.isActive("strike")}
      >
        <MdFormatStrikethrough size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        role="checkbox"
        aria-checked={editor.isActive("code")}
      >
        <MdCode size={20} />
      </button>
    </BubbleMenu>
  );
}
