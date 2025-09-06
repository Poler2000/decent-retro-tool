import { colorSequence } from "../../ColourSequence";
import Button from "../Buttons/Button/Button";
import "./ConfirmationDialog.css";

export interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { message, onConfirm, onCancel } = props;

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog-msg-container">
        <span className="confirm-dialog-msg">{message}</span>
      </div>
      <div className="confirm-dialog-btn-container">
        <Button
          colors={{
            background: "var(--primary-background-colour)",
            text: "var(--primary-text-colour)",
          }}
          onClick={onCancel}
          additionalClass="confirm-dialog-btn confirm-dialog-btn-cancel"
        >
          Cancel
        </Button>
        <Button
          colors={{
            background: "var(--primary-background-colour)",
            text: "var(--primary-text-colour)",
          }}
          onClick={onConfirm}
          additionalClass="confirm-dialog-btn confirm-dialog-btn-confirm"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
