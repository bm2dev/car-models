import { Large } from '@/components/ui';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GetModelsReq, useModels } from '@/features/models/apis';
import { Model } from '@/features/models/types';
import { AlertTriangle } from '@/lib/rnr/icons';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export function ModelListSmart({ brandCodigo }: GetModelsReq) {
	const { data, error, isLoading } = useModels({ brandCodigo });
	const modelos = data?.modelos || [];

	if (isLoading) {
		return (
			<View className='flex-1 items-center p-4'>
				<ActivityIndicator testID='loading-indicator' size='large' />
			</View>
		);
	}

	if (error) {
		const { message = 'Erro desconhecido' } = error;
		return (
			<View className='flex-1 items-center p-4'>
				<Alert icon={AlertTriangle} variant='destructive'>
					<AlertTitle>Error!</AlertTitle>
					<AlertDescription testID='error-message'>{message}</AlertDescription>
				</Alert>
			</View>
		);
	}

	if (!modelos.length) {
		return (
			<View className='flex-1 items-center p-4'>
				<Large testID='no-data-message'>No models found!</Large>
			</View>
		);
	}

	return <ModelList models={modelos} />;
}

export function ModelList({ models }: { models: Model[] }) {
	return (
		<FlatList
			data={models}
			className='flex-1'
			renderItem={({ item }) => <ModelItemList modelo={item} />}
			keyExtractor={(item) => String(item.codigo)}
		/>
	);
}

function ModelItemList({ modelo }: { modelo: Model }) {
	return (
		<View className='flex-row w-full align-center p-4 border-b-hairline border-border'>
			<Large>{modelo.nome}</Large>
		</View>
	);
}
