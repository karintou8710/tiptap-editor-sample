import { DragTarget } from "./use-drag-handle";

const DRAG_HANDLE_X_OFFSET = 30;

export function calcOffset(dragTarget: DragTarget) {
  const rect = dragTarget.dom.getBoundingClientRect();
  const top = rect?.top + window.scrollY;
  const left = rect?.left + window.scrollX - DRAG_HANDLE_X_OFFSET;
  return { top, left };
}
