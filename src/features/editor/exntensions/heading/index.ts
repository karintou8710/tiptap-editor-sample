import TiptapHeading from "@tiptap/extension-heading";

const Heading = TiptapHeading.extend({
  addKeyboardShortcuts() {
    const baseShortcuts =
      TiptapHeading.config.addKeyboardShortcuts?.call(this) || {};
    return {
      ...baseShortcuts,
      Backspace: () => {
        const { selection } = this.editor.state;
        const { $from } = selection;
        if ($from.node().type.name !== this.name) return false;

        // ブロックの先頭で削除か
        if (!selection.empty || $from.start() !== $from.pos) return false;

        return this.editor.commands.setParagraph();
      },
    };
  },
});

export default Heading;
