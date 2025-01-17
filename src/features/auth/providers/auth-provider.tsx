import { useSignIn } from '@/features/auth/apis';
import { IUser } from '@/features/auth/types';
import { useSecureStorage } from '@/hooks';
import { ApiTestErrorType, setApiTestToken } from '@/lib/axios/clients';
import { useQueryClient } from '@tanstack/react-query';
import { SplashScreen, useRouter } from 'expo-router';
// import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect } from 'react';

interface IAuthContext {
	user: IUser | null;
	signInError: ApiTestErrorType | null;
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

	const [[user, isLoadingUser], setUser, removeUser] = useSecureStorage<IAuthContext['user']>(
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
				setApiTestToken(user.token);
				router.replace('/(auth)');
			},
		},
	});

	function removeSessionData() {
		removeUser();
		queryClient.clear();
	}

	function signOut() {
		console.log('signOut');
		removeSessionData();
		setApiTestToken(null);
		router.replace('/sign-in');
	}

	useEffect(() => {
		if (isLoadingUser) return;

		if (user) {
			setApiTestToken(user.token);
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
