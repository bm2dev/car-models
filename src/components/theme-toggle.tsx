import { NativePressable } from '@/components/native-pressable';
import { useColorScheme } from '@/lib/rnr/hooks';
import { MoonStar, Sun } from '@/lib/rnr/icons';
import { setAndroidNavigationBar } from '@/lib/rnr/utils';

export function ThemeToggle() {
	const { isDarkColorScheme, setColorScheme } = useColorScheme();

	function toggleColorScheme() {
		const newTheme = isDarkColorScheme ? 'light' : 'dark';
		setColorScheme(newTheme);
		setAndroidNavigationBar(newTheme);
	}

	return (
		<NativePressable
			onPress={toggleColorScheme}
			className='aspect-square justify-center p-0.5 rounded-full overflow-hidden'
		>
			{isDarkColorScheme ? (
				<MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
			) : (
				<Sun className='text-foreground' size={24} strokeWidth={1.25} />
			)}
		</NativePressable>
	);
}
