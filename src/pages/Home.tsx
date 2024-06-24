import { useGetProductsQuery } from "../api/ProductApi"
import ProductCard from "../components/ProductCard";

const Home = () => {
  const {data,isLoading}=useGetProductsQuery();
  console.log(data);
  return (
    <>
    <section className="">
       <h1 className="text-center text-3xl font-bold">Home</h1>
       <div>
        <ProductCard/>
       </div>
    </section>
    </>
  )
}

export default Home