import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from "react-icons/md";
import { FaMarker } from "react-icons/fa";

export default function BubbleTooltips() {
  const { editor } = useCurrentEditor();
  const [isVisible, setIsVisible] = useState(false);
  const bubbleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateBubbleMenu = () => {
      const { selection } = editor.state;
      const { empty } = selection;

      if (empty || !editor.view.hasFocus()) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    };

    editor.on("selectionUpdate", updateBubbleMenu);
    editor.on("transaction", updateBubbleMenu);

    return () => {
      editor.off("selectionUpdate", updateBubbleMenu);
      editor.off("transaction", updateBubbleMenu);
    };
  }, [editor]);

  if (!editor || !isVisible) {
    return null;
  }

  return (
    <div
      ref={bubbleMenuRef}
      className={styles.bubbleMenu}
      style={{
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("bold")}
      >
        <MdFormatBold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("italic")}
      >
        <MdFormatItalic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("underline")}
      >
        <MdFormatUnderlined size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("strike")}
      >
        <MdFormatStrikethrough size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("code")}
      >
        <MdCode size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().togglePen().run()}
        className={editor.isActive("pen") ? styles.isActive : ""}
        role="checkbox"
        aria-checked={editor.isActive("pen")}
      >
        <FaMarker size={15} />
      </button>
    </div>
  );
}
