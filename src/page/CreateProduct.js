import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createproduct.css'
import CreateProductActions from '../functions/CreateProductActions';
import { useFormStatus } from 'react-dom';

async function productAction(state, action) {
    switch (action.type) {
        case 'POST':
            const { title, description, category, price } = action.payload;
            try {
                const response = await CreateProductActions({ title, description, category, price });
                console.log('POST response:', response);
                return { 
                    ...state,  // Keep previous state
                    title, 
                    description, 
                    category, 
                    price, 
                    ...response // Add new data to state
                };                
            } catch (error) {
                console.error("Error in POST action:", error);
                return state; // Return the current state if error occurs
            }

        case 'PATCH':
            const { id, ...rest } = action.payload;
            return { ...rest };
        
        default:
            return state;
    }
}

export default function CreateProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(""); // State for error message

    const [state, dispatch] = useReducer(productAction, {
        title: "",
        description: "",
        category: "",
        price: 0
    });

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title || !description || !category || !price) {
            setError("All fields are required!");
            return;
        }

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await CreateProductActions(data); // Assuming CreateProductActions is your API call
            console.log(response);

            const newProducts = localStorage.getItem("newProducts") !== null
                ? JSON.parse(localStorage.getItem("newProducts"))
                : [];
            newProducts.push(response);

            const newProductsString = JSON.stringify(newProducts);
            localStorage.setItem("newProducts", newProductsString);

            //navigate('/products'); 

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
            {/* Display the updated state */}
            <div>
                <h3>Updated Product State:</h3>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
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
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Display error message if any field is empty */}
                {error && <div className="error-message">{error}</div>}

                {/* First button: uses useReducer to create product */}
                <ButtonWithReduceCreate />

                {/* Second button: directly calls CreateProductActions */}
                <ButtonSave />
            </form>
        </div>
    );

    function ButtonWithReduceCreate() {
        return (
            <button type="button" onClick={() => dispatch({ type: "POST", payload: { title, description, category, price } })}>
                Create Product (with Reducer)
            </button>
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
}
