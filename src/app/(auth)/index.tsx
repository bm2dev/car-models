import { Button, H1, Text } from '@/components/ui';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Home() {
	return (
		<View className='flex-1 justify-center items-center bg-background'>
			<H1>Home</H1>
			<Link href={'/(auth)/model/[id]'} asChild>
				<Button variant='link'>
					<Text>Model</Text>
				</Button>
			</Link>
		</View>
	);
}
