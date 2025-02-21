
export interface HistoryInterface {
    id: number,
    userId: number,
    date: string,
    products: ProductName[]
}

export interface ProductName{
    productId : number,
    quantity : number
}
