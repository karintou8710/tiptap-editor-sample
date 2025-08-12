import { Editor } from "@tiptap/react";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { NodeSelection } from "@tiptap/pm/state";
import { Node, Slice } from "@tiptap/pm/model";

import styles from "./index.module.scss";
import { isTopBlockAtomNode } from "../../libs/node";

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

type Props = {
  editor: Editor;
};

export default function DragHandle({ editor }: Props) {
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  const setTopBlockAtomDragInfo = useCallback(
    (pos: number) => {
      if (!editor) return;

      setDragInfo({
        dom: editor.view.nodeDOM(pos) as HTMLElement,
        node: editor.state.doc.nodeAt(pos) as Node,
        nodeSelection: NodeSelection.create(editor.state.doc, pos),
      });
    },
    [editor]
  );

  const setTopBlockDragInfo = useCallback(
    (pos: number) => {
      if (!editor) return;

      const $pos = editor.state.doc.resolve(pos);
      setDragInfo({
        dom: editor.view.domAtPos($pos.start(1)).node as HTMLElement,
        node: $pos.node(1),
        nodeSelection: NodeSelection.create(
          editor.state.doc,
          $pos.start(1) - 1 // nodeSelectionはResolvePos.beforeの値を指定する
        ),
      });
    },
    [editor]
  );

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

      // リーフノードはNodeやDOMの取得方法が通常と異なるので、分けて処理する

      if (isTopBlockAtomNode(editor, pos.pos)) {
        // inside != -1の時、atomではposが上半分と下半分で異なる(pos.insideは同じ)
        setTopBlockAtomDragInfo(pos.inside >= 0 ? pos.inside : pos.pos);
      } else {
        // inside == -1の時、pos.posは要素の外になるので+1する
        setTopBlockDragInfo(pos.inside >= 0 ? pos.pos : pos.pos + 1);
      }
    };

    return () => {
      editor.$doc.element.onmousemove = null;
    };
  }, [editor, setTopBlockAtomDragInfo, setTopBlockDragInfo]);

  if (dragInfo === null) return null;

  const rect = dragInfo.dom.getBoundingClientRect();
  const top = rect?.top + window.scrollY;
  const left = rect?.left + window.scrollX - 30;

  return (
    <div
      draggable="true"
      className={styles.container}
      onDragStart={handleDragStart}
      onClick={() =>
        editor
          ?.chain()
          .focus()
          .setNodeSelection(dragInfo.nodeSelection.from)
          .run()
      }
      style={{
        top: top,
        left: left,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <circle cx="7" cy="7" r="1.6" />
        <circle cx="7" cy="12" r="1.6" />
        <circle cx="7" cy="17" r="1.6" />
        <circle cx="13" cy="7" r="1.6" />
        <circle cx="13" cy="12" r="1.6" />
        <circle cx="13" cy="17" r="1.6" />
      </svg>
    </div>
  );
}
