import Button from "../../Buttons/Button/Button";
import "./Dialog.css";

export interface SectionConfigDialogProps extends React.PropsWithChildren {
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog = (props: SectionConfigDialogProps) => {
  const { onConfirm, onCancel, children } = props;

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        {children}
        <div className="dialog-btn-container">
          <Button
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
            onClick={onCancel}
            additionalClass="dialog-btn dialog-btn-cancel"
          >
            Cancel
          </Button>
          <Button
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
            onClick={onConfirm}
            additionalClass="dialog-btn dialog-btn-confirm"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
