import { Editor } from "@tiptap/react";

import styles from "./index.module.scss";
import { useDragHandle } from "./use-drag-handle";
import { DragIcon } from "./drag-icon";
import { calcOffset } from "./calc-offset";

const DRAG_HANDLE_SIZE = 18;

interface DragHandleProps {
  editor: Editor | null;
}

export function DragHandle({ editor }: DragHandleProps) {
  const { dragTarget, handleDragStart, handleDragEnd, handleClick } =
    useDragHandle(editor);

  if (dragTarget === null) return null;

  const offsetStyles = calcOffset(dragTarget);

  return (
    <div
      draggable="true"
      className={styles.container}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        ...offsetStyles,
      }}
    >
      <DragIcon width={DRAG_HANDLE_SIZE} height={DRAG_HANDLE_SIZE} />
    </div>
  );
}

// デフォルトエクスポートも提供
export default DragHandle;
