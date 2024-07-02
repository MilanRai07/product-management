import { useEffect } from "react";
import { useGetProductsQuery } from "../api/ProductApi"
import ProductImage from "../components/ProductImage";
import { product } from "../type/product";

const Home = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();

  useEffect(() => {
    refetch()
  }, [data])

  return (
    <>
      <section>
        <h1 className="PageHeader">Home</h1>
        {
          isLoading ?
            <h1>Loading....</h1>
            :
            <div className="Grid">
              {
                data?.map((item: product) => {
                  const { id, title, price, description, image, category } = item;
                  return (
                    <div key={id}>
                      <ProductImage
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        image={image}
                        category={category}
                      />
                    </div>
                  )
                })
              }
            </div>
        }
      </section>
    </>
  )
}

export default Home