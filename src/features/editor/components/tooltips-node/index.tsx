import { Editor, useEditorState } from "@tiptap/react";

import styles from "./index.module.scss";
import { FaImage, FaYoutube } from "react-icons/fa";
import FileInput from "../file-input";
import { useCallback } from "react";
import { generateDataURLFromFile } from "../../libs/image";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdHorizontalRule,
  MdRedo,
  MdUndo,
} from "react-icons/md";
import { BsBlockquoteLeft } from "react-icons/bs";
import Select, { SelectItem, SelectValue } from "../../../../components/select";

type Props = {
  editor: Editor;
};

const headingItems = [
  { label: "Heading1", value: 1 },
  { label: "Heading2", value: 2 },
  { label: "Heading3", value: 3 },
  { label: "Paragraph", value: -1 },
] as const satisfies SelectItem[];

type HeadingValue = SelectValue<typeof headingItems>;

export default function TooltipsNode({ editor }: Props) {
  const editorState = useEditorState({
    editor,
    selector: () => ({
      isActiveH1: editor.isActive("heading", { level: 1 }),
      isActiveH2: editor.isActive("heading", { level: 2 }),
      isActiveH3: editor.isActive("heading", { level: 3 }),
      isActiveBulletList: editor.isActive("bulletList"),
      isActiveOrderedList: editor.isActive("orderedList"),
      isActiveBlockquote: editor.isActive("blockquote"),
      isActiveHorizontalRule: editor.isActive("horizontalRule"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const onImageFileChange = useCallback(
    async (file: File | null | undefined) => {
      if (!file || !editor) return;

      const url = await generateDataURLFromFile(file);
      editor
        .chain()
        .focus()
        .setFigure({
          src: url,
        })
        .run();
    },
    [editor]
  );

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 700,
        height: (700 / 16) * 9,
      });
    }
  };

  const getHeadingValue = (): HeadingValue => {
    if (editorState.isActiveH1) return 1;
    else if (editorState.isActiveH2) return 2;
    else if (editorState.isActiveH3) return 3;

    return -1;
  };

  return (
    <div className={styles.buttonGroup}>
      <Select
        value={getHeadingValue()}
        items={headingItems}
        handleSelect={(value) => {
          if (value === -1) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: value }).run();
          }
        }}
      />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={styles.btn}
        disabled={!editorState.canUndo}
      >
        <MdUndo size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={styles.btn}
        disabled={!editorState.canRedo}
      >
        <MdRedo size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={styles.btn}
        role="checkbox"
        aria-checked={editorState.isActiveBulletList}
      >
        <MdFormatListBulleted size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={styles.btn}
        role="checkbox"
        aria-checked={editorState.isActiveOrderedList}
      >
        <MdFormatListNumbered size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={styles.btn}
        role="checkbox"
        aria-checked={editorState.isActiveBlockquote}
      >
        <BsBlockquoteLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={styles.btn}
        role="checkbox"
        aria-checked={editorState.isActiveHorizontalRule}
      >
        <MdHorizontalRule size={20} />
      </button>

      <button onClick={addYoutubeVideo} className={styles.btn}>
        <FaYoutube size={20} />
      </button>
      <FileInput onChange={onImageFileChange} className={styles.btn}>
        <FaImage size={20} />
      </FileInput>
      <button
        onClick={() => editor.chain().focus().setEmoji("fire").run()}
        className={styles.btn}
      >
        🔥
      </button>
    </div>
  );
}
