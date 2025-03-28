import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/product_details.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductsById(id);
      console.log(data);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const image = "https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA";

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      ) : (
        product && (
          <div className="page-container">
            <div className="product-details-page-container">
              <div className="product-image-container">
                <img src={product.images?.[0] || image} alt="Product" />
              </div>

              <div className="product-details-container">
                <div className="toast-bar">
                  <h6>
                    Home <span> - </span> Products <span> - </span> {titleCase(product.category)}
                  </h6>
                </div>
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </div>
                <div className="product-highlights">
                  <h5>Highlights:</h5>
                  <ul>
                    <li>Lightweight and Responsive Midsole.</li>
                    <li>Full-Length Zoom Air Unit.</li>
                    <li>Breathable Mesh Upper.</li>
                  </ul>
                </div>
                <div className="product-specifications">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Brand</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{titleCase(product.category)}</td>
                        <td>{product.brand}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>${product.price}</h5>
                </div>
                <div className="product-buttons">
                  <button id="add-to-cart-button">Add to cart</button>
                  <button id="add-to-wishlist-button">❤️ Add to wishlist</button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

async function getProductsById(id) {
  const product = await fetch(`https://dummyjson.com/products/${id}`);
  return product.json();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}