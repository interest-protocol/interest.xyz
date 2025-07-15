import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface FormFieldBoxProps {
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  supportingText?: string;
  width?: string | string[];
  height?: string | string[];
  register: UseFormRegisterReturn;
  icon?: ReactNode;
}
