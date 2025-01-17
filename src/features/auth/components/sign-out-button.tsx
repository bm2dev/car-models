import { useAuth } from '@/features/auth/providers';
import { ArrowLeftFromLine } from '@/lib/rnr/icons';
import { cn } from '@/lib/rnr/utils';
import { View } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

export function SignOutButton() {
	const { signOut } = useAuth();

	return (
		<Pressable onPress={signOut}>
			{({ pressed }) => (
				<View
					className={cn(
						'flex-1 aspect-square pt-0.5 justify-center items-start',
						pressed && 'opacity-70'
					)}
				>
					<ArrowLeftFromLine className='color-destructive' size={23} strokeWidth={1.25} />
				</View>
			)}
		</Pressable>
	);
}
