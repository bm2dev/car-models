import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/features/auth/providers';

export default function AppLayout() {
	const { user, isLoadingSession } = useAuth();

	if (isLoadingSession) return null;

	if (!user) {
		return <Redirect href='/sign-in' />;
	}

	return <Slot />;
}
