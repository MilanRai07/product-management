import { allProducts, product } from "../type/product"

const useFilterData = (data: allProducts, category: string) => {
    let newData = data.filter((item: product) => {
        return item.category == category;
    })
    return newData;
}

export default useFilterData