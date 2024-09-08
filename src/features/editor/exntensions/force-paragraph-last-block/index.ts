import { Extension } from "@tiptap/react";
import { getNode } from "../../libs/node";

const ForceParagraphLastBlock = Extension.create({
  name: "force-paragraph-last-block",

  onTransaction({ editor, transaction }) {
    const lastChild = transaction.doc.lastChild;
    const currentPos = transaction.selection.from;

    if (lastChild && lastChild.type.name !== "paragraph") {
      editor.commands.insertContentAt(editor.state.doc.content.size, {
        type: "paragraph",
        text: "",
      });

      const currentNode = getNode(editor, currentPos);
      if (currentNode?.isAtom) {
        // 埋め込み・画像など
        editor.commands.setNodeSelection(currentPos);
      } else {
        // 見出し・引用・コードブロックなどテキストを含むもの
        editor.commands.setTextSelection(currentPos);
      }
    }
  },
});

export default ForceParagraphLastBlock;
