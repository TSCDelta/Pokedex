import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import PokedexPage from "./PokedexPage";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/pokemon/:name' element={<PokedexPage />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
