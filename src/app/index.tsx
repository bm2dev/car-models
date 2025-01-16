import { ReactLogoImg } from '@/assets/images';
import { H1, Lead } from '@/components/ui/typography';
import { SignInForm } from '@/features/auth/components';
import { Image } from 'expo-image';
import { View } from 'react-native';

export default function SignIn() {
	return (
		<View className='flex-1 justify-center items-center gap-4 bg-background'>
			<View className='gap-2 justify-center items-center'>
				<Image source={ReactLogoImg} className='h-20 w-20' contentFit='cover' transition={1000} />
				<H1>Sign In</H1>
				<Lead>Welcome Back!</Lead>
			</View>
			<SignInForm />
		</View>
	);
}
