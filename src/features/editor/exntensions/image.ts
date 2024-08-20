import TiptapImage from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { generateDataURLFromFile } from "../libs/image";

export const Image = TiptapImage.extend({
  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey("dragAndDropImageHandler"),
        props: {
          handleDrop(_, event, __, moved) {
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
                    .setImage({
                      src: url,
                    })
                    .run();
                }
              );

              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
