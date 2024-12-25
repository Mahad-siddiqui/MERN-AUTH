import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Home() {
	const [loggedInUser, setLoggedInUser] = useState("");
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	let isFetching = false;

	useEffect(() => {
		setLoggedInUser(localStorage.getItem("loggedInUser"));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		handleSuccess("User Logged Out");
		setTimeout(() => {
			navigate("/login");
		}, 1000);
	};

	const fetchProducts = async () => {
		if (isFetching) return; // Prevent duplicate calls
		isFetching = true;

		try {
			const url = "http://localhost:5000/products";
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			});
			const result = await response.json();
			console.log(result);
			setProducts((prevProducts) => [...prevProducts, ...result]); // Append to avoid overwriting
		} catch (err) {
			handleError("Failed to fetch products. Please try again later.");
		} finally {
			isFetching = false;
		}
	};

	useEffect(() => {
		if (!products.length) fetchProducts(); // Fetch only if empty
	}, []);

	return (
		<div>
			<h1>Welcome {loggedInUser}</h1>
			<button onClick={handleLogout}>Logout</button>
			<div>
				{products &&
					products.map((item, index) => (
						<ul key={index}>
							<span>
								{item.name} : {item.price}
							</span>
						</ul>
					))}
			</div>
			<ToastContainer />
		</div>
	);
}

export default Home;
