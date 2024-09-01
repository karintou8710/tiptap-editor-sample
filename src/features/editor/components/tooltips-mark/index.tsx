import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from "react-icons/md";
import { FaLink, FaMarker } from "react-icons/fa";
import { ImTextColor } from "react-icons/im";

type Props = {
  editor: Editor;
  className?: string;
};

export default function TooltipsMark({ editor, className }: Props) {
  const handleToggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().unsetLink().run();
    } else {
      const prevLink: string | null = editor.getAttributes("link").href;
      const link = window.prompt("Enter url", prevLink ?? "");

      if (link) {
        editor.chain().setLink({ href: link }).run();
      }
    }
  };

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
      <button
        onClick={() => editor.chain().focus().togglePen().run()}
        role="checkbox"
        aria-checked={editor.isActive("pen")}
      >
        <FaMarker size={15} />
      </button>
      <button
        onClick={handleToggleLink}
        role="checkbox"
        aria-checked={editor.isActive("link")}
      >
        <FaLink size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#ef4444").run()}
        role="checkbox"
        aria-checked={editor.isActive("textStyle", { color: "#ef4444" })}
      >
        <ImTextColor size={15} color="#ef4444" />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#bef264").run()}
        role="checkbox"
        aria-checked={editor.isActive("textStyle", { color: "#bef264" })}
      >
        <ImTextColor size={15} color="#bef264" />
      </button>
      <button onClick={() => editor.chain().focus().unsetColor().run()}>
        <ImTextColor size={15} />
      </button>
    </div>
  );
}
