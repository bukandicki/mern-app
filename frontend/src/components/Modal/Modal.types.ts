import { HTMLAttributes } from "react";

export interface IModalType extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  disabled: boolean;
  email: string;
  onSubmittedForm?: (value: FormData) => void;
  onClosed: () => void;
}
