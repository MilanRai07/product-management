import { useGetProductsQuery } from "../api/ProductApi"
import ProductImage from "../components/ProductImage";
import { product } from "../type/product";
import { useRefetch } from "../customhook/useRefetch";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import useFilterData from "../customhook/useFilterData";

const ITEMS_PER_PAGE = 8;
const Others = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading } = useGetProductsQuery();
    let otherData = useFilterData(data ?? [], 'others');

    const pageCount = Math.ceil((otherData?.length ?? 0) / ITEMS_PER_PAGE)
    useRefetch();

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = otherData?.slice(offset, offset + ITEMS_PER_PAGE);

    return (
        <>
            <section>
                <h1 className="PageHeader">Home</h1>
                {
                    isLoading ?
                        <h1>Loading....</h1>
                        :
                        <div className="Grid min-h-[347px] ">
                            {
                                currentPageData?.map((item: product) => {
                                    const { id, title, price, description, image, category, date } = item;
                                    return (
                                        <div key={id}>
                                            <ProductImage
                                                id={id}
                                                title={title}
                                                price={price}
                                                description={description}
                                                image={image}
                                                category={category}
                                                date={date}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
                <div className="FlexCenter">
                    <ReactPaginate
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'flex mt-12 gap-7 font-bold'}
                        activeClassName={'text-cyan-700'}
                    />
                </div>
            </section>
        </>
    )
}

export default Others