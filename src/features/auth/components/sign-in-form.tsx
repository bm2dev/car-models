import ControlledInput from '@/components/controlled-input';
import { Button } from '@/components/ui';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { SignInReq, signInReqSchema } from '@/features/auth/apis';
import { useAuth } from '@/features/auth/providers';
import { AlertTriangle } from '@/lib/rnr/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export function SignInForm() {
	const { signIn, signInError } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInReq>({
		mode: 'onBlur',
		defaultValues: { user: '', password: '' },
		resolver: zodResolver(signInReqSchema),
	});

	return (
		<View className='gap-6 px-6 w-full'>
			{signInError && (
				<Alert icon={AlertTriangle} variant='destructive' className='max-w-xl'>
					<AlertTitle>{signInError.response?.data.message || signInError.message}</AlertTitle>
				</Alert>
			)}
			<ControlledInput
				control={control}
				errors={errors}
				name='user'
				label='Username'
				placeholder='Your Username'
			/>
			<ControlledInput
				control={control}
				errors={errors}
				name='password'
				label='Password'
				placeholder='Your Password'
				keyboardType='visible-password'
			/>
			<Button size='lg' variant='default' onPress={handleSubmit((data) => signIn({ data }))}>
				<Text>Sign In</Text>
			</Button>
		</View>
	);
}
