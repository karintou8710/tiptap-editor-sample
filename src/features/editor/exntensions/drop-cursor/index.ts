import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { Extension } from "@tiptap/react";

const DropCursor = Extension.create({
  name: "drop-cursor",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("drop-cursor"),
        view: (view) => new DropCursorView(view),
      }),
    ];
  },
});

class DropCursorView {
  handlers: { name: string; handler: (event: Event) => void }[];
  cursorPos: number | null = null;
  element: HTMLElement | null = null;

  constructor(readonly editorView: EditorView) {
    this.handlers = ["dragover", "drop", "dragend", "dragleave"].map((name) => {
      const handler = (e: Event) => {
        (this as any)[name](e);
      };
      editorView.dom.addEventListener(name, handler);
      return { name, handler };
    });
  }

  destroy() {
    this.handlers.forEach(({ name, handler }) =>
      removeEventListener(name, handler)
    );
  }

  update(editorView: EditorView, prevState: EditorState) {}

  setCursor(pos: number | null) {
    if (pos == this.cursorPos) return;

    this.cursorPos = pos;

    if (pos == null && this.element != null) {
      this.element.parentNode?.removeChild(this.element);
      this.element = null;
    } else {
      this.updateOverlay();
    }
  }

  updateOverlay() {
    if (!this.cursorPos) return;

    const { doc } = this.editorView.state;
    const $pos = doc.resolve(this.cursorPos!);
    let rect;

    const pos = $pos.after(1);
    const index = $pos.index(1);
    const before = doc.nodeAt(index - 1);
    const after = doc.nodeAt(index + 1);
    const node = this.editorView.nodeDOM(pos - (before ? before.nodeSize : 0));

    if (node) {
      console.log(node);
      const nodeRect = (node as HTMLElement).getBoundingClientRect();
      let top = before ? nodeRect.bottom : nodeRect.top;
      if (before && after)
        top =
          (top +
            (
              this.editorView.nodeDOM(pos) as HTMLElement
            ).getBoundingClientRect().top) /
          2;
      const halfWidth = 1 / 2;
      rect = {
        left: nodeRect.left,
        right: nodeRect.right,
        top: top - halfWidth,
        bottom: top + halfWidth,
      };
    }

    const parent = document.body;
    if (!this.element) {
      this.element = parent.appendChild(document.createElement("div"));
      this.element.style.cssText =
        "position: absolute; z-index: 50; pointer-events: none; background-color: red;";
      this.element.classList.add("prosemirror-dropcursor-block");
    }

    this.element.style.left = rect.left + "px";
    this.element.style.top = rect.top + "px";
    this.element.style.width = rect.right - rect.left + "px";
    this.element.style.height = rect.bottom - rect.top + "px";
  }

  dragover(event: DragEvent) {
    if (!this.editorView.editable) return;

    const pos = this.editorView.posAtCoords({
      left: event.clientX,
      top: event.clientY,
    });

    if (pos) {
      this.setCursor(pos.pos);
    }
  }

  dragend() {
    this.setCursor(null);
  }

  drop() {
    this.setCursor(null);
  }

  dragleave() {
    this.setCursor(null);
  }
}

export default DropCursor;
