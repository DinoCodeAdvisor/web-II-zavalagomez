import '../style/products.css'
import ProductItem from '../components/ProductItem'

export default function Products()
{
    return (
        <div>
            <div className='container-products'>
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    )
}