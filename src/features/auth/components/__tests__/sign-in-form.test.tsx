import { UseJestMock, fireEvent, render, waitFor } from '@/__test__/test-utils';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { useAuth } from '@/features/auth/providers';
import { ApiTestErrorType } from '@/lib/axios/clients';
import React from 'react';

jest.mock('@/features/auth/providers');

const signInMock = jest.fn();
const useAuthMock = useAuth as UseJestMock<typeof useAuth>;

describe('SignInForm', () => {
	beforeEach(() => {
		useAuthMock.mockReturnValue({
			signIn: signInMock,
			signInError: null,
			isPendingSignIn: false,
		});
	});

	it('should render correctly', () => {
		const { getByLabelText, getByRole } = render(<SignInForm />);

		expect(getByLabelText('Username')).toBeTruthy();
		expect(getByLabelText('Password')).toBeTruthy();
		expect(getByRole('button')).toBeTruthy();
	});

	it('should show loading state when isPendingSignIn is true', () => {
		useAuthMock.mockReturnValue({
			signIn: signInMock,
			signInError: null,
			isPendingSignIn: true,
		});

		const { getByRole } = render(<SignInForm />);

		const button = getByRole('button');
		expect(button).toBeBusy();
	});

	it('should display error message when signInError is present', () => {
		const ERROR_MESSAGE = 'Invalid credentials';

		useAuthMock.mockReturnValue({
			signIn: signInMock,
			signInError: { message: ERROR_MESSAGE } as ApiTestErrorType,
			isPendingSignIn: false,
		});

		const { getByText } = render(<SignInForm />);

		expect(getByText(ERROR_MESSAGE)).toBeTruthy();
	});

	it('should display required errors User and Password are empty', async () => {
		const { getByText, getByRole, findByText } = render(<SignInForm />);

		fireEvent.press(getByRole('button'));

		await findByText('Username is required');

		expect(getByText('Username is required')).toBeTruthy();
		expect(getByText('Password is required')).toBeTruthy();
	});

	it('should call signIn with form data when form is submitted', async () => {
		const { getByLabelText, getByRole } = render(<SignInForm />);

		fireEvent.changeText(getByLabelText('Username'), 'user');
		fireEvent.changeText(getByLabelText('Password'), 'password');
		fireEvent.press(getByRole('button'));

		await waitFor(() => {
			expect(signInMock).toHaveBeenCalledWith({ data: { user: 'user', password: 'password' } });
		});
	});
});
