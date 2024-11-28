import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

// Define the context types
interface ContextType {
	handlePlusIconPress: () => void;
	triggered: boolean;
}

// Define types for children prop
interface ProviderProps {
	children: ReactNode; // This allows `children` to be any valid React node
}

// Create a context with default values (we'll use an empty function for now)
const Context = createContext<ContextType | undefined>(undefined);

// Custom hook to use the Home context
export const useBaseContext = (): ContextType => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('useHomeContext must be used within a HomeProvider');
	}
	return context;
};

// Context provider component
export const Provider: React.FC<ProviderProps> = ({ children }) => {
	const [triggered, setTriggered] = useState<boolean>(false);

	// Function to trigger when the plus icon is clicked
	const handlePlusIconPress = (): void => {
		setTriggered(true);
		Alert.alert('Function Triggered from Context!');
	};

	return <Context.Provider value={{ handlePlusIconPress, triggered }}>{children}</Context.Provider>;
};
