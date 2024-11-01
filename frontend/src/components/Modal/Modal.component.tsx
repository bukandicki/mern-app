import { FormEvent } from "react";
import { IModalType } from "./Modal.types";

import "./Modal.styles.scss";
import { createPortal } from "react-dom";

export default function Modal({
  show,
  disabled,
  email,
  onSubmittedForm,
  onClosed,
}: IModalType) {
  const handleFormSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    if (onSubmittedForm) onSubmittedForm(fd);
  };

  return (
    <>
      {" "}
      {show &&
        createPortal(
          <div className="Modal">
            <div className="Modal__wrapper">
              <button className="Modal__close" onClick={() => onClosed()}>
                <span></span>
                <span></span>
              </button>

              <form onSubmit={handleFormSubmitted}>
                <h2>Create</h2>

                <label htmlFor="">Email</label>
                <input
                  type="email"
                  readOnly
                  autoComplete="off"
                  value={email}
                  name="email"
                />

                <label htmlFor="">Date</label>
                <input
                  type="date"
                  autoComplete="off"
                  disabled={disabled}
                  name="date"
                />

                <label htmlFor="">Description</label>
                <textarea
                  name="description"
                  autoComplete="off"
                  disabled={disabled}
                />

                <button type="submit" disabled={disabled}>
                  Submit
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
