import { useCurrentEditor } from "@tiptap/react";

import styles from "./index.module.scss";
import TooltipsNode from "../tooltips-node";
import TooltipsMark from "../tooltips-mark";

export default function Tooltips() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className={styles.controlGroup}>
      <TooltipsNode editor={editor} />
      <TooltipsMark editor={editor} className={styles.tooltipsMarkContainer} />
    </div>
  );
}
