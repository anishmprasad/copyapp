import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
	Button,
	TouchableWithoutFeedback,
	TextInput,
	SafeAreaView,
} from 'react-native';
import { useHomeContext } from '../../context/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard'; // Import Clipboard from the package
import Menu from './Menu';

const Card = ({ navigation, card, onChangeText, onDelete }: any) => {
	const { title, content, id } = card;
	const [menuVisible, setMenuVisible] = useState(false);
	const [copyMenuVisible, setCopyMenuVisible] = useState(false);

	const handleCopyFromClipboard = () => {
		Clipboard.getString().then((_content) => {
			// Handle clipboard content, here we display it in an alert
			console.log('Clipboard Data', `Copied content: ${_content}`);
			onChangeText(_content, id);
		});
	};

	const setTextarea = (_content: any) => {
		console.log('setTextarea', _content);
		onChangeText(_content, id);
	};

	const handleOutsideClick = () => {
		if (menuVisible) {
			setMenuVisible(false);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onLongPress={() => setCopyMenuVisible(true)} // Show single copy menu on long press
				delayLongPress={500} // Set delay for long press detection
				onPress={handleOutsideClick}
			>
				<View style={styles.card}>
					{/* Card Content */}
					<SafeAreaView>
						<TextInput
							style={styles.cardDescription}
							value={content}
							numberOfLines={8}
							editable
							onChangeText={setTextarea}
							placeholder={'Paste content from the clipboard'}
							multiline
						/>
					</SafeAreaView>

					{/* Single Copy Menu visible on long press */}
					{copyMenuVisible && (
						<View style={styles.menu}>
							<TouchableOpacity style={styles.menuItem} onPress={handleCopyFromClipboard}>
								<Text style={styles.menuText}>Copy from Clipboard</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* Kebab Menu */}
					<TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
						<Text>Menu</Text>
					</TouchableOpacity>

					{menuVisible && (
						<Menu
							onDelete={() => {
								setMenuVisible(false);
								onDelete(id);
							}}
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f2f5',
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
		width: '90%',
		padding: 20,
		position: 'relative',
		marginTop: 20, // Added margin-top
		marginBottom: 20, // Added margin-bottom
	},
	cardImage: {
		width: '100%',
		height: 150,
		borderRadius: 8,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
	},
	cardDescription: {
		fontSize: 14,
		color: '#555',
		marginTop: 5,
	},
	menuIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	menu: {
		position: 'absolute',
		top: 40,
		right: 10,
		backgroundColor: '#fff',
		borderRadius: 8,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		zIndex: 1,
	},
	menuItem: {
		padding: 10,
	},
	menuText: {
		fontSize: 16,
		color: '#333',
	},
	deleteText: {
		color: 'red',
		fontWeight: 'bold',
	},
});

export default Card;
