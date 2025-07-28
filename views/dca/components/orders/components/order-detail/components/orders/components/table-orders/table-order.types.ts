export interface OrderItem {
  id: string;
  from: string;
  rate: string;
  to: string;
  fromIcon: string;
  toIcon: string;
  total: number;
  date: string;
}

export interface TableOrdersProps {
  data: OrderItem[];
}
