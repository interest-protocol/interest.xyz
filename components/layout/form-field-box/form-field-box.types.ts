import { TextFieldProps } from '@interest-protocol/ui-kit';
import { TextareaHTMLAttributes } from 'react';

export type TextAreaElementProps = Omit<
  TextareaHTMLAttributes<HTMLInputElement>,
  'color' | 'translate' | 'height' | 'width' | 'content'
>;

export interface FormFieldBoxProps extends TextFieldProps {
  isTextArea?: boolean;
}
