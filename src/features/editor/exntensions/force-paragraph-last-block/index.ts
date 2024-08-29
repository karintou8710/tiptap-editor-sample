import { Extension } from "@tiptap/react";

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
      if (lastChild.isTextblock) {
        // 見出し・引用・コードブロックなど
        editor.commands.setTextSelection(currentPos);
      } else {
        // 埋め込み・画像など
        editor.commands.setNodeSelection(currentPos);
      }
    }
  },
});

export default ForceParagraphLastBlock;
