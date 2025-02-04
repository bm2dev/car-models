import { UseJestMock } from '@/__test__/test-utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { useColorScheme } from '@/lib/rnr/hooks';
import { setAndroidNavigationBar } from '@/lib/rnr/utils';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('@/lib/rnr/hooks');
jest.mock('@/lib/rnr/utils');

const useColorSchemeMock = useColorScheme as UseJestMock<typeof useColorScheme>;

describe('ThemeToggle', () => {
	it('should display moon icon when in dark mode', () => {
		useColorSchemeMock.mockReturnValue({
			isDarkColorScheme: true,
			setColorScheme: jest.fn(),
		});

		const { getByLabelText } = render(<ThemeToggle />);

		expect(getByLabelText('moon-icon')).toBeTruthy();
	});

	it('should display sun icon when in light mode', () => {
		useColorSchemeMock.mockReturnValue({
			isDarkColorScheme: false,
			setColorScheme: jest.fn(),
		});

		const { getByLabelText } = render(<ThemeToggle />);

		expect(getByLabelText('sun-icon')).toBeTruthy();
	});

	it('should toggle to light mode when pressed in dark mode', () => {
		const setColorSchemeMock = jest.fn();
		useColorSchemeMock.mockReturnValue({
			isDarkColorScheme: true,
			setColorScheme: setColorSchemeMock,
		});
		const { getByTestId } = render(<ThemeToggle />);

		const toggleButton = getByTestId('toggle-button');
		fireEvent.press(toggleButton);

		expect(setColorSchemeMock).toHaveBeenCalledWith('light');
		expect(setAndroidNavigationBar).toHaveBeenCalledWith('light');
	});

	it('should toggle to dark mode when pressed in light mode', () => {
		const setColorSchemeMock = jest.fn();
		useColorSchemeMock.mockReturnValue({
			isDarkColorScheme: false,
			setColorScheme: setColorSchemeMock,
		});

		const { getByTestId } = render(<ThemeToggle />);

		const toggleButton = getByTestId('toggle-button');
		fireEvent.press(toggleButton);

		expect(setColorSchemeMock).toHaveBeenCalledWith('dark');
		expect(setAndroidNavigationBar).toHaveBeenCalledWith('dark');
	});
});
