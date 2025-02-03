import { NativePressable } from '@/components';
import { Large } from '@/components/ui';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useBrands } from '@/features/brands/apis';
import { Brand } from '@/features/brands/types';
import { AlertTriangle } from '@/lib/rnr/icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export function BrandListSmart() {
	const { data: brands = [], error, isLoading } = useBrands({});

	if (isLoading) {
		return (
			<View className='flex-1 items-center p-4'>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	if (error) {
		const { message = 'Unknown error' } = error;
		return (
			<View className='flex-1 items-center p-4'>
				<Alert icon={AlertTriangle} variant='destructive'>
					<AlertTitle>Error!</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			</View>
		);
	}

	if (!brands.length) {
		return (
			<View className='flex-1 items-center p-4'>
				<Large>Nenhuma marca encontrada!</Large>
			</View>
		);
	}

	return <BrandList brands={brands} />;
}

export function BrandList({ brands }: { brands: Brand[] }) {
	return (
		<FlatList
			data={brands}
			className='flex-1'
			renderItem={({ item }) => <BrandItemList brand={item} />}
			keyExtractor={(item) => item.codigo}
		/>
	);
}

function BrandItemList({ brand }: { brand: Brand }) {
	const router = useRouter();

	return (
		<NativePressable onPress={() => router.push(`/(auth)/model/${brand.codigo}`)}>
			<View className='flex-row w-full align-center p-4 border-b-hairline border-border'>
				<Large>{brand.nome}</Large>
			</View>
		</NativePressable>
	);
}
