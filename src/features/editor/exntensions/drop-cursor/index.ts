import { Plugin, PluginKey } from "@tiptap/pm/state";
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
  width: number = 2;

  constructor(readonly editorView: EditorView) {
    const handleNames = ["dragover", "drop", "dragend", "dragleave"] as const;
    this.handlers = handleNames.map((name) => {
      const handler = (e: Event) => {
        this[name](e as DragEvent);
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

  update() {}

  setCursor(pos: number | null) {
    if (pos == this.cursorPos) return;

    this.cursorPos = pos;

    if (pos === null && this.element != null) {
      this.element.parentNode?.removeChild(this.element);
      this.element = null;
    } else {
      this.updateOverlay();
    }
  }

  updateOverlay() {
    if (!this.cursorPos) return;
    const { doc } = this.editorView.state;

    let rect;
    if (this.cursorPos === 1) {
      const afterDOM = this.editorView.nodeDOM(0);
      const nodeRect = (afterDOM as HTMLElement).getBoundingClientRect();
      const halfWidth = this.width / 2;
      rect = {
        left: nodeRect.left,
        right: nodeRect.right,
        top: nodeRect.top - halfWidth - 5,
        bottom: nodeRect.top + halfWidth - 5,
      };
    } else {
      const posAfterCurBlock = doc.resolve(this.cursorPos).after(1);
      const $posAfterCurBlock = doc.resolve(posAfterCurBlock);

      const indexCurBlock = $posAfterCurBlock.index(0);

      const beforeBlock = doc.child(Math.max(indexCurBlock - 1, 0));
      const beforeDOM = this.editorView.nodeDOM(
        posAfterCurBlock - (beforeBlock ? beforeBlock?.nodeSize : 0)
      );
      const afterDOM = this.editorView.nodeDOM(posAfterCurBlock);

      const nodeRect = (beforeDOM as HTMLElement).getBoundingClientRect();
      let top = beforeBlock ? nodeRect.bottom : nodeRect.top;
      if (afterDOM)
        top = (top + (afterDOM as HTMLElement).getBoundingClientRect().top) / 2;

      const halfWidth = this.width / 2;
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
        "position: absolute; z-index: 50; pointer-events: none; background-color: #8b5cf6;";
      this.element.classList.add("prosemirror-dropcursor-block");
    }

    this.element.style.left = rect.left + window.scrollX + "px";
    this.element.style.top = rect.top + window.scrollY + "px";
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
      console.log(pos);
      this.setCursor(pos.pos);
    }
  }

  dragend() {
    this.setCursor(null);
  }

  drop() {
    this.setCursor(null);
  }

  dragleave(e: DragEvent) {
    if (!this.editorView.dom.contains(e.relatedTarget as Node)) {
      this.setCursor(null);
    }
  }
}

export default DropCursor;
