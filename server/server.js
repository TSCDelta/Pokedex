import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PokeAPI Base URL
const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKE_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

// Endpoint to fetch Pokemon data
app.get("/api/pokemon/:name", async (req, res) => {
	const { name } = req.params;
	try {
		const pokemonResponse = await axios.get(
			`${POKE_API_URL}/${name.toLowerCase()}`
		);
		const speciesResponse = await axios.get(
			`${POKE_SPECIES_URL}/${name.toLowerCase()}`
		);

		res.json({
			...pokemonResponse.data,
			pokedexEntries: speciesResponse.data.flavor_text_entries
				.filter((entry) => entry.language.name === "en")
				.map((entry) => ({
					text: entry.flavor_text.replace(/\f|\n/g, " "),
					version: entry.version.name,
				})),
		});
	} catch (error) {
		res.status(404).json({ message: "Pokemon not found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
