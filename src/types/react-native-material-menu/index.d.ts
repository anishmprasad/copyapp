declare module 'react-native-material-menu' {
	import React from 'react';
	import { StyleProp, ViewStyle } from 'react-native';

	interface MenuProps {
		button: React.ReactNode;
		style?: StyleProp<ViewStyle>;
		onHidden?: () => void;
		animationDuration?: number;
		testID?: string;
		children?: React.ReactNode;
	}

	export default class Menu extends React.Component<MenuProps> {
		show(): void;
		hide(): void;
		isMenuOpen(): boolean;
	}

	export class MenuItem extends React.Component<{
		onPress?: () => void;
		disabled?: boolean;
		textStyle?: StyleProp<ViewStyle>;
		pressColor?: string;
		style?: StyleProp<ViewStyle>;
		children?: React.ReactNode;
	}> {}

	export class MenuDivider extends React.Component<{ style?: StyleProp<ViewStyle> }> {}
}
