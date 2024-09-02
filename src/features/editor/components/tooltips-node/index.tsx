import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import { FaImage, FaYoutube } from "react-icons/fa";
import FileInput from "../file-input";
import { useCallback } from "react";
import { generateDataURLFromFile } from "../../libs/image";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdHorizontalRule,
  MdRedo,
  MdUndo,
} from "react-icons/md";
import { BsBlockquoteLeft } from "react-icons/bs";

type Props = {
  editor: Editor;
};

export default function TooltipsNode({ editor }: Props) {
  const onImageFileChange = useCallback(
    async (file: File | null | undefined) => {
      if (!file || !editor) return;

      const url = await generateDataURLFromFile(file);
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
        })
        .run();
    },
    [editor]
  );

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 700,
        height: (700 / 16) * 9,
      });
    }
  };

  return (
    <div className={styles.buttonGroup}>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        role="checkbox"
        aria-checked={editor.isActive("heading", { level: 1 })}
      >
        <TbH1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        role="checkbox"
        aria-checked={editor.isActive("heading", { level: 2 })}
      >
        <TbH2 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        role="checkbox"
        aria-checked={editor.isActive("heading", { level: 3 })}
      >
        <TbH3 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        role="checkbox"
        aria-checked={editor.isActive("blockquote")}
      >
        <BsBlockquoteLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        role="checkbox"
        aria-checked={editor.isActive("bulletList")}
      >
        <MdFormatListBulleted size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        role="checkbox"
        aria-checked={editor.isActive("orderedList")}
      >
        <MdFormatListNumbered size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        role="checkbox"
        aria-checked={editor.isActive("horizontalRule")}
      >
        <MdHorizontalRule size={20} />
      </button>

      <button onClick={() => editor.chain().focus().undo().run()}>
        <MdUndo size={20} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <MdRedo size={20} />
      </button>
      <button onClick={addYoutubeVideo}>
        <FaYoutube size={20} />
      </button>
      <FileInput onChange={onImageFileChange}>
        <FaImage size={20} />
      </FileInput>
      <button onClick={() => editor.chain().focus().setEmoji("fire").run()}>
        🔥
      </button>
    </div>
  );
}
