import { NativePressable } from '@/components';
import { useAuth } from '@/features/auth/providers';
import { ArrowLeftFromLine } from '@/lib/rnr/icons';
import React from 'react';

export function SignOutButton() {
	const { signOut } = useAuth();

	return (
		<NativePressable
			testID='sign-out-button'
			onPress={signOut}
			className='aspect-square justify-center p-0.5 rounded-full overflow-hidden'
		>
			<ArrowLeftFromLine
				aria-label='sign-out-icon'
				className='color-destructive'
				size={23}
				strokeWidth={1.25}
			/>
		</NativePressable>
	);
}
