import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import TooltipsNode from "../tooltips-node";
import TooltipsMark from "../tooltips-mark";

type Props = {
  editor: Editor;
};

export default function Tooltips({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className={styles.controlGroup}>
      <TooltipsNode editor={editor} />
      <TooltipsMark editor={editor} className={styles.tooltipsMarkContainer} />
    </div>
  );
}
