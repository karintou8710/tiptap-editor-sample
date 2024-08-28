import TiptapImage from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { generateDataURLFromFile } from "../../libs/image";

const Image = TiptapImage.extend({
  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
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

              generateDataURLFromFile(event.dataTransfer.files[0]).then(
                (url) => {
                  editor
                    .chain()
                    .insertContentAt($pos.after(1), {
                      type: "image",
                      attrs: {
                        src: url,
                      },
                    })
                    .run();
                }
              );

              return true;
            }
          },
        },
      }),
    ];
  },
});

export default Image;
