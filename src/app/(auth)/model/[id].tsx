import { Button, H1, Text } from '@/components/ui';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Model() {
	return (
		<View className='flex-1 justify-center items-center bg-background'>
			<H1>Model</H1>
			<Link href={'/'} asChild>
				<Button variant='link'>
					<Text>Home</Text>
				</Button>
			</Link>
		</View>
	);
}
