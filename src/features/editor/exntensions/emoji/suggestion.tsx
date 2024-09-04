import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { Emoji, emojiData } from "./data";
import { SuggestionOptions } from "@tiptap/suggestion";
import EmojiList, { EmojiListProps, EmojiListRef } from "./emoji-list";

const Suggestion: Omit<SuggestionOptions, "editor"> = {
  char: ":",

  items: ({ query }): Emoji[] => {
    return emojiData
      .filter((item) => {
        return item.name.toLowerCase().startsWith(query.toLowerCase());
      })
      .slice(0, 5);
  },

  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .insertContentAt(range, [
        {
          type: "emoji",
          attrs: {
            emojiName: props.name,
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
