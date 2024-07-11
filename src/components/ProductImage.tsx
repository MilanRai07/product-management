import { useNavigate } from "react-router-dom";
import { product } from "../type/product";

const ProductImage = (props: product) => {
    const { title, price, image, id } = props;
    const navigate = useNavigate();

    const Navigate = (id: string) => {
        navigate(`/singlepage/${id}`)
    }

    return (
        <>
            <div className='group h-40 rounded-md w-48 overflow-hidden relative cursor-pointer border border-cyan-900'
                onClick={() => id !== null && Navigate(id)}
            >
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