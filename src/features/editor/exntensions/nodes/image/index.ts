import TiptapImage from "@tiptap/extension-image";
import { NodeSelection, Plugin, PluginKey } from "@tiptap/pm/state";
import { generateDataURLFromFile } from "../../../libs/image";
import { Editor } from "@tiptap/react";

const Image = TiptapImage.extend({
  group: "image", // figureからのみ挿入可能
  draggable: false,
  selectable: false,

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }: { editor: Editor }) => {
        const { selection } = editor.state;

        if (
          !(selection instanceof NodeSelection) ||
          selection.node.type.name !== this.name
        ) {
          return false;
        }

        // 親のfigureを削除
        editor.commands.deleteRange({
          from: selection.$from.before(),
          to: selection.$from.after(),
        });

        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey("imageClickHandler"),
        props: {
          handleClickOn(view, _pos, node, nodePos, _event) {
            if (node.type.name !== "image") return false;

            const $pos = view.state.doc.resolve(nodePos);
            const tr = view.state.tr.setSelection(
              NodeSelection.create(view.state.doc, $pos.before())
            );
            view.dispatch(tr);

            return true;
          },
        },
      }),
      new Plugin({
        key: new PluginKey("dragAndDropImageHandler"),
        props: {
          handleDrop(view, event, __, moved) {
            const pos = view.posAtCoords({
              left: event.pageX,
              top: event.pageY,
            });

            if (!pos) return false;

            const { doc } = view.state;
            const $pos = doc.resolve(pos.pos);

            if (
              !moved &&
              event.dataTransfer &&
              event.dataTransfer.files.length === 1
            ) {
              event.preventDefault();
              const posInsert = pos.pos === 1 ? 0 : $pos.after(1); // 先頭への挿入は別途制御する

              generateDataURLFromFile(event.dataTransfer.files[0]).then(
                (url) => {
                  editor
                    .chain()
                    .insertFigure(posInsert, {
                      src: url,
                    })
                    .run();
                }
              );

              return true;
            }
          },
          handlePaste(view, event) {
            const hasFile =
              event.clipboardData &&
              event.clipboardData.files &&
              event.clipboardData.files.length === 1;

            if (!hasFile) return false;

            const file = event.clipboardData.files[0];
            if (!/image/i.test(file.type)) {
              return false;
            }

            event.preventDefault();
            const { doc, selection } = view.state;
            const $pos = doc.resolve(selection.from);
            const posInsert = selection.from === 1 ? 0 : $pos.after(1); // 先頭への挿入は別途制御する

            generateDataURLFromFile(file).then((url) => {
              editor
                .chain()
                .insertFigure(posInsert, {
                  src: url,
                })
                .run();
            });

            return true;
          },
        },
      }),
    ];
  },
});

export default Image;
