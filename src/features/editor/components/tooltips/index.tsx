import { useCurrentEditor } from "@tiptap/react";

import styles from "./index.module.scss";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";

export default function Tooltips() {
  const { editor } = useCurrentEditor();

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
      </div>
    </div>
  );
}
