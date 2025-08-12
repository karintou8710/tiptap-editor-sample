import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import { useDragHandle } from "./use-drag-handle";
import { DragIcon } from "./drag-icon";

// 定数
export const DRAG_HANDLE_SIZE = 18;
export const DRAG_HANDLE_OFFSET = 30;

interface DragHandleProps {
  editor: Editor | null;
}

export function DragHandle({ editor }: DragHandleProps) {
  const { dragTarget, handleDragStart, handleClick } = useDragHandle(editor);

  if (dragTarget === null) return null;

  const rect = dragTarget.dom.getBoundingClientRect();
  const top = rect?.top + window.scrollY;
  const left = rect?.left + window.scrollX - DRAG_HANDLE_OFFSET;

  return (
    <div
      draggable="true"
      className={styles.container}
      onDragStart={handleDragStart}
      onClick={handleClick}
      style={{
        top: top,
        left: left,
      }}
    >
      <DragIcon width={DRAG_HANDLE_SIZE} height={DRAG_HANDLE_SIZE} />
    </div>
  );
}

// デフォルトエクスポートも提供
export default DragHandle;
