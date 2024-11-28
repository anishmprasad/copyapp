import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

// Define the context types
interface HomeContextType {
	handlePlusIconPress: () => void;
	triggered: boolean;
}

// Create the context for the Home screen
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Custom hook to use the Home context
export const useHomeContext = (): HomeContextType => {
	const context = useContext(HomeContext);
	if (!context) {
		throw new Error('useHomeContext must be used within a HomeProvider');
	}
	return context;
};

// Define types for children prop
interface HomeProviderProps {
	children: ReactNode;
}

// Context provider component
export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
	const [triggered, setTriggered] = useState<boolean>(false);

	// Define the function to handle "Add" button press
	const handlePlusIconPress = (): void => {
		setTriggered(true);
		Alert.alert('Function Triggered from Home!');
	};

	return <HomeContext.Provider value={{ handlePlusIconPress, triggered }}>{children}</HomeContext.Provider>;
};
