export interface product {
    id: number | null,
    title: string,
    price: number | null,
    description: string,
    image: any,
    category: string
}
export type allProducts = product[];
