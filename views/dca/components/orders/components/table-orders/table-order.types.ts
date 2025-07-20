export interface OrderItem {
  from: string;
  to: string;
  fromIcon: string;
  toIcon: string;
  orders: number;
  amount: string;
  percentage: string;
}

export interface TableOrdersProps {
  data: OrderItem[];
}
