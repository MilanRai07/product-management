import { product } from "../type/product";

const ProductImage = (props: product) => {
    const { title, price, image } = props;

    return (
        <>
            <div className='group h-48 rounded-md w-56 overflow-hidden relative cursor-pointer shadow-2xl'>
                <img src={image} alt={title}></img>
                <div className="overlay">
                    <div>
                        <h3 className="mb-2 font-bold">{title}</h3>
                        <p>{price}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductImage