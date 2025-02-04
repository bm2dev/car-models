import { useColorScheme } from '@/lib/rnr/hooks';
import React from 'react';
import { Platform, Pressable, PressableProps, ViewStyle } from 'react-native';

interface NativePressableProps extends PressableProps {
	children: React.ReactNode;
	style?: ViewStyle | ViewStyle[];
}

export function NativePressable({ children, style, ...props }: NativePressableProps) {
	const { colorScheme } = useColorScheme();

	return (
		<Pressable
			testID='pressable'
			android_ripple={{
				color: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
			}}
			style={({ pressed }) => [style, Platform.OS === 'ios' && pressed && { opacity: 0.7 }]}
			{...props}
		>
			{children}
		</Pressable>
	);
}
