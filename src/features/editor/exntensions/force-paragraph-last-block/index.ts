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
      editor.commands.setTextSelection(currentPos);
    }
  },
});

export default ForceParagraphLastBlock;
