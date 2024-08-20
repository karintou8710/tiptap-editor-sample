import { useCurrentEditor } from "@tiptap/react";

import styles from "./index.module.scss";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import FileInput from "../file-input";
import { useCallback } from "react";
import { generateDataURLFromFile } from "../../libs/image";
import { MdRedo, MdUndo } from "react-icons/md";

export default function Tooltips() {
  const { editor } = useCurrentEditor();

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

  if (!editor) return null;

  return (
    <div className={styles.controlGroup}>
      <div className={styles.buttonGroup}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          role="checkbox"
          aria-checked={editor.isActive("heading", { level: 1 })}
        >
          <TbH1 size={20} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          role="checkbox"
          aria-checked={editor.isActive("heading", { level: 2 })}
        >
          <TbH2 size={20} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          role="checkbox"
          aria-checked={editor.isActive("heading", { level: 3 })}
        >
          <TbH3 size={20} />
        </button>

        <button onClick={() => editor.chain().focus().undo().run()}>
          <MdUndo size={20} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <MdRedo size={20} />
        </button>

        <FileInput onChange={onImageFileChange}>
          <FaImage size={20} />
        </FileInput>
      </div>
    </div>
  );
}
