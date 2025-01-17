import { ThemeToggle } from '@/components';
import { SignOutButton } from '@/features/auth/components';
import { useAuth } from '@/features/auth/providers';
import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

export default function AppGuard() {
	const { user, isLoadingSession } = useAuth();

	if (isLoadingSession) return null;

	if (!user) return <Redirect href='/sign-in' />;

	return <Routes />;
}

function Routes() {
	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<View className='flex-row items-center gap-x-4'>
						<SignOutButton />
						<ThemeToggle />
					</View>
				),
			}}
		>
			<Stack.Screen name='index' options={{ headerTitle: 'Marcas' }} />
			<Stack.Screen name='model/[id]' options={{ headerTitle: 'Modelos' }} />
		</Stack>
	);
}
