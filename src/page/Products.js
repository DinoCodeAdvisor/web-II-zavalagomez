import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import '../style/products.css'

export default function Products()
{
    const doesntHaveToken = localStorage.getItem("token") === undefined || localStorage.getItem("token") === null
    //const navigate = useNavigate();

    console.log("token:", localStorage.getItem("token"));

    if(doesntHaveToken)
    {
        window.location.href = "/login"
        // console.log("doesn't have token")
        // navigate("/login");
        return
    }

    return (
        <div>
            <div className='products-title'>
                <h2>Our Products</h2>
            </div>

            <div className='container-products'>
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    )
}