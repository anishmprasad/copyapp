import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { deleteStoredData } from '../Home/store';

const ProfilePage = () => {
	const handleClickAction = () => {
		deleteStoredData();
	};
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.profileContainer}>
					{/* Profile Image */}
					<Image
						source={{ uri: 'https://eu.ui-avatars.com/api/?name=Anish&size=250' }} // Replace with your image URL
						style={styles.profileImage}
						onLoad={() => console.log('Image loaded successfully')}
						onError={(error) => console.log('Failed to load image', error)}
					/>
					{/* Name */}
					<Text style={styles.name}>A + M + P</Text>
					{/* Clickable Text */}
					<TouchableOpacity onPress={handleClickAction}>
						<Text style={styles.clickableText}>Delete Stored Data</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
	},
	profileContainer: {
		alignItems: 'center',
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75, // To make the image circular
		marginBottom: 20, // Space between the image and name
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	clickableText: {
		fontSize: 14,
		color: '#007BFF',
		marginTop: 14,
		textDecorationLine: 'underline',
	},
});

export default ProfilePage;
