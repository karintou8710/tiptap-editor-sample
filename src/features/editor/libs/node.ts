import { Editor } from "@tiptap/react";

// NOTE: NodePos.nodeは親要素をを取得するので、atomの場合にdocを取得してしまう
export function getNode(editor: Editor, pos: number) {
  const node = editor.state.doc.nodeAt(pos);
  if (node?.isAtom) {
    return node;
  } else {
    return editor.$pos(pos).node;
  }
}
