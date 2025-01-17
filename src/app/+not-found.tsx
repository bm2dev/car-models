import { Button } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View>
				<Text>This screen doesn't exist.</Text>

				<Link href='/' replace asChild>
					<Button variant='link'>
						<Text>Home</Text>
					</Button>
				</Link>
			</View>
		</>
	);
}
