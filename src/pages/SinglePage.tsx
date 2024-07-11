import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useGetProductsQuery } from "../api/ProductApi";
import { product } from "../type/product";

const SinglePage = () => {
    const key = useParams(); //to ensure key is extracted as string
    const checkId = key.key;
    const { data } = useGetProductsQuery();
    const [pageData, setPageData] = useState<product | undefined>()

    useEffect(() => {
        if (data) {
            const getProduct = data.find((item: product) => item.id === checkId);
            setPageData(getProduct)
        }
    }, [key, data]);
    return (
        <>
            <section>
                <h1 className="PageHeader">{pageData?.title}</h1>
                <div className="w-full FlexBetween shadow-lg">
                    <div className="w-1/3 h-[410px] border-2 border-slate-700 font-bold text-slate-600">
                        <img src={pageData?.image} className="h-64 w-full cursor-pointer"></img>
                        <div className="p-6 text-center">
                            <div className="w-full flex justify-between mb-10 text-sm">
                                <p className="bg-cyan-600 px-2 rounded-md text-white" >{pageData?.category}</p>
                                <p>{pageData?.date}</p>
                            </div>
                            <p>{`Rs. ${pageData?.price}`}</p>
                        </div>
                    </div>
                    <div className=" h-[410px] w-2/3 p-5 text-justify ">
                        <p>{pageData?.description}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SinglePage