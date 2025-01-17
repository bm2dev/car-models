import { H2 } from '@/components';
import { useAuth } from '@/features/auth/providers';
import { BrandListSmart } from '@/features/brands/components';
import React from 'react';
import { View } from 'react-native';

export default function Home() {
	const { user } = useAuth();

	return (
		<View className='flex-1 bg-background'>
			<H2 className='p-4 text-primary'>Hello {user?.name}!</H2>
			<BrandListSmart />
		</View>
	);
}
