import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Tweet } from "react-tweet";

export default function View({ node }: NodeViewProps) {
  const id = node.attrs.tweetId;

  if (!id) return null;

  return (
    <NodeViewWrapper>
      <Tweet id={id} />
    </NodeViewWrapper>
  );
}
