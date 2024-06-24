export interface product {
    id: number,
    title: string,
    price: number,
    description: number,
    Image: string,
    category: string
}
export interface allProducts {
    products: product[];
}