import Dialog from "../Dialog/Dialog";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./MarkdownDialog.css";

export interface MarkdownDialogProps {
  message: string;
  onCancel: () => void;
  onCopy: () => void;
}

const MarkdownDialog = (props: MarkdownDialogProps) => {
  const { message, onCancel, onCopy } = props;

  return (
    <Dialog onCancel={onCancel} onCopy={onCopy}>
      <div className="dialog-msg-container markdown-msg-container">
        <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
      </div>
    </Dialog>
  );
};

export default MarkdownDialog;
