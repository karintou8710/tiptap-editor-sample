import { Editor, useEditorState } from "@tiptap/react";

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
  const editorState = useEditorState({
    editor,
    selector: () => ({
      isActiveBold: editor.isActive("bold"),
      isActiveItalic: editor.isActive("italic"),
      isActiveUnderline: editor.isActive("underline"),
      isActiveStrike: editor.isActive("strike"),
      isActiveCode: editor.isActive("code"),
      isActivePen: editor.isActive("pen"),
      isActiveLink: editor.isActive("link"),
      isActiveRedColor: editor.isActive("textStyle", { color: "#ef4444" }),
      isActiveGreenColor: editor.isActive("textStyle", { color: "#bef264" }),
      linkHref: editor.getAttributes("link").href,
    }),
  });

  const handleToggleLink = () => {
    if (editorState.isActiveLink) {
      editor.chain().unsetLink().run();
    } else {
      const prevLink: string | null = editorState.linkHref;
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
        aria-checked={editorState.isActiveBold}
      >
        <MdFormatBold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        role="checkbox"
        aria-checked={editorState.isActiveItalic}
      >
        <MdFormatItalic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        role="checkbox"
        aria-checked={editorState.isActiveUnderline}
      >
        <MdFormatUnderlined size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        role="checkbox"
        aria-checked={editorState.isActiveStrike}
      >
        <MdFormatStrikethrough size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        role="checkbox"
        aria-checked={editorState.isActiveCode}
      >
        <MdCode size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().togglePen().run()}
        role="checkbox"
        aria-checked={editorState.isActivePen}
      >
        <FaMarker size={15} />
      </button>
      <button
        onClick={handleToggleLink}
        role="checkbox"
        aria-checked={editorState.isActiveLink}
      >
        <FaLink size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#ef4444").run()}
        role="checkbox"
        aria-checked={editorState.isActiveRedColor}
      >
        <ImTextColor size={15} color="#ef4444" />
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#bef264").run()}
        role="checkbox"
        aria-checked={editorState.isActiveGreenColor}
      >
        <ImTextColor size={15} color="#bef264" />
      </button>
      <button onClick={() => editor.chain().focus().unsetColor().run()}>
        <ImTextColor size={15} />
      </button>
    </div>
  );
}
