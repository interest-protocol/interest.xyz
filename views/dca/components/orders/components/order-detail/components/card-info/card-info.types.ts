export type ImageValue = {
  url: string;
  alt?: string;
};

export type ValueType = string | number | ImageValue | null | undefined;

export interface CardInfoProps<T extends Record<string, unknown>> {
  width?: string;
  title?: string;
  headers: string[];
  keys: Array<keyof T>;
  values: T;
  isLoading: boolean;
}
