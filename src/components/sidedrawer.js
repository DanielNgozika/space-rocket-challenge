import React, { useContext } from "react";
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Box,
	Stack,
	Image,
	Badge,
	Text,
	Button
} from "@chakra-ui/core";
import { Star } from "react-feather";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../contexts/favourites";
import { randomColor } from "../utils/random-color";

const Sidedrawer = ({ isOpen, onClose }) => {
	const [favourites, toggleFavourite] = useContext(FavouritesContext);

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="right">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader textAlign="center">
					Favourites ({favourites.length})
				</DrawerHeader>
				<DrawerBody overflow="auto">
					<Stack direction="column">
						{favourites?.map((fav) => (
							<Favourite
								key={fav.id}
								fav={fav}
								favourites={favourites}
								toggleFavourite={toggleFavourite}
							/>
						))}
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default Sidedrawer;

const Favourite = ({ fav, toggleFavourite }) => {
	// const isFavourite = favourites.find(
	// 	(fav) => fav.flight_number === fav.flight_number
	// );

	return (
		<Box
			as={Link}
			to={
				fav?.flight_number
					? `/launches/${fav.flight_number?.toString()}`
					: `/launch-pads/${fav.site_id}`
			}
			boxShadow="md"
			borderWidth="2px"
			borderRadius="lg"
			position="relative"
			marginBottom="24px"
			padding="10px"
		>
			<Button
				aria-label="Add to/Remove from favorites button"
				padding="0"
				height="fit-content"
				background="none"
				_hover={{ background: "none" }}
				onClick={(e) => {
					toggleFavourite(fav);
					e.preventDefault();
					e.stopPropagation();
				}}
				position="absolute"
				top="-5px"
				right="0"
			>
				<Star fill="gold" color="black" size="35px" />
			</Button>
			{fav.flight_number ? (
				<Image
					src={
						fav.links?.flickr_images[0]?.replace(
							"_o.jpg",
							"_z.jpg"
						) ?? fav.links?.mission_patch_small
					}
					alt={`${fav.mission_name} launch`}
					height="100px"
					width="100%"
					objectFit="cover"
					objectPosition="bottom"
				/>
			) : (
				<Box
					background={`linear-gradient(${randomColor()}, ${randomColor()})`}
					height="100px"
				/>
			)}
			{fav.flight_number ? (
				<Text fontSize="sm" marginTop="10px" color="grey">
					Launch
				</Text>
			) : (
				<Text fontSize="sm" marginTop="10px" color="grey">
					Launchpad
				</Text>
			)}
			<Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
				{fav.mission_name || fav.name}
			</Box>

			{/* Badge for launchpads */}
			{!fav.flight_number && fav.status === "active" && (
				<Badge px="2" variant="solid" variantColor="green">
					Active
				</Badge>
			)}
			{!fav.flight_number && fav.status !== "active" && (
				<Badge px="2" variant="solid" variantColor="red">
					Retired
				</Badge>
			)}

			{/* Badge for launches */}
			{fav.flight_number && fav.launch_success && (
				<Badge px="2" variant="solid" variantColor="green">
					Successful
				</Badge>
			)}
			{fav.flight_number && !fav.launch_success && (
				<Badge px="2" variant="solid" variantColor="red">
					Failed
				</Badge>
			)}
		</Box>
	);
};
