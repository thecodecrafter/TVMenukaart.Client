import { useCallback, useEffect } from "react";

type PopupModalProps = {
  dialogId: string;
  title: string;
  body?: React.ReactNode;
  show: boolean;
  // confirmationPromise: () => Promise<void>;
  handleClose: () => void;
};

export const PopupModal = (props: PopupModalProps) => {
  const { handleClose } = props;

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <dialog
      id={props.dialogId}
      onCancel={props.handleClose}
      className={`modal ${props.show ? "modal-open" : ""}`}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="py-4">{props.body}</p>
      </div>

      <button
        type="button"
        className="modal-backdrop"
        onClick={props.handleClose}
        aria-label="Close modal"
      />
    </dialog>
  );
};
