import { useGetProductsQuery } from "../api/ProductApi"
import ProductImage from "../components/ProductImage";
import { product } from "../type/product";
import { useRefetch } from "../customhook/useRefetch";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery();
  useRefetch();
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
      </section>
    </>
  )
}

export default Home