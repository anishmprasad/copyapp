import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

export function GoogleSigninAuth(){
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.file'], // Access to Google Drive
        webClientId: '113568152429935166480.apps.googleusercontent.com',
        offlineAccess: true,
    });
}


export const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens(); // Get access tokens
      console.log('Access Token:', tokens.accessToken);
    } catch (error) {
      console.log(error);
    }
  };


export const listDriveFiles = async (accessToken: any) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      // Make a request to the Drive API
      const response = await axios.get('https://www.googleapis.com/drive/v3/files', { headers });
      // Process the response
      const files = response.data.files;
      console.log('Files from Drive:', files);
      // List the file names or IDs
      files.forEach((file: { name: any; id: any; }) => {
        console.log(`File Name: ${file.name}, File ID: ${file.id}`);
      });
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };