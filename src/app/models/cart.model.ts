export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
  total: number; // Total price of the cart
}

export interface CartProduct {
  productId: number;
  quantity: number;
}
