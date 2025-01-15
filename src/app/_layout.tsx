import { ThemeToggle } from '@/components/ThemeToggle';
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
			<Stack>
				<Stack.Screen
					name='index'
					options={{ title: 'Home', headerRight: () => <ThemeToggle /> }}
				/>
			</Stack>
		</ThemeProvider>
	);
}
