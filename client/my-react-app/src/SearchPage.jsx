import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchPage.css";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
	const [types, setTypes] = useState([]);
	const [type, setType] = useState("");
	const [pokemonList, setPokemonList] = useState([]);
	const [searchTerm, setSearchTerm] = useState(""); // State for search bar
	const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false); // State for popup
	const navigate = useNavigate();

	// Fetch Pokémon types
	useEffect(() => {
		const fetchTypes = async () => {
			const response = await axios.get("https://pokeapi.co/api/v2/type");
			setTypes(response.data.results);
		};
		fetchTypes();
	}, []);

	// Fetch Pokémon by type
	const fetchPokemonByType = async () => {
		try {
			const url = type ? `https://pokeapi.co/api/v2/type/${type}` : "";
			const response = await axios.get(url);

			if (type) {
				setPokemonList(response.data.pokemon.map((p) => p.pokemon.name));
			} else {
				setPokemonList([]);
			}
		} catch (err) {
			setPokemonList([]);
		}
	};

	// Search for a specific Pokémon
	const handleSearch = async () => {
		if (searchTerm.trim() === "") return;

		try {
			const response = await axios.get(
				`http://localhost:5000/api/pokemon/${searchTerm.toLowerCase()}`
			);
			navigate(`/pokemon/${searchTerm.toLowerCase()}`, {
				state: response.data,
			});
		} catch (error) {
			alert("Pokemon not found. Please try another name.");
		}
	};

	// Trigger search on Enter key
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// Navigate to Pokémon details on click
	const handlePokemonClick = (name) => {
		navigate(`/pokemon/${name.toLowerCase()}`);
	};

	// Toggle filter popup
	const toggleFilterPopup = () => {
		setIsFilterPopupOpen(!isFilterPopupOpen);
	};

	return (
		<div className='search-page'>
			{/* Search Bar at the Top */}
			<div className='search-bar'>
				<label htmlFor='search'>Search Pokémon:</label>
				<input
					type='text'
					id='search'
					placeholder='Enter Pokémon name...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>

			{/* Filter Button to Open Popup */}
			<div className='filter-button-container'>
				<button onClick={toggleFilterPopup}>Filter by Type</button>
			</div>

			{/* Type Filter Popup */}
			{isFilterPopupOpen && (
				<div className='filter-popup'>
					<div className='filter-popup-content'>
						<h3>Select Pokémon Type</h3>
						<select
							id='type'
							value={type}
							onChange={(e) => setType(e.target.value)}>
							<option value=''>Any</option>
							{types.map((t) => (
								<option key={t.name} value={t.name}>
									{t.name}
								</option>
							))}
						</select>
						<div className='popup-buttons'>
							<button onClick={fetchPokemonByType}>Apply</button>
							<button onClick={toggleFilterPopup}>Close</button>
						</div>
					</div>
				</div>
			)}

			{/* Pokémon List */}
			<div className='pokemon-list'>
				{pokemonList.map((name, index) => (
					<button
						key={index}
						className='pokemon-item'
						onClick={() => handlePokemonClick(name)}>
						{name}
					</button>
				))}
			</div>
		</div>
	);
};

export default SearchPage;
