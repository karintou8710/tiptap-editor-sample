import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { emojiData } from "./data";
import { SuggestionOptions } from "@tiptap/suggestion";
import EmojiList, { EmojiListProps, EmojiListRef } from "./emoji-list";
import { Emoji } from "@emoji-mart/data";

const Suggestion: Omit<SuggestionOptions, "editor"> = {
  char: ":",

  items: ({ query }): Emoji[] => {
    return emojiData
      .filter((item) => {
        return item.id.toLowerCase().startsWith(query.toLowerCase());
      })
      .slice(0, 10);
  },

  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .insertContentAt(range, [
        {
          type: "emoji",
          attrs: {
            emojiId: props.emojiId,
          },
        },
      ])
      .run();
  },

  render: () => {
    let component: ReactRenderer<EmojiListRef, EmojiListProps>;
    let popup: Instance[];

    return {
      onStart: (props) => {
        component = new ReactRenderer<EmojiListRef, EmojiListProps>(EmojiList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect as () => DOMRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as () => DOMRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown?.(props) ?? false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

export default Suggestion;
