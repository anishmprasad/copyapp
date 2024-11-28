import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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

// AsyncStorage.setItem('storedData', JSON.stringify(sampledata));

export const saveDataToLocalStorage = async (data: any) => {
	try {
		const jsonData = JSON.stringify(data); // Convert data to JSON string
		await AsyncStorage.setItem('storedData', jsonData);
		console.log('Data saved to local storage.');
	} catch (error) {
		console.error('Error saving data:', error);
	}
};

export const fetchDataFromLocalStorage = async () => {
	try {
		const jsonData = await AsyncStorage.getItem('storedData');
		return jsonData != null ? JSON.parse(jsonData) : []; // Parse JSON string to object
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

export const deleteStoredData = async () => {
	try {
		await AsyncStorage.removeItem('storedData'); // Remove the item with the key 'storedData'
		Alert.alert('Success', 'Stored data deleted successfully!');
	} catch (error) {
		Alert.alert('Error', 'Failed to delete the stored data.');
		console.error('Error deleting storedData:', error);
	}
};
