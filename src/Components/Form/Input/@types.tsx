export interface iInputForm {
  id: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  label: string;
  register: object;
  value?: any;
  defaultValue?: any;
  className?: string;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
}
