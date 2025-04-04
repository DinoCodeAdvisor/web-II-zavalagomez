import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createproduct.css'
import CreateProductActions from '../functions/CreateProductActions';
import { useFormStatus } from 'react-dom';

export default function CreateProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]); // Fills the categories select
    const [category, setCategory] = useState(""); // Gets the selected category
    const [price, setPrice] = useState("");
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();  // Prevents the default form submission

        // Validation: Check if any of the fields are empty
        if (!title || !description || !category || !price) {
            setError("All fields are required!");  // Set the error message
            return;  // Stop submission if validation fails
        }

        const formdata = new FormData(event.target);  // Gets data from the form
        const data = Object.fromEntries(formdata);  // Converts FormData to a plain object

        try {
            const response = await CreateProductActions(data);  // Assuming CreateProductActions is your API call
            console.log(response);

            // Store the new product in localStorage
            const newProducts = localStorage.getItem("newProducts") != null ? JSON.parse(localStorage.getItem("newProducts")) : [];
            newProducts.push(response);

            const newProductsString = JSON.stringify(newProducts);
            localStorage.setItem("newProducts", newProductsString);

            // Optionally, navigate after successful submission
            // navigate('/somewhere');  // Uncomment this to navigate after successful creation
        } catch (error) {
            console.error("Error creating product:", error);
        }
    }

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('https://dummyjson.com/products/categories');
            const data = await response.json();
            setCategories(data);
        }

        fetchCategories();
    }, []);

    return (
        <div className="page-container">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type='text'
                        placeholder='Enter product title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4" /* Sets the height of the textarea */
                    />
                </div>
                <div className="form-row">
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((c) => (
                                <option key={c.slug} value={c.slug}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            type='number'
                            placeholder='Enter product price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Display error message if any field is empty */}
                {error && <div className="error-message">{error}</div>}

                <ButtonSave />
            </form>
        </div>
    );
}

function ButtonSave() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Create Product"}
        </button>
    );
}
