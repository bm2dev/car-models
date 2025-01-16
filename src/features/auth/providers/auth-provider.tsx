import { useSignIn } from '@/features/auth/apis';
import { IUser } from '@/features/auth/types';
import { useSecureStorage } from '@/hooks';
import { setTestApiToken, TestApiErrorType } from '@/lib/axios/clients';
import { useQueryClient } from '@tanstack/react-query';
import { SplashScreen, useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthContext {
	user: IUser | null;
	isPendingSignIn: boolean;
	signInError: TestApiErrorType | null;
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

	const [isLoadingSession, setIsLoadingSession] = useState(true);
	const [user, setUser, removeUser] = useSecureStorage<IAuthContext['user']>('user', null);

	const {
		mutate: signIn,
		isPending: isPendingSignIn,
		error: signInError,
	} = useSignIn({
		mutationConfig: {
			onSuccess: ({ user }) => {
				const jwtInfo = jwtDecode(user.token);
				setUser(user, new Date((jwtInfo.exp || 0) * 1000));
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
		if (user) {
			setTestApiToken(user.token);
			setIsLoadingSession(false);
		} else {
			removeSessionData();
			setIsLoadingSession(false);
		}
	}, []);

	useEffect(() => {
		if (!isLoadingSession) {
			SplashScreen.hideAsync();
		}
	}, [isLoadingSession]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isPendingSignIn,
				signInError,
				signIn: signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
