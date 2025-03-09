import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PokedexPage.css";

const PokedexPage = () => {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/pokemon/${name}`
				);
				setPokemon(response.data);
			} catch (err) {
				setError("Pokemon not found");
			}
		};

		fetchPokemon();
	}, [name]);

	if (error) {
		return <p className='error'>{error}</p>;
	}

	if (!pokemon) {
		return <p>Loading...</p>;
	}

	return (
		<div className='pokemon-info'>
			<h2>{pokemon.name.toUpperCase()}</h2>
			<img src={pokemon.sprites.front_default} alt={pokemon.name} />
			<p>
				<strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m
			</p>
			<p>
				<strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg
			</p>
			<p>
				<strong>Base Stats:</strong>
			</p>
			<div className='stats'>
				{pokemon.stats.map((stat) => (
					<div key={stat.stat.name} className='stat'>
						{stat.stat.name.toUpperCase()}: {stat.base_stat}
					</div>
				))}
			</div>
			<p>
				<strong>Types:</strong>{" "}
				{pokemon.types.map((type) => type.type.name).join(", ")}
			</p>
			<h3>Pokédex Entries:</h3>
			<div className='pokedex-entries'>
				{pokemon.pokedexEntries.map((entry, index) => (
					<div key={index} className='entry-box'>
						<h4>Game: {entry.version.toUpperCase()}</h4>
						<p>{entry.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PokedexPage;
