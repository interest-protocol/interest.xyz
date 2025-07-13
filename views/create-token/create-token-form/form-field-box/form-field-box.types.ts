import { ICreateTokenForm } from '../../create-token.types';

export interface FormFieldBoxProps {
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  supportingText?: string;
  width?: string | string[];
  height?: string | string[];
  registerName: keyof ICreateTokenForm;
}
