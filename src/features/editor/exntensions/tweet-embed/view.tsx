import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Tweet } from "react-tweet";

export default function View({ node }: NodeViewProps) {
  const url = node.attrs.url;
  const tweetIdRegex = /\/status\/(\d+)/g;
  const id = tweetIdRegex.exec(url)?.[1];

  return (
    <NodeViewWrapper>
      <Tweet id={id ?? ""} />
    </NodeViewWrapper>
  );
}
