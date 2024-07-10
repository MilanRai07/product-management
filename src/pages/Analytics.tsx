import { useGetProductsQuery } from "../api/ProductApi"
import ProductAnalytics from "../components/ProductAnalytics";
import useFilterData from "../customhook/useFilterData";
import PieChart from '../components/PieChart';

const Analytics = () => {
    const { data } = useGetProductsQuery();
    const MobileLength = useFilterData(data ?? [], 'mobile').length;
    const LaptopLength = useFilterData(data ?? [], 'laptops').length;;
    const OtherLength = useFilterData(data ?? [], 'others').length;

    const chartData = [MobileLength, LaptopLength, OtherLength];

    return (
        <>
            <section>
                <h1 className="PageHeader">Analytics</h1>
                <div className="FlexBetween items-center w-full h-96">
                    <div className="flex gap-5">
                        <ProductAnalytics
                            title={'Mobile'}
                            number={MobileLength}
                            background={'bg-cyan-700'}
                        />
                        <ProductAnalytics
                            title={'Laptop'}
                            number={LaptopLength}
                            background={'bg-indigo-600'}
                        />
                        <ProductAnalytics
                            title={'Others'}
                            number={OtherLength}
                            background={'bg-red-600'}
                        />
                    </div>
                    <PieChart data={chartData} />
                </div>
            </section>
        </>
    )
}

export default Analytics