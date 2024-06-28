import { useGetProductsQuery } from "../api/ProductApi"
import ProductImage from "../components/ProductImage";
import { product } from "../type/product";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <>
      <section className="">
        <h1 className="text-center text-3xl font-bold mb-14">Home</h1>
        {
          isLoading ?
            <h1>Loading....</h1>
            :
            <div className="FlexBetween">
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