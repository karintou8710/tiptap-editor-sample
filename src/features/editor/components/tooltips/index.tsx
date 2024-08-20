import { useCurrentEditor } from "@tiptap/react";

import styles from "./index.module.scss";

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
          aria-role="checkbox"
          aria-checked={editor.isActive("heading", { level: 1 })}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-role="checkbox"
          aria-checked={editor.isActive("heading", { level: 2 })}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-role="checkbox"
          aria-checked={editor.isActive("heading", { level: 3 })}
        >
          H3
        </button>
      </div>
    </div>
  );
}
