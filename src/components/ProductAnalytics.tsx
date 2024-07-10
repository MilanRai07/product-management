interface ProductAnalyticsProps {
    title: string;
    number: number;
    background: string
}

const ProductAnalytics = (props: ProductAnalyticsProps) => {
    const { title, number, background } = props;
    return (
        <>
            <div className={`w-36 h-36 text-white rounded text-sm font-bold FlexCenter flex-col ${background}`}>
                <p>{title}</p>
                <p className="text-xl">{number}</p>
            </div>
        </>
    )
}

export default ProductAnalytics