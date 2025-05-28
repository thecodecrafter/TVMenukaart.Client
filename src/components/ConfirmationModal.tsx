import { useCallback, useEffect } from "react";

type ConfirmationModalProps = {
  dialogId: string;
  title: string;
  body?: React.ReactNode;
  show: boolean;
  confirmationPromise: () => Promise<void>;
  handleClose: () => void;
};
export const ConfirmationModal = (props: ConfirmationModalProps) => {
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

  const onConfirmHandler = () => {
    props
      .confirmationPromise()
      .then(() => {
        console.log("success");
      })
      .catch((error) => console.log(error))
      .finally(() => props.handleClose());
  };
  return (
    <dialog
      id={props.dialogId}
      onCancel={props.handleClose}
      className={`modal ${props.show ? "modal-open" : ""}`}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="py-4">{props.body}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn font-light" onClick={props.handleClose}>
              Nee
            </button>
            <button
              className="btn font-light btn-error text-[#FFF]"
              onClick={onConfirmHandler}
            >
              Ja, verwijderen
            </button>
          </form>
        </div>
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
