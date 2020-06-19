export interface FormInputChangeEvent {
  name: string;
  value: string | number | null | undefined;
  errors: string[];
}
