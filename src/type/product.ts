export interface product {
    id: string | null,
    title: string,
    price: number | null,
    description: string,
    image: any,
    category: string,
    date:string
}
export type allProducts = product[];
