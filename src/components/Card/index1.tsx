import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

interface Card {
	id: string;
	text: string;
}

const CardListApp: React.FC = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [newCardText, setNewCardText] = useState<string>('');
	const menuRefs = useRef<Record<string, Menu | null>>({});

	useEffect(() => {
		const loadCards = async () => {
			const storedCards = await AsyncStorage.getItem('cards');
			if (storedCards) {
				setCards(JSON.parse(storedCards));
			}
		};
		loadCards();
	}, []);

	const saveCards = async (updatedCards: Card[]) => {
		await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));
	};

	const addCard = () => {
		if (newCardText.trim() === '') {
			Alert.alert('Error', 'Card text cannot be empty');
			return;
		}

		const updatedCards = [...cards, { id: Date.now().toString(), text: newCardText }];
		setCards(updatedCards);
		saveCards(updatedCards);
		setNewCardText('');
	};

	const deleteCard = (id: string) => {
		const updatedCards = cards.filter((card) => card.id !== id);
		setCards(updatedCards);
		saveCards(updatedCards);
	};

	const renderCard = ({ item }: { item: Card }) => (
		<View style={styles.card}>
			<Text style={styles.cardText}>{item.text}</Text>
			<Menu
				ref={(ref) => (menuRefs.current[item.id] = ref)}
				button={
					<TouchableOpacity onPress={() => menuRefs.current[item.id]?.show()}>
						<Text style={styles.kebabMenu}>⋮</Text>
					</TouchableOpacity>
				}
			>
				<MenuItem
					onPress={() => {
						menuRefs.current[item.id]?.hide();
						deleteCard(item.id);
					}}
				>
					Delete
				</MenuItem>
				<MenuDivider />
			</Menu>
		</View>
	);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={'Enter card text'}
				value={newCardText}
				onChangeText={setNewCardText}
			/>
			<TouchableOpacity style={styles.addButton} onPress={addCard}>
				<Text style={styles.addButtonText}>Add Card</Text>
			</TouchableOpacity>
			<FlatList
				data={cards}
				keyExtractor={(item) => item.id}
				renderItem={renderCard}
				contentContainerStyle={styles.cardList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#fff',
	},
	addButton: {
		backgroundColor: '#4caf50',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 20,
	},
	addButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	cardList: {
		flexGrow: 1,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 15,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardText: {
		fontSize: 16,
	},
	kebabMenu: {
		fontSize: 20,
		color: '#999',
	},
});

export default CardListApp;
