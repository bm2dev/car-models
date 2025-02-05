import { UseJestMock, fireEvent, render } from '@/__test__/test-utils';
import { SignOutButton } from '@/features/auth/components/sign-out-button';
import { useAuth } from '@/features/auth/providers';
import React from 'react';

jest.mock('@/features/auth/providers');

const signOutMock = jest.fn();
const useAuthMock = useAuth as UseJestMock<typeof useAuth>;

describe('SignOutButton', () => {
	beforeEach(() => {
		useAuthMock.mockReturnValue({
			signOut: signOutMock,
		});
	});

	it('should render with an icon', () => {
		const { getByTestId, getByLabelText } = render(<SignOutButton />);

		expect(getByTestId('sign-out-button')).toBeTruthy();
		expect(getByLabelText('sign-out-icon')).toBeTruthy();
	});

	it('should call signOut when button is pressed', () => {
		const { getByTestId } = render(<SignOutButton />);

		fireEvent.press(getByTestId('sign-out-button'));

		expect(signOutMock).toHaveBeenCalled();
	});
});
