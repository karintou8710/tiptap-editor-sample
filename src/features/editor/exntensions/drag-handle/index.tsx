import { useCurrentEditor } from "@tiptap/react";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { NodeSelection } from "@tiptap/pm/state";
import { Node, Slice } from "@tiptap/pm/model";

import styles from "./index.module.scss";

class Dragging {
  constructor(
    readonly slice: Slice,
    readonly move: boolean,
    readonly node?: NodeSelection
  ) {}
}

type DragInfo = {
  dom: HTMLElement;
  node: Node;
  nodeSelection: NodeSelection;
};

export default function DragHandle() {
  const { editor } = useCurrentEditor();
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  const handleDragStart = useCallback(
    (ev: DragEvent) => {
      // ProseMirrorのDragStart参考に実装すれば良さそう。view.draggingに対象のNodeSelectionを入れる
      // https://github.com/ProseMirror/prosemirror-view/blob/b2e782ae7c8013505ba05683b185886585ef5939/src/input.ts

      if (!editor || dragInfo === null) return;

      ev.dataTransfer?.setDragImage(dragInfo.dom, 0, 0);
      ev.dataTransfer.effectAllowed = "copyMove";

      editor.view.dragging = new Dragging(
        dragInfo.nodeSelection.content(),
        true,
        dragInfo.nodeSelection
      );
    },
    [editor, dragInfo]
  );

  useEffect(() => {
    if (!editor) return;

    editor.$doc.element.onmousemove = (ev) => {
      const pos = editor.view.posAtCoords({
        left: ev.clientX,
        top: ev.clientY,
      });
      if (!pos) return;

      if (pos.inside >= 0) {
        const $pos = editor.$pos(pos.pos);

        if ($pos.node.type.name === "doc") {
          // リーフノードはNodeやDOMの取得方法が通常と異なるので、分けて処理する
          setDragInfo({
            dom: editor.view.nodeDOM(pos.inside) as HTMLElement,
            node: editor.state.doc.nodeAt(pos.inside) as Node,
            nodeSelection: NodeSelection.create(editor.state.doc, pos.inside),
          });
        } else {
          setDragInfo({
            dom: editor.view.domAtPos($pos.from).node as HTMLElement,
            node: $pos.node,
            nodeSelection: NodeSelection.create(
              editor.state.doc,
              $pos.from - 1 // nodeSelectionはResolvePos.beforeの値を指定する
            ),
          });
        }

        return;
      } else {
        const $pos = editor.$pos(pos.pos + 1);

        if ($pos.node.type.name === "doc") {
          // リーフノードはNodeやDOMの取得方法が通常と異なるので、分けて処理する
          setDragInfo({
            dom: editor.view.nodeDOM($pos.pos - 1) as HTMLElement,
            node: editor.state.doc.nodeAt($pos.pos - 1) as Node,
            nodeSelection: NodeSelection.create(editor.state.doc, $pos.pos - 1),
          });
        } else {
          setDragInfo({
            dom: editor.view.domAtPos($pos.from).node as HTMLElement,
            node: $pos.node,
            nodeSelection: NodeSelection.create(
              editor.state.doc,
              $pos.from - 1 // nodeSelectionはResolvePos.beforeの値を指定する
            ),
          });
        }

        return;
      }
    };

    return () => {
      editor.$doc.element.onmouseover = null;
    };
  }, [editor]);

  if (dragInfo === null) return null;

  const rect = dragInfo.dom.getBoundingClientRect();
  const top = rect?.top + window.scrollY;
  const left = rect?.left + window.scrollX - 40;

  return (
    <div
      draggable="true"
      className={styles.container}
      onDragStart={handleDragStart}
      style={{
        top: top,
        left: left,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </div>
  );
}
