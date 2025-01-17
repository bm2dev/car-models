import { ThemeToggle } from '@/components';
import { AuthProvider } from '@/features/auth/providers';
import { ReactQueryProvider } from '@/lib/react-query/providers';
import '@/lib/rnr/config/rnr-components-config';
import { ThemeProvider } from '@/lib/rnr/providers';
import { SplashScreen, Stack } from 'expo-router';
import * as React from 'react';
import '../global.css';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootProviders() {
	return (
		<ReactQueryProvider>
			<AuthProvider>
				<ThemeProvider>
					<Routes />
				</ThemeProvider>
			</AuthProvider>
		</ReactQueryProvider>
	);
}

function Routes() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='(auth)' />
			<Stack.Screen
				name='sign-in'
				options={{
					headerShown: true,
					headerTitle: '',
					headerRight: ThemeToggle,
					headerTransparent: true,
					headerBackVisible: false,
				}}
			/>
		</Stack>
	);
}
