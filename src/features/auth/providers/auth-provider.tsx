import { useSignIn } from '@/features/auth/apis';
import { IUser } from '@/features/auth/types';
import { useSecureStorage } from '@/hooks';
import { setTestApiToken, TestApiErrorType } from '@/lib/axios/clients';
import { useQueryClient } from '@tanstack/react-query';
import { SplashScreen, useRouter } from 'expo-router';
// import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect } from 'react';

interface IAuthContext {
	user: IUser | null;
	signInError: TestApiErrorType | null;
	isPendingSignIn: boolean;
	isLoadingSession: boolean;
	signIn: ReturnType<typeof useSignIn>['mutate'];
	signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: { children?: React.ReactNode }) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [[user, setUser, removeUser], isLoadingUser] = useSecureStorage<IAuthContext['user']>(
		'user',
		null
	);

	const {
		mutate: signIn,
		isPending: isPendingSignIn,
		error: signInError,
	} = useSignIn({
		mutationConfig: {
			onSuccess: ({ user }) => {
				// If the JWT had an expiration date, we would use it to set the expiration date of the token
				// const jwtInfo = jwtDecode(user.token);
				// setUser(user, new Date((jwtInfo.exp || 0) * 1000));
				setUser(user);
				setTestApiToken(user.token);
				router.push('/(auth)');
			},
		},
	});

	function removeSessionData() {
		removeUser();
		queryClient.clear();
	}

	function signOut() {
		router.push('/');
		setTestApiToken(null);
		removeSessionData();
	}

	useEffect(() => {
		if (isLoadingUser) return;

		if (user) {
			setTestApiToken(user.token);
		} else {
			removeSessionData();
		}
	}, [isLoadingUser]);

	useEffect(() => {
		if (!isLoadingUser) {
			SplashScreen.hideAsync();
		}
	}, [isLoadingUser]);

	return (
		<AuthContext.Provider
			value={{
				user,
				signInError,
				isPendingSignIn,
				isLoadingSession: isLoadingUser,
				signIn: signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
