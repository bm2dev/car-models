import { NativePressable } from '@/components/native-pressable';
import { Text } from '@/components/ui';
import { useColorScheme } from '@/lib/rnr/hooks';
import { UseJestMock, fireEvent, render } from '@/testing/test-utils';
import React from 'react';

jest.mock('@/lib/rnr/hooks');

const useColorSchemeMock = useColorScheme as UseJestMock<typeof useColorScheme>;

describe('NativePressable', () => {
	beforeEach(() => {
		useColorSchemeMock.mockReturnValue({ colorScheme: 'light' });
	});

	it('should render children correctly', () => {
		const { getByText } = render(
			<NativePressable>
				<Text>Press me</Text>
			</NativePressable>
		);

		expect(getByText('Press me')).toBeTruthy();
	});

	it('should call onPress when pressed', () => {
		const onPress = jest.fn();

		const { getByTestId } = render(
			<NativePressable onPress={onPress}>
				<Text>Press me</Text>
			</NativePressable>
		);

		const pressable = getByTestId('pressable');
		fireEvent.press(pressable);

		expect(onPress).toHaveBeenCalled();
	});
});
