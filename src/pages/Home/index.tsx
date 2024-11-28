import React, { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import Card from '../../components/Card';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchDataFromLocalStorage, saveDataToLocalStorage } from './store';

const sampledata = [
	{
		title: 'Card Title 1',
		content: 'This is a simple card component with kebab menu',
		id: 1,
	},
	{
		title: 'Card Title 2',
		content: 'This is a simple card component with kebab menu',
		id: 2,
	},
	{
		title: 'Card Title 3',
		content: 'This is a simple card component with kebab menu',
		id: 3,
	},
];

// Define an interface for the data structure of each card
interface CardData {
	title: string;
	content: string;
	id: number;
}

export default function Home(props: any) {
	const { navigation } = props;
	const [data, setData] = useState<CardData[]>([]);

	// Load data from local storage when the component mounts
	useEffect(() => {
		const loadData = async () => {
			const storedData = await fetchDataFromLocalStorage();
			console.log('Stored Data:', storedData);
			if (storedData) setData(storedData);
		};
		loadData();
	}, []);

	// Handle adding a new card
	const handlePlusIconPress = useCallback(() => {
		const epochInMilliseconds = Date.now();
		const newCard: CardData = {
			title: 'Untitled Card',
			content: 'Paste content from the clipboard',
			id: epochInMilliseconds,
		};
		setData((prevData) => {
			const updatedData = [newCard, ...prevData];
			saveDataToLocalStorage(updatedData); // Save updated data to local storage
			return updatedData;
		});
	}, []);

	// Update the content of a card
	const handleUpdateCard = (content: string, id: number) => {
		setData((prevData) => {
			const updatedData = prevData.map((item) => (item.id === id ? { ...item, content } : item));
			saveDataToLocalStorage(updatedData); // Save updated data to local storage
			return updatedData;
		});
	};

	useEffect(() => {
		// Dynamically set the headerRight button
		navigation.setOptions({
			headerRight: () => (
				<Ionicons
					name={'add'}
					size={30}
					color={'black'}
					style={{ marginRight: 20 }}
					onPress={handlePlusIconPress}
				/>
			),
		});
	}, [navigation, handlePlusIconPress]); // Ensure it re-renders if needed

	const onDelete = (id: any) => {
		console.log('onDelete', id);
		setData((prevData) => {
			const updatedData = data.filter((item) => item.id !== id);
			saveDataToLocalStorage(updatedData); // Save updated data to local storage
			return updatedData;
		});
	};

	console.log('data', data);

	return (
		<ScrollView>
			{data.map((card, index) => (
				<Card card={card} key={index} {...props} onChangeText={handleUpdateCard} onDelete={onDelete} />
			))}
		</ScrollView>
	);
}
