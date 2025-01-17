import { IUser } from '@/features/auth/types';
import { apiTest, ApiTestErrorType } from '@/lib/axios/clients';
import { MutationConfig } from '@/lib/react-query/config';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const signInReqSchema = z.object({
	user: z.string().nonempty('Username is required'),
	password: z.string().nonempty('Password is required'),
});

export type SignInReq = z.infer<typeof signInReqSchema>;
export type SignInRes = { error: boolean; user: IUser };

export async function signIn({ data }: { data: SignInReq }) {
	return (await apiTest.post<SignInRes>(`/signIn`, data)).data;
}

type UseSignInOptions = {
	mutationConfig?: MutationConfig<typeof signIn, ApiTestErrorType>;
};

export function useSignIn({ mutationConfig }: UseSignInOptions = {}) {
	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (...args) => {
			onSuccess?.(...args);
		},
		...restConfig,
		mutationFn: signIn,
	});
}
