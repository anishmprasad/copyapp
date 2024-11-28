import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Menu({ onDelete, onCopy }: any) {
	const handleDelete = () => {
		Alert.alert('Delete', 'Are you sure you want to delete this?', [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Delete', onPress: onDelete, style: 'destructive' },
		]);
	};

	return (
		<View style={styles.menu}>
			<TouchableOpacity style={styles.menuItem} onPress={onCopy}>
				<Text style={styles.menuText}>Copy</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
				<Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
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
