/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { deleteStoredData } from '../Home/store';
import { GoogleSigninAuth } from '../../actions/authentication';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const ProfilePage = () => {
	
	const [files, setFiles] = useState([]);

	const handleClickAction = () => {
		deleteStoredData();
	};
	useEffect(()=>{
		GoogleSigninAuth();
	},[]);

	// eslint-disable-next-line @typescript-eslint/no-shadow
	const listDriveFiles = async (accessToken: any, setFiles: { (value: React.SetStateAction<never[]>): void; (arg0: any): void; }) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};

		try {
			const response = await axios.get('https://www.googleapis.com/drive/v3/files', { headers });
			// eslint-disable-next-line @typescript-eslint/no-shadow
			const files = response.data.files;
			setFiles(files); // Store the files in state
			console.log(files)
			ToastAndroid.show('Success, Files Fetched from google drive!', ToastAndroid.SHORT);
		} catch (error) {
			console.error('Error fetching files:', error);
			ToastAndroid.show('Failed, Error from google drive!', ToastAndroid.SHORT);
		}
	};

	const fetchFiles = async () => {

		try {
			const { accessToken } = await GoogleSignin.getTokens(); // Ensure user is signed in
			console.log('accessToken', accessToken);
			await listDriveFiles(accessToken, setFiles); // Fetch files and update state
		} catch (error: any) {
			console.log('error from fetchFiles', error);
			ToastAndroid.show('Not signed into Google Drive.', ToastAndroid.SHORT);
		}
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
					<Text onPress={fetchFiles}>Fetch Google Drive Files</Text>
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
