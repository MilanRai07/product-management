import { useEffect } from "react"
import { useGetProductsQuery } from "../api/ProductApi"


export const useRefetch = () => {
    const { data, refetch } = useGetProductsQuery();
    useEffect(() => {
        refetch()
    }, [data])
}