import { BrandListSmart } from '@/features/brands/components';
import React from 'react';
import { View } from 'react-native';

export default function Home() {
	return (
		<View className='flex-1 bg-background'>
			<BrandListSmart />
		</View>
	);
}
