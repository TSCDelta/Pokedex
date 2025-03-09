import React from "react";
import SearchPage from "./SearchPage";
import "./App.css";

const App = () => {
	return (
		<div className='app'>
			<h1 className='title'>Pokédex</h1>
			<SearchPage />
		</div>
	);
};

export default App;
