export interface FormInputChangeEvent {
  name: string;
  value: string | number | null | undefined;
  errors: string[];
}

export interface FormSubmittedEvent {
  formId: string;
  values: object;
}
