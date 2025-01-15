import { ThemeToggle } from '@/components';
import '@/lib/rnr/config/customComponentsConfig';
import { ThemeProvider } from '@/lib/rnr/providers';
import { Stack } from 'expo-router';
import * as React from 'react';
import '../global.css';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export default function AppProviders() {
	return (
		<ThemeProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='index'
					options={{
						headerShown: true,
						headerTitle: '',
						headerRight: ThemeToggle,
						headerTransparent: true,
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
