import React from "react";
import Button from "../../Buttons/Button/Button";
import "./Dialog.css";

export interface SectionConfigDialogProps extends React.PropsWithChildren {
  onConfirm?: () => void;
  onCancel?: () => void;
  onCopy?: () => void;
}

const Dialog = (props: SectionConfigDialogProps) => {
  const { onConfirm, onCancel, onCopy, children } = props;
  const [copyAnimating, setCopyAnimating] = React.useState(false);

  const handleCopyClick = () => {
    if (!onCopy) return;

    // restart animation if already running
    if (copyAnimating) {
      setCopyAnimating(false);
      setTimeout(() => setCopyAnimating(true), 0);
    } else {
      setCopyAnimating(true);
    }

    onCopy();
  };

  const handleAnimationEnd: React.AnimationEventHandler<
    HTMLButtonElement
  > = () => {
    setCopyAnimating(false);
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        {children}
        <div className="dialog-btn-container">
          {onCancel && (
            <Button
              onClick={onCancel}
              additionalClass="dialog-btn dialog-btn-cancel"
            >
              Cancel
            </Button>
          )}
          {onCopy && (
            <Button
              onClick={handleCopyClick}
              onAnimationEnd={handleAnimationEnd}
              additionalClass={`dialog-btn dialog-btn-copy ${
                copyAnimating ? "pulse" : ""
              }`}
            >
              {copyAnimating ? "Copied!" : "Copy"}
            </Button>
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              additionalClass="dialog-btn dialog-btn-confirm"
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
