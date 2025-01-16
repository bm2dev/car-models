import { NAV_THEME } from '@/lib/rnr/constants';
import { useColorScheme } from '@/lib/rnr/hooks';
import { setAndroidNavigationBar } from '@/lib/rnr/utils';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider as RNThemeProvider,
	Theme,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light };
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const hasMounted = useRef(false);
	const { colorScheme, isDarkColorScheme } = useColorScheme();
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

	useIsomorphicLayoutEffect(() => {
		if (hasMounted.current) return;

		if (Platform.OS === 'web') {
			// Adds the background color to the html element to prevent white background on overscroll.
			document.documentElement.classList.add('bg-background');
		}
		setAndroidNavigationBar(colorScheme);
		setIsColorSchemeLoaded(true);
		hasMounted.current = true;
	}, []);

	if (!isColorSchemeLoaded) return null;

	return (
		<RNThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
			<StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
			{children}
			<PortalHost />
		</RNThemeProvider>
	);
}

const useIsomorphicLayoutEffect =
	Platform.OS === 'web' && typeof window === 'undefined' ? useEffect : useLayoutEffect;
