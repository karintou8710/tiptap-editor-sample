import TiptapHeading from "@tiptap/extension-heading";

const Heading = TiptapHeading.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { selection } = this.editor.state;
        if (selection.$from.node().type.name !== this.name) return false;

        const $pos = this.editor.$pos(selection.from);
        // ブロックの先頭で削除か
        if (!selection.empty || $pos.from !== selection.from) return false;

        return this.editor.commands.setParagraph();
      },
    };
  },
});

export default Heading;
