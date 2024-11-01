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

              <form className="Modal__form" onSubmit={handleFormSubmitted}>
                <h2>Create Email</h2>

                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    readOnly
                    autoComplete="off"
                    value={email}
                    name="email"
                  />
                </div>

                <div>
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    autoComplete="off"
                    disabled={disabled}
                    name="date"
                  />
                </div>

                <div>
                  <label htmlFor="">Description</label>
                  <textarea
                    name="description"
                    autoComplete="off"
                    placeholder="Enter email messages..."
                    cols={40}
                    disabled={disabled}
                  />

                  <p>
                    *Ethereal is a fake SMTP service, It's a completely free
                    anti-transactional email service where messages never get
                    delivered.
                  </p>
                </div>

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
