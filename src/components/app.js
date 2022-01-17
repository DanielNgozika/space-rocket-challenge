import React, { useCallback, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";

import Sidedrawer from "./sidedrawer";
import { FavouritesContext } from "../contexts/favourites";

export default function App() {
	const [favourites, setFavourites] = useState(
		JSON.parse(localStorage.getItem("pleo-favourites")) || []
	);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleFavourite = useCallback(
		(item) => {
			const isFavourite = favourites.find((fav) =>
				fav.flight_number
					? fav.flight_number === item.flight_number
					: fav.name === item.name
			);
			if (isFavourite) {
				const filteredFavourites = favourites.filter(
					(fav) =>
						fav.flight_number !== item.flight_number ||
						fav.name !== item.name
				);
				setFavourites(filteredFavourites);
				localStorage.setItem(
					"pleo-favourites",
					JSON.stringify(filteredFavourites)
				);
			} else {
				setFavourites([...favourites, item]);
				localStorage.setItem(
					"pleo-favourites",
					JSON.stringify([...favourites, item])
				);
			}
		},
		[favourites]
	);

	function toggleSidebar() {
		setDrawerOpen(!drawerOpen);
	}

	const favouritesValue = useMemo(
		() => [favourites, toggleFavourite],
		[favourites, toggleFavourite]
	);

	return (
		<div>
			<FavouritesContext.Provider value={favouritesValue}>
				<NavBar drawerOpen={drawerOpen} toggleSidebar={toggleSidebar} />
				<Sidedrawer isOpen={drawerOpen} onClose={toggleSidebar} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/launches" element={<Launches />} />
					<Route path="/launches/:launchId" element={<Launch />} />
					<Route path="/launch-pads" element={<LaunchPads />} />
					<Route
						path="/launch-pads/:launchPadId"
						element={<LaunchPad />}
					/>
				</Routes>
			</FavouritesContext.Provider>
		</div>
	);
}

function NavBar({ drawerOpen, toggleSidebar }) {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="6"
			bg="gray.800"
			color="white"
		>
			<Text
				fontFamily="mono"
				letterSpacing="2px"
				fontWeight="bold"
				fontSize="lg"
			>
				¡SPACE·R0CKETS!
			</Text>
			<Button
				aria-label="Open Favourites drawer"
				padding="0"
				height="fit-content"
				background="none"
				_hover={{ background: "none" }}
				onClick={toggleSidebar}
			>
				{!drawerOpen && "<"} Favourites {drawerOpen && ">"}
			</Button>
		</Flex>
	);
}
