import TiptapHeading from "@tiptap/extension-heading";

const Heading = TiptapHeading.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { selection } = this.editor.state;
        const $pos = this.editor.$pos(selection.from);

        if (selection.$from.node().type.name !== this.name) return false;
        if (!selection.empty) return false;

        // 先頭ではない
        if ($pos.from !== selection.from) return false;

        return this.editor.commands.setParagraph();
      },
    };
  },
});

export default Heading;
