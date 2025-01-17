import { ModelListSmart } from '@/features/models/components';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Model() {
	const { id } = useLocalSearchParams();

	return (
		<View className='flex-1  bg-background'>
			<ModelListSmart brandCodigo={String(id)} />
		</View>
	);
}
