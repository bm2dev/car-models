import { ReactLogoImg } from '@/assets/images';
import { Button, Text } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { H1, Large, Lead } from '@/components/ui/typography';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';

export default function SignIn() {
	const [form, setForm] = useState({
		user: '',
		password: '',
	});

	return (
		<View className='flex-1 justify-center items-center gap-4 bg-background'>
			<View className='gap-2 justify-center items-center'>
				<Image source={ReactLogoImg} className='h-20 w-20' contentFit='cover' transition={1000} />
				<H1>Sign In</H1>
				<Lead>Welcome Back!</Lead>
			</View>
			<View className='gap-6 px-6 w-full'>
				<View className='gap-2'>
					<Large nativeID='user' className='self-start'>
						Username
					</Large>
					<Input
						aria-labelledby='user'
						keyboardType='default'
						placeholder='Your Username'
						value={form.user}
						onChangeText={(v) => setForm((p) => ({ ...p, user: v }))}
					/>
				</View>
				<View>
					<Large nativeID='password' className='self-start'>
						Password
					</Large>
					<Input
						aria-labelledby='password'
						keyboardType='visible-password'
						placeholder='Your Password'
						value={form.password}
						onChangeText={(v) => setForm((p) => ({ ...p, password: v }))}
					/>
				</View>
				<Button size='lg' variant='default'>
					<Text>Sign In</Text>
				</Button>
			</View>
		</View>
	);
}
