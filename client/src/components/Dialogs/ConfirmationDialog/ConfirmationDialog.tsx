import Dialog from "../Dialog/Dialog";

export interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { message, onConfirm, onCancel } = props;

  return (
    <Dialog onConfirm={onConfirm} onCancel={onCancel}>
      <div className="dialog-msg-container">
        <span className="dialog-msg">{message}</span>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
